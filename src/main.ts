import 'dotenv/config';
import { bootstrap } from './app';
import { startServer } from './server';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb';
import { ProductRepository } from './repositories/product.repository';
import { ProductService } from './services/product.service';
import { ProductController } from './controllers/product.controller';
import { errorMiddleware } from './middlewares/error.middleware';
import { validationMiddleware } from './middlewares/validation.middleware';

const dynamoDBClient = new DynamoDBClient({
  region: process.env.AWS_REGION || 'us-east-1',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || ''
  }
});

const docClient = DynamoDBDocumentClient.from(dynamoDBClient);

const productRepository = new ProductRepository(docClient);
const productService = new ProductService(productRepository);
const productController = new ProductController(productService);

async function main() {
  try {
    const app = await startServer();
    
    app.use('/api/products', validationMiddleware);
    app.post('/api/products', productController.createProduct.bind(productController));
    app.get('/api/products/:id', productController.getProduct.bind(productController));
    app.put('/api/products/:id', productController.updateProduct.bind(productController));
    app.delete('/api/products/:id', productController.deleteProduct.bind(productController));
    
    app.use(errorMiddleware);
    
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
    
    return app;
  } catch (error) {
    console.error('Error al iniciar el servidor:', error);
    process.exit(1);
  }
}

main();

export { productService, productRepository };