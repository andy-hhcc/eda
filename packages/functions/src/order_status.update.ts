import { ApiHandler } from 'sst/node/api';
import * as OrderEvent from '@workshop/core/event/order.event';

export const handler = ApiHandler(async (event) => {
  const id = event?.pathParameters?.id || '';
  const status = event?.pathParameters?.status || '';

  switch (status) {
    case 'IN_PROCESS':
      await OrderEvent.process(id);
      break;
    case 'DELIVERY':
      await OrderEvent.delivery(id);
      break;
    case 'COMPLETE':
      await OrderEvent.complete(id);
      break;
    default:
      break;
  }

  return {
    statusCode: 204,
    headers: {
      'content-type': 'application/json',
    },
  };
});
