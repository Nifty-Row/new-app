import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
  Logger,
} from '@nestjs/common';

@Catch()
export class ExceptionsFilter implements ExceptionFilter {
  private readonly logger = new Logger(ExceptionsFilter.name);

  catch(exception, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    this.logger.error('Error: ');
    this.logger.error(exception);
    let message = exception;
    if (exception.message) {
      message = exception.message;
    }
    if (exception.response) {
      message = exception.response;
    }

    if (message.indexOf !== undefined) {
      if (message.indexOf('not found') >= 0) {
        status = HttpStatus.NOT_FOUND;
      }
    }

    response.status(status).json({
      status: 'error',
      message: message,
      statusCode: status,
      timestamp: new Date().toISOString(),
    });
  }
}
