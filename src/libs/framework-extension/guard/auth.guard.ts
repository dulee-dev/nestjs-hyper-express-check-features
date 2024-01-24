import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Request } from 'hyper-express';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    // console.log(context.switchToHttp().getRequest<Request>().headers);
    return true;
  }
}
