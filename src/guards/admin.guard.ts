import { CanActivate, ExecutionContext } from '@nestjs/common';

// Typescript ko batane ke liye ke request ke andar currentUser ho sakta hai
interface RequestWithUser {
  currentUser?: { admin: boolean };
}

export class AdminGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    // getRequest ke aage humne apni custom type laga di
    const request = context.switchToHttp().getRequest<RequestWithUser>();

    // Agar user logged in nahi hai, toh false return kar do
    if (!request.currentUser) {
      return false;
    }

    // Agar user hai, toh check karo ke kya wo admin hai?
    return request.currentUser.admin;
  }
}
