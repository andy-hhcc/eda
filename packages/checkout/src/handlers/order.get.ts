import { ApiHandler } from 'sst/node/api';
import { diContainer } from '../di.registry';
import { OrderService } from '../services';

export const handler = ApiHandler(async (event) => {
  const orderService: OrderService = diContainer.resolve(OrderService);
  const data = await orderService.getOrderById(event?.pathParameters?.id || '');

  return {
    statusCode: 200,
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      data,
    }),
  };
});
