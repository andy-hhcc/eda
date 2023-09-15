import { Table } from 'sst/node/table';
import { getClient } from '../utils/client';
import { ConnectionModel } from '../model';

const client = getClient();

export const connect = async (connectionId: string) => {
  const params = {
    TableName: Table.Workshop.tableName,
    Item: new ConnectionModel(connectionId),
  };

  await client.put(params).promise();
};

export const disconnect = async (connectionId: string) => {
  const params = {
    TableName: Table.Workshop.tableName,
    Key: new ConnectionModel(connectionId),
  };

  await client.delete(params).promise();
};

export const getConnections = async () => {
  const params = {
    TableName: Table.Workshop.tableName,
    KeyConditionExpression: 'pk = :pk',
    ExpressionAttributeValues: {
      ':pk': 'CONNECTION',
    },
  };
  const results = await client.query(params).promise();

  return results.Items?.map((item) => item.sk) || [];
};
