import { IsNumber, IsNotEmpty } from 'class-validator';

export class CreateOrderDto {
  @IsNumber()
  @IsNotEmpty()
  userId: number;
}
