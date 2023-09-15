import { EventHandler } from 'sst/node/event-bus';
import { updateOrderStatus } from '@workshop/core/dal';
import * as Order from '@workshop/core/event/order.event';

export const handler = EventHandler(Order.Events.Deliveried, async (event) => {
  const { id } = event.properties;
  await updateOrderStatus(id, 'DELIVERY');
});
