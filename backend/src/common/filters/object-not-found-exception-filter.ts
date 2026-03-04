import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { ObjectNotFoundException } from '../exception/object-not-found.exception';

@Catch(ObjectNotFoundException)
export class ObjectNotFoundExceptionFilter implements ExceptionFilter {
  catch(exception: ObjectNotFoundException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    response.status(HttpStatus.NOT_FOUND).json({
      message: exception.message,
      statusCode: HttpStatus.NOT_FOUND,
      path: request.url,
    });
  }
}
