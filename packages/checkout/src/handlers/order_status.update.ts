import { ApiHandler } from 'sst/node/api';
import { diContainer } from '../di.registry';
import { OrderService } from '../services';

export const handler = ApiHandler(async (event) => {
  const orderService: OrderService = diContainer.resolve(OrderService);
  await orderService.updateOrderStatus(
    event?.pathParameters?.id || '',
    event?.pathParameters?.status || ''
  );

  return {
    statusCode: 204,
  };
});
