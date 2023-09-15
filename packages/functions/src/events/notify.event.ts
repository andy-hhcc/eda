import { EventHandler } from 'sst/node/event-bus';
import { ApiGatewayManagementApi } from 'aws-sdk';
import { getConnections, disconnect } from '@workshop/core/dal';
import * as Order from '@workshop/core/event/order.event';
import { WebSocketApi } from 'sst/node/websocket-api';

export const handler = EventHandler(
  [
    Order.Events.Created,
    Order.Events.Processed,
    Order.Events.Deliveried,
    Order.Events.Completed,
  ],
  async (event) => {
    const connectionIds = await getConnections();

    const apiGW = new ApiGatewayManagementApi({
      endpoint: WebSocketApi.WebSocketApi.url.replace('wss://', ''),
    })

    const postToConnection = async function (connectionId: string) {
      try {
        await apiGW
          .postToConnection({
            ConnectionId: connectionId,
            Data: JSON.stringify({
              event: event.type,
              data: event.properties
            }),
          })
          .promise();
      } catch (e: any) {
        if (e.statusCode === 410) {
          await disconnect(connectionId);
        }
        console.log(e);
      }
    };
    await Promise.all(connectionIds.map(postToConnection)); 
  }
);
