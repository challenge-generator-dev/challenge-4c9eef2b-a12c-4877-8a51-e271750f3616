export class HttpException extends Error {
  public readonly statusCode: number;
  public readonly isOperational: boolean;

  constructor(message: string, statusCode: number, isOperational = true) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    Object.setPrototypeOf(this, new.target.prototype);
    Error.captureStackTrace(this);
  }
}

export class ProductNotFoundException extends HttpException {
  constructor(id: string) {
    super(`Producto con id '${id}' no encontrado`, 404);
  }
}

export class ProductAlreadyExistsException extends HttpException {
  constructor(name: string) {
    super(`El producto '${name}' ya existe`, 409);
  }
}

export class BadRequestException extends HttpException {
  constructor(message: string) {
    super(message, 400);
  }
}

export class ValidationException extends HttpException {
  constructor(message: string) {
    super(message, 422);
  }
}

export class InternalServerErrorException extends HttpException {
  constructor(message = 'Error interno del servidor') {
    super(message, 500, false);
  }
}

export class DatabaseException extends HttpException {
  constructor(message: string) {
    super(`Error de base de datos: ${message}`, 500, true);
  }
}

/**
 * Excepción genérica para recursos no encontrados.
 * Se usa cuando el recurso específico no es conocido o no aplica.
 */
export class NotFoundException extends HttpException {
  constructor(message: string) {
    super(message, 404);
  }
}

/**
 * Excepción genérica para conflictos de estado.
 * Se usa cuando hay un conflicto con el estado actual del recurso.
 */
export class ConflictException extends HttpException {
  constructor(message: string) {
    super(message, 409);
  }
}