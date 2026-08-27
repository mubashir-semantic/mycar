import { Module, MiddlewareConsumer } from '@nestjs/common'; // MiddlewareConsumer add kiya
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { AuthService } from './auth.service';
import { User } from './user.entity';
import { CurrentUserMiddleware } from './middlewares/current-user.middleware'; // Naya Import

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  // Yahan se humne purana CurrentUserInterceptor hata diya hai
  providers: [UsersService, AuthService],
})
export class UsersModule {
  // Yeh function humare naye middleware ko har route ('*') par apply karega
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CurrentUserMiddleware).forRoutes('*');
  }
}
