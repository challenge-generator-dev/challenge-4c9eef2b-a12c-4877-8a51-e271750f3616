import { Request, Response, NextFunction, ErrorRequestHandler } from 'express';
import { HttpException, ValidationException } from '../utils/http-exceptions';

/**
 * Interfaz para estructurar respuestas de error.
 */
interface ErrorResponse {
  success: boolean;
  message: string;
  statusCode: number;
  timestamp: string;
  path?: string;
  details?: unknown;
}

/**
 * Middleware global de manejo de errores para la API.
 * Captura todas las excepciones no manejadas y responde con formato consistente.
 * 
 * Maneja diferentes tipos de errores:
 * - HttpException: errores con código de estado específico
 * - ValidationException: errores de validación de datos
 * - Error genéricos: errores inesperados del servidor
 */
export const errorMiddleware: ErrorRequestHandler = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
): void => {
  const timestamp = new Date().toISOString();
  
  // Determinar código de estado y mensaje según tipo de error
  let statusCode = 500;
  let message = 'Error interno del servidor';
  let details: unknown = undefined;

  if (err instanceof HttpException) {
    statusCode = err.statusCode;
    message = err.message;
    
    if (err instanceof ValidationException) {
      details = { validationErrors: err.message };
    }
  } else if (err instanceof Error) {
    // En desarrollo, incluir más información del error
    if (process.env.NODE_ENV !== 'production') {
      message = err.message;
      details = { stack: err.stack };
    } else {
      // En producción, no exponer detalles de errores internos
      message = 'Ha ocurrido un error inesperado';
    }
  }

  const errorResponse: ErrorResponse = {
    success: false,
    message,
    statusCode,
    timestamp,
    details,
  };

  // Registrar error en consola para debugging
  console.error(`[ERROR] ${timestamp} - Status: ${statusCode} - Message: ${message}`, err);

  res.status(statusCode).json(errorResponse);
};

/**
 * Middleware para capturar errores asíncronos.
 * Envuelve los handlers asíncronos para pasar errores al middleware de errores.
 */
export const asyncHandler = <T>(
  fn: (req: Request, res: Response, next: NextFunction) => Promise<T>
): ((req: Request, res: Response, next: NextFunction) => void) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};

/**
 * Middleware para manejar rutas no encontradas (404).
 */
export const notFoundMiddleware = (_req: Request, res: Response): void => {
  res.status(404).json({
    success: false,
    message: 'Ruta no encontrada',
    statusCode: 404,
    timestamp: new Date().toISOString(),
  });
};