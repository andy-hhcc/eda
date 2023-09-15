import { Table } from 'sst/node/table';
import crypto from 'crypto';
import { getClient } from '../utils/client';
import { ProductModel } from '../model';
import { ProductCreationRequest, ProductDto } from '../dto';
import { plainToInstance } from 'class-transformer';

const client = getClient();

export const createProduct = async ({
  name,
  price,
}: ProductCreationRequest): Promise<any> => {
  const params = {
    TableName: Table.Workshop.tableName,
    Item: new ProductModel(crypto.randomUUID(), name, price),
  };

  return client.put(params).promise();
};

export const getProducts = async () => {
  const params = {
    TableName: Table.Workshop.tableName,
    IndexName: 'gs1',
    KeyConditionExpression: 'gs1pk = :gs1pk',
    ExpressionAttributeValues: {
      ':gs1pk': 'PRODUCT',
    },
  };
  const results = await client.query(params).promise();

  return results.Items?.map((item) => plainToInstance(ProductDto, { ...item }));
};
