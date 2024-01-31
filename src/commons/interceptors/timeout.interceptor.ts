import {
  type CallHandler,
  type ExecutionContext,
  Injectable,
  type NestInterceptor,
  RequestTimeoutException,
} from "@nestjs/common";
import {
  catchError,
  type Observable,
  throwError,
  timeout,
  TimeoutError,
} from "rxjs";

const DEFAULT_TIMEOUT_EXCEPTION_TIME = 10000;

@Injectable()
export class TimeoutInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      timeout(
        parseInt(process.env.TIMEOUT_EXCEPTION_TIME) ??
          DEFAULT_TIMEOUT_EXCEPTION_TIME
      ),
      catchError((err) => {
        if (err instanceof TimeoutError) {
          return throwError(() => new RequestTimeoutException());
        }
        return throwError(err);
      })
    );
  }
}
