import { ApiHandler } from 'sst/node/api';
import { getOrder } from '@workshop/core/dal';

export const handler = ApiHandler(async (event) => {
  const data = await getOrder(event?.pathParameters?.id || '');

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
