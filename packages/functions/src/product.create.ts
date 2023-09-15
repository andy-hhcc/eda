import { ApiHandler } from 'sst/node/api';
import { ProductCreationRequest } from '@workshop/core/dto';
import { createProduct } from '@workshop/core/dal';

export const handler = ApiHandler(async (event) => {
  const body: ProductCreationRequest = JSON.parse(event.body || '');

  await createProduct(body);

  return {
    statusCode: 201,
  };
});
