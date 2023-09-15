import { EventHandler } from 'sst/node/event-bus';
import { createOrder } from '@workshop/core/dal';
import * as Order from '@workshop/core/event/order.event';

export const handler = EventHandler(Order.Events.Created, async (event) => {
  await createOrder(event.properties.data);
});
