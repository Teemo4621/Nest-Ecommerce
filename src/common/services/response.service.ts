import { Injectable, HttpException, HttpStatus } from '@nestjs/common';

@Injectable()
export class ResponseService {
  OkResponse(data?: any): {
    statusCode: number;
    error: string;
    message: string;
    data?: any;
  } {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return {
      statusCode: HttpStatus.OK,
      error: null,
      message: 'Success',
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      ...(data && { data }),
    };
  }

  BadRequestResponse(msg: string = 'Bad Request') {
    throw new HttpException(
      {
        statusCode: HttpStatus.BAD_REQUEST,
        error: 'Bad Request',
        message: msg,
      },
      HttpStatus.BAD_REQUEST,
    );
  }

  UnauthorizedResponse(msg: string = 'Unauthorized') {
    throw new HttpException(
      {
        statusCode: HttpStatus.UNAUTHORIZED,
        error: 'Unauthorized',
        message: msg,
      },
      HttpStatus.UNAUTHORIZED,
    );
  }

  PaymentRequiredResponse(msg: string = 'Payment Required') {
    throw new HttpException(
      {
        statusCode: HttpStatus.PAYMENT_REQUIRED,
        error: 'Payment Required',
        message: msg,
      },
      HttpStatus.PAYMENT_REQUIRED,
    );
  }

  ForbiddenResponse(msg: string = 'Forbidden') {
    throw new HttpException(
      { statusCode: HttpStatus.FORBIDDEN, error: 'Forbidden', message: msg },
      HttpStatus.FORBIDDEN,
    );
  }

  NotFoundResponse(msg: string = 'Not Found') {
    throw new HttpException(
      { statusCode: HttpStatus.NOT_FOUND, error: 'Not Found', message: msg },
      HttpStatus.NOT_FOUND,
    );
  }

  ConflictResponse(msg: string = 'Conflict') {
    throw new HttpException(
      { statusCode: HttpStatus.CONFLICT, error: 'Conflict', message: msg },
      HttpStatus.CONFLICT,
    );
  }

  ServerErrorResponse(msg: string = 'Internal Server Error') {
    throw new HttpException(
      {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        error: 'Internal Server Error',
        message: msg,
      },
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
}
