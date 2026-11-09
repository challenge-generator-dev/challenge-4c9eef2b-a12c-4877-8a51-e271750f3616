import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, PutCommand, GetCommand, UpdateCommand, DeleteCommand } from '@aws-sdk/lib-dynamodb';
import { Product } from '../models/product';
import { injectable } from 'inversify';
import 'reflect-metadata';

@injectable()
export class ProductRepository {
    private readonly client: DynamoDBDocumentClient;
    private readonly tableName: string;

    constructor() {
        const dynamoDBClient = new DynamoDBClient({
            region: process.env.AWS_REGION || 'us-east-1',
            credentials: {
                accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
                secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || ''
            }
        });
        this.client = DynamoDBDocumentClient.from(dynamoDBClient);
        this.tableName = process.env.DYNAMODB_TABLE_NAME || 'Products';
    }

    async create(product: Product): Promise<Product> {
        const command = new PutCommand({
            TableName: this.tableName,
            Item: {
                id: product.id,
                name: product.name,
                price: product.price,
                description: product.description
            },
            ConditionExpression: 'attribute_not_exists(id)'
        });

        try {
            await this.client.send(command);
            return product;
        } catch (error: unknown) {
            if (error instanceof Error && error.name === 'ConditionalCheckFailedException') {
                throw new Error('Product already exists');
            }
            throw new Error('Failed to create product');
        }
    }

    async findById(id: string): Promise<Product | null> {
        const command = new GetCommand({
            TableName: this.tableName,
            Key: { id }
        });

        const response = await this.client.send(command);
        if (!response.Item) {
            return null;
        }

        return new Product(
            response.Item.id,
            response.Item.name,
            response.Item.price,
            response.Item.description
        );
    }

    async update(id: string, updateData: Partial<Product>): Promise<Product> {
        const updateExpressions: string[] = [];
        const expressionAttributeValues: Record<string, unknown> = {};
        const expressionAttributeNames: Record<string, string> = {};

        if (updateData.name !== undefined) {
            updateExpressions.push('#name = :name');
            expressionAttributeNames['#name'] = 'name';
            expressionAttributeValues[':name'] = updateData.name;
        }

        if (updateData.price !== undefined) {
            updateExpressions.push('price = :price');
            expressionAttributeValues[':price'] = updateData.price;
        }

        if (updateData.description !== undefined) {
            updateExpressions.push('description = :description');
            expressionAttributeValues[':description'] = updateData.description;
        }

        if (updateExpressions.length === 0) {
            throw new Error('No update data provided');
        }

        const command = new UpdateCommand({
            TableName: this.tableName,
            Key: { id },
            UpdateExpression: `SET ${updateExpressions.join(', ')}`,
            ExpressionAttributeValues: expressionAttributeValues,
            ExpressionAttributeNames: expressionAttributeNames,
            ReturnValues: 'ALL_NEW'
        });

        const response = await this.client.send(command);
        if (!response.Attributes) {
            throw new Error('Product not found');
        }

        return new Product(
            response.Attributes.id,
            response.Attributes.name,
            response.Attributes.price,
            response.Attributes.description
        );
    }

    async delete(id: string): Promise<void> {
        const command = new DeleteCommand({
            TableName: this.tableName,
            Key: { id },
            ReturnValues: 'NONE'
        });

        await this.client.send(command);
    }
}