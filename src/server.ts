import express, { Application, Request, Response, NextFunction } from 'express';
import { ProductController } from './controllers/product.controller';
import { ProductService } from './services/product.service';
import { ProductRepository } from './repositories/product.repository';
import { errorMiddleware } from './middlewares/error.middleware';
import { validationMiddleware } from './middlewares/validation.middleware';

export async function startServer(): Promise<Application> {
  const app: Application = express();
  
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  
  app.use((req: Request, res: Response, next: NextFunction) => {
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] ${req.method} ${req.path}`);
    next();
  });
  
  const productRepository = new ProductRepository();
  const productService = new ProductService(productRepository);
  const productController = new ProductController(productService);
  
  app.use('/api/products', validationMiddleware);
  app.post('/api/products', productController.createProduct.bind(productController));
  app.get('/api/products/:id', productController.getProduct.bind(productController));
  app.put('/api/products/:id', productController.updateProduct.bind(productController));
  app.delete('/api/products/:id', productController.deleteProduct.bind(productController));
  
  app.get('/health', (req: Request, res: Response) => {
    res.status(200).json({ 
      status: 'healthy', 
      timestamp: new Date().toISOString(),
      uptime: process.uptime()
    });
  });
  
  app.get('/', (req: Request, res: Response) => {
    res.status(200).json({
      message: 'Product CRUD API',
      version: '1.0.0',
      endpoints: {
        products: '/api/products',
        health: '/health'
      }
    });
  });
  
  app.use(errorMiddleware);
  
  app.use((req: Request, res: Response) => {
    res.status(404).json({
      error: 'Not Found',
      message: `Ruta ${req.method} ${req.path} no encontrada`,
      timestamp: new Date().toISOString()
    });
  });
  
  return app;
}

export { startServer };