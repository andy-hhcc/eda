import { disconnect } from '@workshop/core/dal';

export const handler = async (event: any) => {
  await disconnect(event?.requestContext?.connectionId || '');
  return {
    statusCode: 200,
  };
};
