import { Request, Response, NextFunction, RequestHandler } from 'express';
import { validate, ValidationError } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { ValidationException } from '../utils/http-exceptions';

/**
 * Middleware para validar request bodies usando class-validator y class-transformer.
 * Transforma el body plano a una instancia del DTO y valida sus propiedades.
 */
export function validateRequest<T extends object>(dtoClass: new (...args: unknown[]) => T): RequestHandler {
  return async (req: Request, _res: Response, next: NextFunction): Promise<void> => {
    try {
      const dtoInstance = plainToInstance(dtoClass, req.body);
      const errors: ValidationError[] = await validate(dtoInstance, {
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      });

      if (errors.length > 0) {
        const errorMessages = errors.map((error) => {
          const constraints = error.constraints ? Object.values(error.constraints).join(', ') : 'Campo inválido';
          return `${error.property}: ${constraints}`;
        });
        throw new ValidationException(errorMessages.join('; '));
      }

      req.body = dtoInstance;
      next();
    } catch (error) {
      next(error);
    }
  };
}

/**
 * Middleware para validar parámetros de ruta.
 * Útil cuando los parámetros tienen restricciones específicas.
 */
export function validateParams(validationFn: (params: Record<string, string>) => string | null): RequestHandler {
  return async (req: Request, _res: Response, next: NextFunction): Promise<void> => {
    try {
      const errorMessage = validationFn(req.params);
      if (errorMessage) {
        throw new ValidationException(errorMessage);
      }
      next();
    } catch (error) {
      next(error);
    }
  };
}

/**
 * Middleware combinado que valida request body y parámetros de ruta.
 * Útil para endpoints que requieren ambas validaciones.
 */
export function validationMiddleware<T extends object>(
  dtoClass: new (...args: unknown[]) => T,
  validationFn?: (params: Record<string, string>) => string | null
): RequestHandler[] {
  const middlewares: RequestHandler[] = [];
  
  if (validationFn) {
    middlewares.push(validateParams(validationFn));
  }
  
  middlewares.push(validateRequest(dtoClass));
  
  return middlewares;
}