import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from './user.entity'; // <-- Yahan bhi User import kar liya

export const CurrentUser = createParamDecorator(
  (data: never, context: ExecutionContext) => {
    // Eslint ko bataya ke request mein ek currentUser hoga jo User type ka hai
    const request = context.switchToHttp().getRequest<{ currentUser?: User }>();

    return request.currentUser;
  },
);
