import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ReportsModule } from './reports/reports.module';
import { User } from './users/user.entity';
import { Report } from './reports/report.entity';
import { ProductsModule } from './products/products.module';
import { Product } from './products/entities/product.entity';
import { OrdersModule } from './orders/orders.module';
import { Order } from './orders/entities/order.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}`,
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        if (process.env.NODE_ENV === 'production') {
          return {
            type: 'postgres',
            url: process.env.DATABASE_URL,
            synchronize: false,
            migrationsRun: true,
            entities: [User, Report],
            ssl: {
              rejectUnauthorized: false,
            },
          };
        }

        return {
          type: 'better-sqlite3',
          database: config.get<string>('DB_NAME'),
          entities: [User, Report, Product, Order],
          synchronize: true,
        };
      },
    }),
    UsersModule,
    ReportsModule,
    ProductsModule,
    OrdersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
