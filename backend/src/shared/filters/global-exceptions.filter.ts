import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
  PayloadTooLargeException,
} from '@nestjs/common';
import { JsonWebTokenError } from '@nestjs/jwt';
import { ThrottlerException } from '@nestjs/throttler';
import { MongooseError } from 'mongoose';
import { MulterError } from 'multer';
import { DateService } from 'src/lib/date';
import { IApiResponse } from '../interface/response';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  constructor(private readonly dateService: DateService) {}

  private readonly logger = new Logger(GlobalExceptionFilter.name, { timestamp: true });

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    // Log the exception for debugging
    this.logger.error('An error occurred', exception, exception['stack']);

    // default status code and message
    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message: any = { message: 'Internal server error' };

    // handle Handle specific exceptions
    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const errorResponse = exception.getResponse();
      message = errorResponse instanceof Object ? errorResponse : { message: errorResponse };

      // handle throttle exception error
    } else if (exception instanceof ThrottlerException) {
      status = HttpStatus.TOO_MANY_REQUESTS;
      message = 'Too many requests, please try again later';

      // handle json web token error
    } else if (exception instanceof JsonWebTokenError) {
      status = HttpStatus.UNAUTHORIZED;
      message = exception.message || 'Invalid token';

      // handle mongoose error
    } else if (exception instanceof PayloadTooLargeException) {
      status = HttpStatus.PAYLOAD_TOO_LARGE;
      message = 'Payload too large, please reduce the size of your data';

      // handler multer error
    } else if (exception instanceof MulterError) {
      status = HttpStatus.BAD_REQUEST;
      message = exception?.message || 'Error occurred while uploading file.';

      // mongoose duplicate key error
    } else if (exception['code'] === 11000) {
      status = HttpStatus.CONFLICT;
      message = {
        message: `Duplicate key error: A record with the same unique field already exists key : ${JSON.stringify(exception?.['keyValue'])}`,
      };
    }

    // mongoose validation error
    else if (exception?.['name'] === 'ValidationError') {
      status = HttpStatus.BAD_REQUEST;
      message = { message: exception['message'] || 'Validation error occurred' };

      // mongo cast error
    } else if (exception['name'] === 'CastError') {
      status = HttpStatus.BAD_REQUEST;
      message = { message: `Invalid value for ${exception?.['path']}` };

      // mongo network error
    } else if (exception['name'] === 'MongoNetworkError') {
      status = HttpStatus.INTERNAL_SERVER_ERROR;
      message = { message: 'Database connection error' };

      // mongo server selection error
    } else if (exception['name'] === 'MongoServerSelectionError') {
      status = HttpStatus.INTERNAL_SERVER_ERROR;
      message = { message: 'Database is temporarily unavailable.' };

      // mongo write conflict error
    } else if (exception['message']?.includes('WriteConflict')) {
      status = HttpStatus.INTERNAL_SERVER_ERROR;
      message = { message: 'Write conflict detected, please retry' };
    } else if (exception instanceof MongooseError) {
      status = HttpStatus.BAD_REQUEST;
      message = { message: exception['message'] || 'Database error' };
    }

    // Construct the response
    const errorResponse: IApiResponse<null> = {
      status: false,
      path: request?.url,
      statusCode: status,
      timestamp: this.dateService.getCurrentDate(),
      ...(message || {}),
      data: null,
    };

    // error response
    response.status(status).json(errorResponse);
  }
}
