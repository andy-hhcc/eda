import { ApiHandler } from 'sst/node/api';
import { OrderCreationRequest } from '@workshop/core/dto';
import { diContainer } from '../di.registry';
import { OrderService } from '../services';

export const handler = ApiHandler(async (event: any) => {
  const orderService: OrderService = diContainer.resolve(OrderService);
  const body: OrderCreationRequest = JSON.parse(event.body || '');
  await orderService.create(body);
  return {
    statusCode: 201,
  };
});