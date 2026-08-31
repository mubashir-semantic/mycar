import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './entities/order.entity';
import { User } from '../users/user.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  // Create a new order
  async create(userId: number): Promise<Order> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    const order = this.orderRepository.create({ user: user });
    return this.orderRepository.save(order);
  }

  // Get all orders
  async findAll() {
    return await this.orderRepository.find({ relations: { user: true } });
  }

  // Get a specific order by ID
  async findOne(id: number) {
    const order = await this.orderRepository.findOne({
      where: { id },
      relations: { user: true },
    });
    if (!order) {
      throw new NotFoundException(`Order with ID ${id} not found`);
    }
    return order;
  }

  // Update an order's status
  async update(id: number, status: string) {
    const order = await this.findOne(id);
    order.status = status;
    return this.orderRepository.save(order);
  }

  // Delete an order
  async remove(id: number) {
    const order = await this.findOne(id);
    return this.orderRepository.remove(order);
  }
}
