import {
  StackContext,
  Api,
  EventBus,
  Table,
  WebSocketApi,
  StaticSite,
} from 'sst/constructs';

export function API({ stack }: StackContext) {
  const table = new Table(stack, 'Workshop', {
    fields: {
      pk: 'string',
      sk: 'string',
      gs1pk: 'string',
      gs1sk: 'string',
      gs2pk: 'string',
      gs2sk: 'string',
    },
    primaryIndex: { partitionKey: 'pk', sortKey: 'sk' },
    globalIndexes: {
      gs1: { partitionKey: 'gs1pk', sortKey: 'gs1sk' },
      gs2: { partitionKey: 'gs2pk', sortKey: 'gs2sk' },
    },
  });

  const bus = new EventBus(stack, 'WorkshopBus');
  bus.subscribe('order.created', {
    bind: [table],
    handler: 'packages/functions/src/events/order_created.event.handler',
  });
  bus.subscribe('order.processed', {
    bind: [table],
    handler: 'packages/functions/src/events/order_processed.event.handler',
  });
  bus.subscribe('order.deliveried', {
    bind: [table],
    handler: 'packages/functions/src/events/order_deliveried.event.handler',
  });
  bus.subscribe('order.completed', {
    bind: [table],
    handler: 'packages/functions/src/events/order_completed.event.handler',
  });

  const api = new Api(stack, 'api', {
    defaults: {
      function: {
        bind: [table, bus],
      },
    },
    routes: {
      'GET /users': 'packages/functions/src/customer.list.handler',
      'POST /users': 'packages/functions/src/customer.create.handler',

      'GET /products': 'packages/functions/src/product.list.handler',
      'POST /products': 'packages/functions/src/product.create.handler',

      'GET /orders': 'packages/functions/src/order.list.handler',
      'POST /orders': 'packages/functions/src/order.create.handler',
      'GET /orders/{id}': 'packages/functions/src/order.get.handler',
      'PUT /orders/{id}/status/{status}':
        'packages/functions/src/order_status.update.handler',
    },
  });

  const webSocketApi = new WebSocketApi(stack, 'WebSocketApi', {
    defaults: {
      function: {
        bind: [table],
      },
    },
    routes: {
      $connect: 'packages/functions/src/socket.connect.handler',
      $disconnect: 'packages/functions/src/socket.disconnect.handler',
    },
  });

  bus.subscribe(
    ['order.created', 'order.processed', 'order.deliveried', 'order.completed'],
    {
      bind: [table, webSocketApi],
      environment: {
        WEB_SOCKET_URL: webSocketApi.url,
      },
      handler: 'packages/functions/src/events/notify.event.handler',
    }
  );

  // const web = new StaticSite(stack, 'Web', {
  //   path: 'packages/web',
  //   buildOutput: 'dist',
  //   buildCommand: 'npm run build',
  //   environment: {
  //     VITE_APP_API_URL: api.url,
  //     VITE_APP_WEB_SOCKET_URL: webSocketApi.url,
  //   },
  // });

  stack.addOutputs({
    ApiEndpoint: api.url,
    WebSocketApi: webSocketApi.url,
  });
}
