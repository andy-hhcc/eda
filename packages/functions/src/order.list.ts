import { ApiHandler } from 'sst/node/api';
import { getOrders } from '@workshop/core/dal';

export const handler = ApiHandler(async (event) => {
  const data = await getOrders();

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
