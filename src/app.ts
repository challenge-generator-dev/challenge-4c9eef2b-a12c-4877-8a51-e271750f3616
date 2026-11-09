import dotenv from 'dotenv';
import { startServer } from './server';

dotenv.config();

const PORT = process.env.PORT || 3000;

async function bootstrap() {
  try {
    const app = await startServer();
    
    app.listen(PORT, () => {
      console.log(`Servidor Express iniciado en el puerto ${PORT}`);
      console.log(`Entorno: ${process.env.NODE_ENV || 'development'}`);
      console.log(`Región AWS: ${process.env.AWS_REGION || 'us-east-1'}`);
    });
    
    return app;
  } catch (error) {
    console.error('Error al iniciar el servidor:', error);
    process.exit(1);
  }
}

const app = bootstrap();

export { bootstrap, app };
export default bootstrap;