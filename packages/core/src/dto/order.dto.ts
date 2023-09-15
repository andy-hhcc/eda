import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class OrderDto {
  @Expose()
  id!: string;

  @Expose()
  status!: string;

  @Expose()
  totalPrice!: number;

  @Expose()
  items!: OrderItemDto[]
}

@Exclude()
export class OrderItemDto {
  @Expose()
  productId!: string;

  @Expose()
  productName!: string;

  @Expose()
  price!: number;

  @Expose()
  quantity!: string;
}