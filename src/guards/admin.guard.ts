import { CanActivate, ExecutionContext } from '@nestjs/common';

interface RequestWithUser {
  currentUser?: { admin: boolean };
}

export class AdminGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<RequestWithUser>();
    if (!request.currentUser) {
      return false;
    }
    return request.currentUser.admin;
  }
}
