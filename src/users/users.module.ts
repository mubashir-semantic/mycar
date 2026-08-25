import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core'; // <-- 1. Naya import
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { AuthService } from './auth.service';
import { User } from './user.entity';
import { CurrentUserInterceptor } from './current-user.interceptor'; // <-- 2. Interceptor import kiya

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [
    UsersService,
    AuthService,
    // 3. Yahan humne NestJS ko bataya ke is Interceptor ko globally apply kar do
    {
      provide: APP_INTERCEPTOR,
      useClass: CurrentUserInterceptor,
    },
  ],
})
export class UsersModule {}
