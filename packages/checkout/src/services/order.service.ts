import { inject, injectable } from 'tsyringe';
import crypto from 'crypto';
import { OrderRepository } from '../repositories';
import { OrderCreationRequest, OrderDto, OrderItemDto } from 'src/dto';
import { Order, OrderItem } from 'src/entities';
import { plainToInstance } from 'class-transformer';

@injectable()
export class OrderService {
  constructor(
    @inject(OrderRepository)
    private readonly orderRepository: OrderRepository
  ) {}

  async create(request: OrderCreationRequest): Promise<any> {
    const totalPrice = request.items.reduce(
      (total, item) => total + item.price,
      0
    );
    const orderId = crypto.randomUUID();
    const order = new Order({
      id: orderId,
      totalPrice,
      customerId: request.customerId,
    });
    const orderItems = request.items.map(
      (item) =>
        new OrderItem({
          orderId: orderId,
          ...item,
        })
    );
    return this.orderRepository.create(order, orderItems);
  }

  async getOrders(): Promise<OrderDto[]> {
    const orders = await this.orderRepository.getOrders();
    return orders.map((item: any) => plainToInstance(OrderDto, { ...item }));
  }

  async getOrderById(id: string): Promise<OrderDto> {
    const { order, orderItems } = await this.orderRepository.getOrderById(id);
    return plainToInstance(OrderDto, {
      ...order,
      items: orderItems.map((item: OrderItem) =>
        plainToInstance(OrderItemDto, {
          ...item,
        })
      ),
    });
  }

  async updateOrderStatus(id: string, status: string): Promise<void> {
    await this.orderRepository.updateOrderStatus(id, status);
  }
}
