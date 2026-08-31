import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Session,
  UseGuards,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { AuthGuard } from '../guards/auth.guard';

@Controller('orders')
@UseGuards(AuthGuard)
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  // Create a new order
  @Post()
  create(@Session() session: { userId: number }) {
    return this.ordersService.create(session.userId);
  }

  // Get all orders
  @Get()
  findAll() {
    return this.ordersService.findAll();
  }

  // Get a specific order by ID
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ordersService.findOne(+id);
  }

  // Update an order's status
  @Patch(':id')
  update(@Param('id') id: string, @Body('status') status: string) {
    return this.ordersService.update(+id, status);
  }

  // Delete an order by ID
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ordersService.remove(+id);
  }
}
