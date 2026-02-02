import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { DateService } from 'src/lib/date';
import { IApiResponse } from '../interface/response';

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor {
  constructor(private readonly dateService: DateService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const ctx = context.switchToHttp();
    const request = ctx.getRequest();

    return next.handle().pipe(
      map((data) => {
        const response: IApiResponse<T> = {
          status: true,
          path: request?.url,
          statusCode: context.switchToHttp().getResponse().statusCode,
          message: 'Request successful',
          timestamp: this.dateService.getCurrentDate(),
          data,
        };

        return response;
      }),
    );
  }
}
