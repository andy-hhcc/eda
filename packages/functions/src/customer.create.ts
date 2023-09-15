import { ApiHandler } from 'sst/node/api';
import { CustomerCreationRequest } from '@workshop/core/dto';
import { createCustomer } from '@workshop/core/dal';

export const handler = ApiHandler(async (event) => {
  const body: CustomerCreationRequest = JSON.parse(event.body || '');
  
  await createCustomer(body);

  return {
    statusCode: 201
  }
});
