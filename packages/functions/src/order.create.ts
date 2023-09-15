import { ApiHandler } from 'sst/node/api';
import { OrderCreationRequest } from '@workshop/core/dto';
import * as OrderEvent from '@workshop/core/event/order.event'

export const handler = ApiHandler(async (event) => {
  const body: OrderCreationRequest = JSON.parse(event.body || '');

  await OrderEvent.create(body);

  return {
    statusCode: 201,
  };
});
