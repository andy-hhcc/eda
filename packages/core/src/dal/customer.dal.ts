import { Table } from 'sst/node/table';
import crypto from 'crypto';
import { getClient } from '../utils/client';
import { CustomerModel } from '../model';
import { CustomerCreationRequest, CustomerDto } from '../dto';
import { plainToInstance } from 'class-transformer';

const client = getClient();

export const createCustomer = async ({
  name,
}: CustomerCreationRequest): Promise<any> => {
  const params = {
    TableName: Table.Workshop.tableName,
    Item: new CustomerModel(crypto.randomUUID(), name),
  };

  return client.put(params).promise();
};

export const getCustomers = async () => {
  const params = {
    TableName: Table.Workshop.tableName,
    IndexName: 'gs1',
    KeyConditionExpression: 'gs1pk = :gs1pk',
    ExpressionAttributeValues: {
      ':gs1pk': 'CUSTOMER',
    },
  };
  const results = await client.query(params).promise();

  return results.Items?.map((item) =>
    plainToInstance(CustomerDto, { ...item })
  );
};
