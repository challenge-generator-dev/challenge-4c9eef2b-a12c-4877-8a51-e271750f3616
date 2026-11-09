import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, DynamoDBDocumentClientConfig } from '@aws-sdk/lib-dynamodb';

const AWS_REGION = process.env.AWS_REGION || 'us-east-1';
const AWS_ACCESS_KEY_ID = process.env.AWS_ACCESS_KEY_ID;
const AWS_SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY;
const DYNAMODB_ENDPOINT = process.env.DYNAMODB_ENDPOINT || undefined;

export interface DynamoDBConfig {
  region: string;
  credentials?: {
    accessKeyId: string;
    secretAccessKey: string;
  };
  endpoint?: string;
}

export function getDynamoDBConfig(): DynamoDBConfig {
  const config: DynamoDBConfig = {
    region: AWS_REGION,
  };
  
  if (AWS_ACCESS_KEY_ID && AWS_SECRET_ACCESS_KEY) {
    config.credentials = {
      accessKeyId: AWS_ACCESS_KEY_ID,
      secretAccessKey: AWS_SECRET_ACCESS_KEY,
    };
  }
  
  if (DYNAMODB_ENDPOINT) {
    config.endpoint = DYNAMODB_ENDPOINT;
  }
  
  return config;
}

export function createDynamoDBClient(): DynamoDBClient {
  const config = getDynamoDBConfig();
  return new DynamoDBClient(config);
}

export function createDocumentClient(client: DynamoDBClient): DynamoDBDocumentClient {
  const docClientConfig: DynamoDBDocumentClientConfig = {
    client: client,
    marshallOptions: {
      removeUndefinedValues: true,
      convertClassInstanceToMap: true,
    },
    unmarshallOptions: {
      wrapNumbers: false,
    },
  };
  
  return DynamoDBDocumentClient.from(client, docClientConfig);
}

export const dynamoDBClient = createDynamoDBClient();
export const docClient = createDocumentClient(dynamoDBClient);

export function getTableName(): string {
  return process.env.DYNAMODB_TABLE_NAME || 'products';
}

export function validateDynamoDBConfig(): void {
  if (!AWS_ACCESS_KEY_ID || !AWS_SECRET_ACCESS_KEY) {
    console.warn('Advertencia: AWS_ACCESS_KEY_ID o AWS_SECRET_ACCESS_KEY no configurados');
  }
  
  if (!AWS_REGION) {
    console.warn('Advertencia: AWS_REGION no configurado, usando us-east-1 por defecto');
  }
}

validateDynamoDBConfig();