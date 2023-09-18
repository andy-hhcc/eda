import { injectable } from 'tsyringe';
import { Table } from 'sst/node/table';
import { plainToInstance } from 'class-transformer';
import { getClient, getShardIds } from '@workshop/core/utils';
import { OrderDto } from '@workshop/core/dto';
import { Order, OrderItem } from 'src/entities';

@injectable()
export class OrderRepository {
  private client: any;
  constructor() {
    this.client = getClient();
  }

  async create(order: Order, orderItems: OrderItem[]): Promise<any> {
    const requests = [
      {
        PutRequest: {
          Item: order,
        },
      },
      ...orderItems.map((item) => ({
        PutRequest: {
          Item: item,
        },
      })),
    ];

    const params = {
      RequestItems: {
        [Table.Workshop.tableName]: requests,
      },
    };

    return this.client.batchWrite(params).promise();
  }

  async getOrders(): Promise<Order[]> {
    const requests = getShardIds().map((shardId: number) => {
      const params = {
        TableName: Table.Workshop.tableName,
        IndexName: 'gs1',
        KeyConditionExpression: 'gs1pk = :gs1pk',
        ExpressionAttributeValues: {
          ':gs1pk': `ORDER#${shardId}`,
        },
      };
      return this.client.query(params).promise();
    });
    const responses = await Promise.all(requests);

    return responses.flatMap((response) => response.Items);
  }

  async getOrderById(id: string): Promise<any> {
    const params = {
      TableName: Table.Workshop.tableName,
      KeyConditionExpression: 'pk = :pk',
      ExpressionAttributeValues: {
        ':pk': `ORDER#${id}`,
      },
    };

    const result = await this.client.query(params).promise();

    const order = result.Items?.find((item: Order) =>
      item.sk.startsWith('ORDER#')
    );
    const orderItems = result.Items?.filter((item: OrderItem) =>
      item.sk.startsWith('ORDER_ITEM#')
    );

    return {
      order,
      orderItems,
    };
  }

  async updateOrderStatus(id: string, status: string) {
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
  
    await this.client.update(params).promise();
  }
}
