import { DynamoDB } from 'aws-sdk';

class DynamoDBClient {
  private static instance: DynamoDB.DocumentClient | null = null;

  public static getInstance(): DynamoDB.DocumentClient {
    if (!DynamoDBClient.instance) {
      DynamoDBClient.instance = new DynamoDB.DocumentClient();
    }
    return DynamoDBClient.instance;
  }
}

export const getClient = () => {
  return DynamoDBClient.getInstance();
};
