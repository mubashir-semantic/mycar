import {
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Injectable,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.entity'; // <-- User Entity import kar li

@Injectable()
export class CurrentUserInterceptor implements NestInterceptor {
  constructor(private usersService: UsersService) {}

  async intercept(context: ExecutionContext, handler: CallHandler) {
    // Eslint ko satisfy karne ke liye proper types define kar din
    const request = context.switchToHttp().getRequest<{
      session?: { userId?: number };
      currentUser?: User | null;
    }>();

    // Ab typescript ko pata hai ke userId ek number hi hoga
    const { userId } = request.session || {};

    if (userId) {
      const user = await this.usersService.findOne(userId);
      request.currentUser = user;
    }

    return handler.handle();
  }
}
