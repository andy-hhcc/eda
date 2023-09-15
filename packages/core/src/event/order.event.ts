import { z } from 'zod';
import { event } from './event';
import { OrderCreationRequest } from '../dto';

export const Events = {
  Created: event('order.created', {
    data: z.any(),
  }),
  Processed: event('order.processed', {
    id: z.string(),
    status: z.string(),
  }),
  Deliveried: event('order.deliveried', {
    id: z.string(),
    status: z.string(),
  }),
  Completed: event('order.completed', {
    id: z.string(),
    status: z.string(),
  }),
};

export const create = async (request: OrderCreationRequest) => {
  await Events.Created.publish({
    data: request,
  });
};

export const process = async (id: string) => {
  await Events.Processed.publish({
    id,
    status: 'IN_PROGRESS'
  });
};

export const delivery = async (id: string) => {
  await Events.Deliveried.publish({
    id,
    status: 'DELIVERY'
  });
};

export const complete = async (id: string) => {
  await Events.Completed.publish({
    id,
    status: 'COMPLETE'
  });
};
