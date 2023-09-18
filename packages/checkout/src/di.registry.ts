import 'reflect-metadata';
import { container } from 'tsyringe';
import { OrderService } from './services';
import { OrderRepository } from './repositories';

// container.register<OrderService>(OrderService, { useClass: OrderService });

export const diContainer = container;
