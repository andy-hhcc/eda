import { connect } from '@workshop/core/dal';

export const handler = async (event: any) => {
  await connect(event?.requestContext?.connectionId || '');
  return {
    statusCode: 200,
  };
};
