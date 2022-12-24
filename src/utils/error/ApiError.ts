class ApiError extends Error {
  statusCode: number;

  success: boolean;

  isOperational: boolean;

  constructor(message: any, statusCode: number) {
    super(message);

    this.statusCode = statusCode;
    this.success = false;
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

export default ApiError;
