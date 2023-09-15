import { Table } from 'sst/node/table';
import crypto from 'crypto';
import { getClient } from '../utils/client';
import { OrderItemModel, OrderModel } from '../model';
import { OrderCreationRequest, OrderDto, OrderItemDto } from '../dto';
import { plainToInstance } from 'class-transformer';
import { getShardIds } from '../utils';

const client = getClient();

export const createOrder = async (
  request: OrderCreationRequest
): Promise<any> => {
  const totalPrice = request.items.reduce(
    (total, item) => total + item.price,
    0
  );
  const orderId = crypto.randomUUID();

  const items = [
    {
      PutRequest: {
        Item: new OrderModel({
          id: orderId,
          totalPrice,
          customerId: request.customerId,
        }),
      },
    },
    ...request.items.map((item) => ({
      PutRequest: {
        Item: new OrderItemModel({
          orderId: orderId,
          ...item,
        }),
      },
    })),
  ];

  const params = {
    RequestItems: {
      [Table.Workshop.tableName]: items,
    },
  };

  return client.batchWrite(params).promise();
};

export const getOrders = async () => {
  const requests = getShardIds().map((shardId: number) => {
    const params = {
      TableName: Table.Workshop.tableName,
      IndexName: 'gs1',
      KeyConditionExpression: 'gs1pk = :gs1pk',
      ExpressionAttributeValues: {
        ':gs1pk': `ORDER#${shardId}`,
      },
    };
    return client.query(params).promise();
  });
  const responses = await Promise.all(requests);

  return responses.flatMap((response) =>
    response.Items?.map((item) => plainToInstance(OrderDto, { ...item }))
  );
};

export const getOrder = async (id: string) => {
  const params = {
    TableName: Table.Workshop.tableName,
    KeyConditionExpression: 'pk = :pk',
    ExpressionAttributeValues: {
      ':pk': `ORDER#${id}`,
    },
  };

  const result = await client.query(params).promise();

  const order = result.Items?.find((item) => item.sk.startsWith('ORDER#'));
  const orderItems = result.Items?.filter((item) =>
    item.sk.startsWith('ORDER_ITEM#')
  ).map((item) =>
    plainToInstance(OrderItemDto, {
      ...item,
    })
  );

  return plainToInstance(OrderDto, {
    ...order,
    items: orderItems,
  });
};

export const updateOrderStatus = async (id: string, status: string) => {
  const updatedAt = new Date().getTime().toString();
  const params = {
    TableName: Table.Workshop.tableName,
    Key: {
      pk: `ORDER#${id}`,
      sk: `ORDER#${id}`,
    },
    UpdateExpression:
      'SET #orderStatus = :orderStatus, gs1sk = :gs1sk, gs2sk = :gs2sk',
    ExpressionAttributeValues: {
      ':orderStatus': status,
      ':gs1sk': `${status}#${updatedAt}`,
      ':gs2sk': `ORDER#${status}#${updatedAt}`,
    },
    ExpressionAttributeNames: { '#orderStatus': 'status' },
    ReturnValues: 'ALL_NEW',
  };

  return client.update(params).promise();
};
