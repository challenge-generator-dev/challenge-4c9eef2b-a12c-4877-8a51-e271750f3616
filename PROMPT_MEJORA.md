# Prompt para Mejorar el Codigo Base

Copia y pega el contenido del bloque de abajo en un asistente de IA (Claude, ChatGPT)
para obtener el proyecto completo y arrancable. Guarda los archivos que te devuelva en la
carpeta del repo, respetando exactamente las rutas.

Si preferis trabajar en tu editor con un agente local (Claude Code, Cursor, Copilot), usa `AGENTS.md` en vez de este archivo: dice lo mismo pero para que escriba los archivos en disco.

## Las dos reglas que no se negocian

1. **Completa el boilerplate.** Todo lo que el proyecto necesita para compilar y arrancar: manifiesto de dependencias, punto de entrada, configuracion, capa de interfaz, y las capas del patron arquitectonico declarado. Eso es andamiaje y es tu trabajo.
2. **NO resuelvas el reto.** Los entregables de las fases son el trabajo de la persona. El hueco pedagogico se deja como esta: el proyecto arranca, pero lo que el reto pide implementar NO esta implementado.

Dicho de otra forma: si algo impide compilar, arreglalo. Si algo es logica de negocio incompleta, validaciones ausentes, un secreto hardcodeado o un patron mejorable, dejalo exactamente como esta — es lo que la persona tiene que encontrar.

## Superficie de practica — NO resuelvas

Estos archivos SON el ejercicio de la persona. No los implementes; deja stubs.

- `tests/product.controller.spec.ts` — El topic pide TDD/pruebas: este archivo es el ejercicio.
- `tests/product.service.spec.ts` — El topic pide TDD/pruebas: este archivo es el ejercicio.
- `tests/product.repository.spec.ts` — El topic pide TDD/pruebas: este archivo es el ejercicio.

## Mapa de componentes

El repo tiene una carpeta por componente. Cada uno se instala y verifica dentro de la suya.

| Componente | Carpeta | Rol | Capa | Track | Tecnologias |
|---|---|---|---|---|---|
| `app` | (raiz) | practice, chapter | server | Node | Express, DynamoDB, Jest |
| `infra-local` | (raiz) | support | infra | Compose local | DynamoDB |

## Orden de arranque

1. `docker compose up -d` (en la raiz) — levanta la infraestructura local.
2. `npm install && npm run build` — componente `app` (practice, chapter).

### Contratos entre componentes

- `app` expone http (api: http://localhost:3000):
  - `POST /api/products`
  - `GET /api/products/:id`
  - `PUT /api/products/:id`
  - `DELETE /api/products/:id`

## Lo que le falta a este proyecto

Esto NO lo tenes que adivinar: salio de comparar el proyecto contra la arquitectura declarada del reto y de un analisis estatico del codigo. Completalo TODO.

### Boilerplate del stack que falta

Sin esto no compila ni arranca. Es andamiaje, no toca nada de lo pedagogico:

- **src/app.module.ts** — Sin el modulo raiz, Nest no tiene arbol de dependencias que resolver y el bootstrap falla.

### Referencias colgando en el codigo que si esta

Cada una rompe la compilacion:

- `src/services/product.service.ts` — `ProductRepository.findByName`: Se invoca `findByName` sobre `ProductRepository`, pero esa clase no declara ese metodo. Agregalo con su implementacion real, o usa uno de los que si declara.

## Como saber que terminaste

```bash
npm install && npm run build && docker compose config -q
```

Ese comando corriendo sin errores es la definicion de "listo".

---

```
## Briefing del reto (autoridad)
Este bloque manda sobre los archivos adjuntos. El stack y el rol salen de AQUÍ, no de un topic genérico ni de markdown placeholder.

### Perfil
Chapter Backend, Especialidad Desarrollador, Tecnología Node, Advanced L2

### Brecha de conocimiento
CRUD de productos en DynamoDB expuesto por una API REST con Express y pruebas con Jest (corrida e2e 20261109083811938), Implementa operaciones CRUD de productos sobre DynamoDB con Express y las cubre con pruebas unitarias en Jest

### Misión / candidato
Persistir y consultar productos

### Reto
- Tema: crud-de-productos-con-express-y-dynamodb
- Seniority: advanced-l2
- Tipo: practical
- Título: Implementación de CRUD de productos en DynamoDB con Express
- Tiempo estimado: 8 horas

### Fases (trabajo del HUMANO — PROHIBIDO completarlas)
No implementes estos entregables. Dejalos como hueco pedagógico. El asistente solo materializa el proyecto arrancable para que el participante pueda trabajar.
- Fase 1: Configuración inicial y creación de productos — objetivo: Configurar el entorno de desarrollo y permitir la creación de productos. — entregable (NO resolver): Proyecto configurado con Express y DynamoDB, y funcionalidad para crear productos.
- Fase 2: Lectura y actualización de productos — objetivo: Permitir la lectura y actualización de productos existentes. — entregable (NO resolver): Funcionalidad para leer y actualizar productos.
- Fase 3: Eliminación de productos y pruebas unitarias — objetivo: Permitir la eliminación de productos y cubrir todas las funcionalidades con pruebas unitarias. — entregable (NO resolver): Funcionalidad para eliminar productos y suite de pruebas unitarias.

Eres un asistente experto en análisis, corrección y generación de archivos de cualquier tipo:
código fuente, documentación, hojas de cálculo, documentos Word, configuraciones, entre otros.
Voy a enviarte una cadena de texto que contiene uno o más archivos. Cada archivo está delimitado por un marcador con el siguiente formato:
// === ARCHIVO: ruta/del/archivo.extension ===
o también puede aparecer como:
## === ARCHIVO: ruta/del/archivo.extension ===
Lo que sigue al marcador puede ser:

El contenido real del archivo (código, texto, YAML, etc.)
Una descripción en lenguaje natural de lo que debe contener el archivo


TU TAREA
PASO 0 — ¿Esto es un proyecto o una carcasa?
Antes de extraer archivos, leé el Briefing (si está) y diagnosticá el adjunto.

Es CARCASA si ocurre CUALQUIERA de estas:
- No hay manifiesto de dependencias del stack del briefing (manifest.json de VTEX IO / package.json / pom.xml / build.gradle / requirements.txt / go.mod / *.tf / *.csproj, según corresponda)
- Hay un "binario" que en realidad es un comentario ("no puede ser mostrado como texto plano", placeholder .fig/.docx vacío)
- Los markdowns ya completan entregables de fases posteriores ("se implementó fade-in", lista de áreas ya resuelta)

Si es CARCASA:
- MATERIALIZÁ un proyecto que arranca en el stack del briefing (VTEX IO Store Framework, Angular, Terraform, pytest, Nest, etc.). Incluí manifiesto, punto de entrada y capa de interfaz reales.
- NO copies los markdowns de "solución" como si fueran el producto. Son ruido de generación.
- NO resuelvas las fases del briefing (están marcadas PROHIBIDO). Dejá el hueco pedagógico: el flujo existe, las microinteracciones/calidad/infra que el reto pide NO están hechas.
- Después seguí al PASO 5 (entrega de archivos).

Si es un proyecto REAL (manifiesto + código que compila o arranca):
- Seguí PASO 1 en adelante. 🔴 compilación sí. 🟡 pedagógico no.

PASO 1 — Detección y extracción
Identifica todos los archivos presentes en la cadena. Para cada archivo extrae:

Su ruta completa (ej: src/main/java/com/pragma/Service.java)
Su contenido o descripción

PASO 2 — Clasificación por tipo
Clasifica cada archivo en una de estas categorías:
A) Código fuente (Java, Python, TypeScript, JavaScript, Kotlin, etc.)
B) Configuración / documentación (YAML, properties, Markdown, JSON, txt, etc.)
C) Excel (.xlsx, .xls, .csv)
D) Word (.docx, .doc)
E) Otro tipo de archivo binario o especial
PASO 3 — Clasificación de errores en código fuente

Objetivo prioritario: que el proyecto compile. No corrijas flujo de negocio ni lógica funcional.

Antes de modificar cualquier archivo de código fuente, clasifica cada problema encontrado en una de estas dos categorías:
🔴 ERROR DE COMPILACIÓN — corregir siempre
Son errores que impiden que el proyecto arranque, sin valor pedagógico:

Import faltante o incorrecto
Clase, método o variable referenciada que no existe en ningún archivo del proyecto
Error de sintaxis
Anotación con atributos inválidos
Dependencia ausente en pom.xml, package.json, etc.
Archivo referenciado que no existe y debe ser creado con implementación mínima

→ CORREGIR estos errores.
🟡 PROBLEMA FUNCIONAL O DE CALIDAD — preservar siempre
Son problemas que no impiden compilar. Pueden ser intencionales para el aprendizaje:

Clave secreta hardcodeada ("secret", "password123")
API deprecada que funciona pero tiene reemplazo moderno
Lógica de negocio incorrecta o incompleta
Código redundante o de baja legibilidad
Falta de validaciones en flujo de negocio
Patrones de diseño incorrectos pero funcionales
Concurrencia no segura
Configuración funcional pero no óptima

→ PRESERVAR tal cual. No corregir, no mejorar, no comentar.
PASO 4 — Procesamiento según tipo de archivo
Tipo A — Código fuente
Aplica únicamente las correcciones clasificadas como 🔴 ERROR DE COMPILACIÓN.
No alteres ningún elemento clasificado como 🟡 PROBLEMA FUNCIONAL O DE CALIDAD.
Si falta un archivo referenciado, créalo con la implementación mínima necesaria para compilar.
Tipo B — Configuración / documentación
Extrae el contenido tal cual, sin modificaciones salvo errores evidentes de sintaxis
(ej: YAML mal indentado).
Tipo C — Excel (.xlsx)
Si viene con contenido real, genera el archivo respetando ese contenido.
Si viene con descripción en lenguaje natural, genera un archivo Excel funcional con:

Fila de encabezados en negrita con color de fondo distintivo
Columnas con ancho ajustado al contenido
Tipos de dato correctos por columna
Validaciones si la descripción lo indica
Hojas nombradas descriptivamente si hay más de una
Filas de ejemplo si no hay datos reales

Tipo D — Word (.docx)
Si viene con contenido real, genera el archivo respetando ese contenido.
Si viene con descripción en lenguaje natural, genera un documento Word funcional con:

Estilos de título (Título 1, Título 2) para jerarquía de secciones
Fuente legible (Calibri o equivalente), tamaño 11-12pt para cuerpo
Márgenes estándar
Tabla de contenido si tiene múltiples secciones
Tablas con encabezados en negrita si aplica

Tipo E — Otro
Genera el archivo con el contenido o estructura más apropiada según la descripción.
PASO 5 — Entrega de archivos
Entregá cada archivo con su ruta completa, respetando exactamente la estructura de rutas
indicada por los marcadores: un bloque por archivo, precedido por su ruta. No generes ZIPs
ni archivos adjuntos.
La entrega debe incluir:

Archivos de código con únicamente los errores de compilación corregidos
Archivos de configuración y documentación sin cambios
Archivos nuevos creados para resolver dependencias de compilación faltantes
Archivos Excel y Word generados desde descripción

IMPORTANTE: Entregá los archivos completos al finalizar. No preguntes si el usuario
quiere recibirlos. Simplemente entregalos; No debes desplegar en el chat el resumen de lo que arreglaste, solo entregá los archivos.

REGLAS IMPORTANTES

No omitas ningún archivo aunque no tenga errores ni modificaciones
Respeta los nombres y rutas exactas indicadas por los marcadores
Si un archivo no tiene marcador claro, infiere el nombre desde su contenido
Si la cadena contiene solo documentación, placeholders o binarios fake, NO la reproduzcas:
aplicá PASO 0 (materializar el proyecto del briefing). Reproducir la carcasa es un fallo.
No agregues texto después del último archivo entregado
No preguntes si el usuario quiere los archivos: simplemente entregalos siempre
Si detectas que falta un archivo de configuración necesario para compilar
(pom.xml, package.json, requirements.txt, build.gradle, etc.), créalo e inclúyelo
inferiendo su contenido desde los imports y frameworks detectados en el código
Nunca corrijas problemas 🟡 aunque parezcan obvios o fáciles de mejorar.
El participante que recibirá este proyecto los debe encontrar y resolver él mismo.


INPUT
Aquí está la cadena con los archivos:

// === ARCHIVO: src/main.ts ===
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

// === ARCHIVO: package.json ===
{
  "name": "product-crud-api",
  "version": "1.0.0",
  "description": "CRUD API for products using Express and DynamoDB",
  "main": "dist/main.js",
  "scripts": {
    "start": "node dist/main.js",
    "dev": "ts-node src/main.ts",
    "build": "tsc",
    "test": "jest",
    "test:watch": "jest --watch",
    "lint": "eslint . --ext .ts"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "@aws-sdk/client-dynamodb": "^3.651.1",
    "@aws-sdk/lib-dynamodb": "^3.651.1",
    "class-transformer": "0.5.1",
    "class-validator": "0.14.1",
    "dotenv": "16.4.5",
    "express": "4.21.0",
    "reflect-metadata": "^0.2.2",
    "inversify": "6.0.2"
  },
  "devDependencies": {
    "@types/express": "4.17.21",
    "@types/jest": "29.5.14",
    "@types/node": "20.16.5",
    "@types/supertest": "6.0.2",
    "@typescript-eslint/eslint-plugin": "7.18.0",
    "@typescript-eslint/parser": "7.18.0",
    "eslint": "8.57.0",
    "jest": "29.7.0",
    "supertest": "7.0.0",
    "ts-jest": "29.2.5",
    "ts-node": "10.9.2",
    "typescript": "5.7.2"
  }
}


// === ARCHIVO: tsconfig.json ===
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "commonjs",
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "noImplicitAny": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,
    "strictNullChecks": true,
    "strictFunctionTypes": true,
    "strictBindCallApply": true,
    "strictPropertyInitialization": true,
    "noImplicitThis": true,
    "alwaysStrict": true,
    "types": ["jest", "node"],
    "baseUrl": ".",
    "paths": {
      "*": ["node_modules/*"]
    }
  },
  "include": ["src/**/*", "tests/**/*"],
  "exclude": ["node_modules"]
}

// === ARCHIVO: src/models/product.ts ===
import { IsString, IsNumber, IsOptional, Min } from 'class-validator';
import { Expose } from 'class-transformer';

export class Product {
    @Expose()
    @IsString()
    id: string;

    @Expose()
    @IsString()
    name: string;

    @Expose()
    @IsNumber()
    @Min(0)
    price: number;

    @Expose()
    @IsString()
    @IsOptional()
    description?: string;

    constructor(id: string, name: string, price: number, description?: string) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.description = description;
    }
}

export class CreateProductDto {
    @IsString()
    name: string;

    @IsNumber()
    @Min(0)
    price: number;

    @IsString()
    @IsOptional()
    description?: string;
}

export class UpdateProductDto {
    @IsString()
    @IsOptional()
    name?: string;

    @IsNumber()
    @Min(0)
    @IsOptional()
    price?: number;

    @IsString()
    @IsOptional()
    description?: string;
}


// === ARCHIVO: src/repositories/product.repository.ts ===
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

// === ARCHIVO: src/app.ts ===
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

// === ARCHIVO: src/server.ts ===
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

// === ARCHIVO: src/config/dynamodb.ts ===
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

// === ARCHIVO: src/services/product.service.ts ===
import { Product } from '../models/product';
import { CreateProductDto } from '../models/product';
import { UpdateProductDto } from '../models/product';
import { ProductRepository } from '../repositories/product.repository';
import { NotFoundException, ConflictException, BadRequestException } from '../utils/http-exceptions';

export class ProductService {
    private readonly repository: ProductRepository;

    constructor(repository: ProductRepository) {
        this.repository = repository;
    }

    async createProduct(dto: CreateProductDto): Promise<Product> {
        this.validateCreateDto(dto);
        
        const existingProduct = await this.repository.findByName(dto.name);
        if (existingProduct) {
            throw new ConflictException(`El producto con nombre '${dto.name}' ya existe`);
        }

        const product = new Product(
            this.generateId(),
            dto.name,
            dto.price,
            dto.description
        );

        return await this.repository.create(product);
    }

    async getProduct(id: string): Promise<Product> {
        this.validateId(id);
        
        const product = await this.repository.findById(id);
        if (!product) {
            throw new NotFoundException(`Producto con ID '${id}' no encontrado`);
        }

        return product;
    }

    async updateProduct(id: string, dto: UpdateProductDto): Promise<Product> {
        this.validateId(id);
        this.validateUpdateDto(dto);

        const existingProduct = await this.repository.findById(id);
        if (!existingProduct) {
            throw new NotFoundException(`Producto con ID '${id}' no encontrado`);
        }

        if (dto.name && dto.name !== existingProduct.name) {
            const productWithName = await this.repository.findByName(dto.name);
            if (productWithName && productWithName.id !== id) {
                throw new ConflictException(`El nombre '${dto.name}' ya está en uso por otro producto`);
            }
        }

        const updateData: Partial<Product> = {};
        if (dto.name !== undefined) updateData.name = dto.name;
        if (dto.price !== undefined) updateData.price = dto.price;
        if (dto.description !== undefined) updateData.description = dto.description;

        return await this.repository.update(id, updateData);
    }

    async deleteProduct(id: string): Promise<void> {
        this.validateId(id);

        const existingProduct = await this.repository.findById(id);
        if (!existingProduct) {
            throw new NotFoundException(`Producto con ID '${id}' no encontrado`);
        }

        await this.repository.delete(id);
    }

    private validateCreateDto(dto: CreateProductDto): void {
        if (!dto.name || dto.name.trim().length === 0) {
            throw new BadRequestException('El nombre del producto es obligatorio');
        }

        if (dto.name.length > 100) {
            throw new BadRequestException('El nombre no puede exceder 100 caracteres');
        }

        if (dto.price === undefined || dto.price === null) {
            throw new BadRequestException('El precio es obligatorio');
        }

        if (typeof dto.price !== 'number' || dto.price < 0) {
            throw new BadRequestException('El precio debe ser un número positivo');
        }

        if (dto.price > 1000000) {
            throw new BadRequestException('El precio no puede exceder 1,000,000');
        }

        if (dto.description && dto.description.length > 500) {
            throw new BadRequestException('La descripción no puede exceder 500 caracteres');
        }
    }

    private validateUpdateDto(dto: UpdateProductDto): void {
        if (dto.name !== undefined) {
            if (dto.name.trim().length === 0) {
                throw new BadRequestException('El nombre del producto no puede estar vacío');
            }
            if (dto.name.length > 100) {
                throw new BadRequestException('El nombre no puede exceder 100 caracteres');
            }
        }

        if (dto.price !== undefined) {
            if (dto.price === null) {
                throw new BadRequestException('El precio no puede ser null');
            }
            if (typeof dto.price !== 'number' || dto.price < 0) {
                throw new BadRequestException('El precio debe ser un número positivo');
            }
            if (dto.price > 1000000) {
                throw new BadRequestException('El precio no puede exceder 1,000,000');
            }
        }

        if (dto.description !== undefined && dto.description.length > 500) {
            throw new BadRequestException('La descripción no puede exceder 500 caracteres');
        }
    }

    private validateId(id: string): void {
        if (!id || id.trim().length === 0) {
            throw new BadRequestException('El ID del producto es obligatorio');
        }
    }

    private generateId(): string {
        return `prod_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`;
    }
}

// === ARCHIVO: src/controllers/product.controller.ts ===
import { Request, Response, NextFunction } from 'express';
import { ProductService } from '../services/product.service';
import { CreateProductDto } from '../models/product';
import { UpdateProductDto } from '../models/product';
import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';

export class ProductController {
    private readonly service: ProductService;

    constructor(service: ProductService) {
        this.service = service;
        this.createProduct = this.createProduct.bind(this);
        this.getProduct = this.getProduct.bind(this);
        this.updateProduct = this.updateProduct.bind(this);
        this.deleteProduct = this.deleteProduct.bind(this);
    }

    async createProduct(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const dto = plainToInstance(CreateProductDto, req.body);
            const errors = await validate(dto);
            
            if (errors.length > 0) {
                const validationErrors = errors.map(error => ({
                    property: error.property,
                    constraints: error.constraints
                }));
                res.status(400).json({
                    statusCode: 400,
                    message: 'Validation failed',
                    errors: validationErrors
                });
                return;
            }

            const product = await this.service.createProduct(dto);
            res.status(201).json(product);
        } catch (error) {
            next(error);
        }
    }

    async getProduct(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { id } = req.params;
            const product = await this.service.getProduct(id);
            res.status(200).json(product);
        } catch (error) {
            next(error);
        }
    }

    async updateProduct(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { id } = req.params;
            const dto = plainToInstance(UpdateProductDto, req.body);
            const errors = await validate(dto);
            
            if (errors.length > 0) {
                const validationErrors = errors.map(error => ({
                    property: error.property,
                    constraints: error.constraints
                }));
                res.status(400).json({
                    statusCode: 400,
                    message: 'Validation failed',
                    errors: validationErrors
                });
                return;
            }

            const product = await this.service.updateProduct(id, dto);
            res.status(200).json(product);
        } catch (error) {
            next(error);
        }
    }

    async deleteProduct(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { id } = req.params;
            await this.service.deleteProduct(id);
            res.status(204).send();
        } catch (error) {
            next(error);
        }
    }
}

// === ARCHIVO: src/utils/http-exceptions.ts ===
export class HttpException extends Error {
  public readonly statusCode: number;
  public readonly isOperational: boolean;

  constructor(message: string, statusCode: number, isOperational = true) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    Object.setPrototypeOf(this, new.target.prototype);
    Error.captureStackTrace(this);
  }
}

export class ProductNotFoundException extends HttpException {
  constructor(id: string) {
    super(`Producto con id '${id}' no encontrado`, 404);
  }
}

export class ProductAlreadyExistsException extends HttpException {
  constructor(name: string) {
    super(`El producto '${name}' ya existe`, 409);
  }
}

export class BadRequestException extends HttpException {
  constructor(message: string) {
    super(message, 400);
  }
}

export class ValidationException extends HttpException {
  constructor(message: string) {
    super(message, 422);
  }
}

export class InternalServerErrorException extends HttpException {
  constructor(message = 'Error interno del servidor') {
    super(message, 500, false);
  }
}

export class DatabaseException extends HttpException {
  constructor(message: string) {
    super(`Error de base de datos: ${message}`, 500, true);
  }
}

/**
 * Excepción genérica para recursos no encontrados.
 * Se usa cuando el recurso específico no es conocido o no aplica.
 */
export class NotFoundException extends HttpException {
  constructor(message: string) {
    super(message, 404);
  }
}

/**
 * Excepción genérica para conflictos de estado.
 * Se usa cuando hay un conflicto con el estado actual del recurso.
 */
export class ConflictException extends HttpException {
  constructor(message: string) {
    super(message, 409);
  }
}

// === ARCHIVO: src/middlewares/validation.middleware.ts ===
import { Request, Response, NextFunction, RequestHandler } from 'express';
import { validate, ValidationError } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { ValidationException } from '../utils/http-exceptions';

/**
 * Middleware para validar request bodies usando class-validator y class-transformer.
 * Transforma el body plano a una instancia del DTO y valida sus propiedades.
 */
export function validateRequest<T extends object>(dtoClass: new (...args: unknown[]) => T): RequestHandler {
  return async (req: Request, _res: Response, next: NextFunction): Promise<void> => {
    try {
      const dtoInstance = plainToInstance(dtoClass, req.body);
      const errors: ValidationError[] = await validate(dtoInstance, {
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      });

      if (errors.length > 0) {
        const errorMessages = errors.map((error) => {
          const constraints = error.constraints ? Object.values(error.constraints).join(', ') : 'Campo inválido';
          return `${error.property}: ${constraints}`;
        });
        throw new ValidationException(errorMessages.join('; '));
      }

      req.body = dtoInstance;
      next();
    } catch (error) {
      next(error);
    }
  };
}

/**
 * Middleware para validar parámetros de ruta.
 * Útil cuando los parámetros tienen restricciones específicas.
 */
export function validateParams(validationFn: (params: Record<string, string>) => string | null): RequestHandler {
  return async (req: Request, _res: Response, next: NextFunction): Promise<void> => {
    try {
      const errorMessage = validationFn(req.params);
      if (errorMessage) {
        throw new ValidationException(errorMessage);
      }
      next();
    } catch (error) {
      next(error);
    }
  };
}

/**
 * Middleware combinado que valida request body y parámetros de ruta.
 * Útil para endpoints que requieren ambas validaciones.
 */
export function validationMiddleware<T extends object>(
  dtoClass: new (...args: unknown[]) => T,
  validationFn?: (params: Record<string, string>) => string | null
): RequestHandler[] {
  const middlewares: RequestHandler[] = [];
  
  if (validationFn) {
    middlewares.push(validateParams(validationFn));
  }
  
  middlewares.push(validateRequest(dtoClass));
  
  return middlewares;
}

// === ARCHIVO: src/middlewares/error.middleware.ts ===
import { Request, Response, NextFunction, ErrorRequestHandler } from 'express';
import { HttpException, ValidationException } from '../utils/http-exceptions';

/**
 * Interfaz para estructurar respuestas de error.
 */
interface ErrorResponse {
  success: boolean;
  message: string;
  statusCode: number;
  timestamp: string;
  path?: string;
  details?: unknown;
}

/**
 * Middleware global de manejo de errores para la API.
 * Captura todas las excepciones no manejadas y responde con formato consistente.
 * 
 * Maneja diferentes tipos de errores:
 * - HttpException: errores con código de estado específico
 * - ValidationException: errores de validación de datos
 * - Error genéricos: errores inesperados del servidor
 */
export const errorMiddleware: ErrorRequestHandler = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
): void => {
  const timestamp = new Date().toISOString();
  
  // Determinar código de estado y mensaje según tipo de error
  let statusCode = 500;
  let message = 'Error interno del servidor';
  let details: unknown = undefined;

  if (err instanceof HttpException) {
    statusCode = err.statusCode;
    message = err.message;
    
    if (err instanceof ValidationException) {
      details = { validationErrors: err.message };
    }
  } else if (err instanceof Error) {
    // En desarrollo, incluir más información del error
    if (process.env.NODE_ENV !== 'production') {
      message = err.message;
      details = { stack: err.stack };
    } else {
      // En producción, no exponer detalles de errores internos
      message = 'Ha ocurrido un error inesperado';
    }
  }

  const errorResponse: ErrorResponse = {
    success: false,
    message,
    statusCode,
    timestamp,
    details,
  };

  // Registrar error en consola para debugging
  console.error(`[ERROR] ${timestamp} - Status: ${statusCode} - Message: ${message}`, err);

  res.status(statusCode).json(errorResponse);
};

/**
 * Middleware para capturar errores asíncronos.
 * Envuelve los handlers asíncronos para pasar errores al middleware de errores.
 */
export const asyncHandler = <T>(
  fn: (req: Request, res: Response, next: NextFunction) => Promise<T>
): ((req: Request, res: Response, next: NextFunction) => void) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};

/**
 * Middleware para manejar rutas no encontradas (404).
 */
export const notFoundMiddleware = (_req: Request, res: Response): void => {
  res.status(404).json({
    success: false,
    message: 'Ruta no encontrada',
    statusCode: 404,
    timestamp: new Date().toISOString(),
  });
};

// === ARCHIVO: tests/product.controller.spec.ts ===
import { Request, Response } from 'express';
import { ProductController } from '../src/controllers/product.controller';
import { ProductService } from '../src/services/product.service';

jest.mock('../src/services/product.service');

describe('ProductController', () => {
  let controller: ProductController;
  let mockService: jest.Mocked<ProductService>;
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let jsonMock: jest.Mock;
  let statusMock: jest.Mock;

  beforeEach(() => {
    mockService = {
      createProduct: jest.fn(),
      getProduct: jest.fn(),
      updateProduct: jest.fn(),
      deleteProduct: jest.fn(),
    } as any;
    
    controller = new ProductController(mockService);
    
    jsonMock = jest.fn();
    statusMock = jest.fn().mockReturnValue({ json: jsonMock });
    
    mockResponse = {
      status: statusMock,
      json: jsonMock,
    };
    
    mockRequest = {
      body: {},
      params: {},
    };
  });

  describe('createProduct', () => {
    it.skip('debería crear un producto exitosamente', async () => {
      // given
      const productData = { name: 'Test Product', price: 100, description: 'Test description' };
      const createdProduct = { id: '123', ...productData };
      mockRequest.body = productData;
      mockService.createProduct.mockResolvedValue(createdProduct);

      // when
      await controller.createProduct(mockRequest as Request, mockResponse as Response);

      // then
      expect(mockService.createProduct).toHaveBeenCalledWith(productData);
      expect(statusMock).toHaveBeenCalledWith(201);
      expect(jsonMock).toHaveBeenCalledWith(createdProduct);
    });

    it.skip('debería manejar error de validación', async () => {
      // given
      mockRequest.body = { name: '', price: -10 };
      mockService.createProduct.mockRejectedValue(new Error('Validation error'));

      // when
      await controller.createProduct(mockRequest as Request, mockResponse as Response);

      // then
      expect(statusMock).toHaveBeenCalledWith(400);
    });
  });

  describe('getProduct', () => {
    it.skip('debería obtener un producto por id', async () => {
      // given
      const product = { id: '123', name: 'Test', price: 100, description: 'Test' };
      mockRequest.params = { id: '123' };
      mockService.getProduct.mockResolvedValue(product);

      // when
      await controller.getProduct(mockRequest as Request, mockResponse as Response);

      // then
      expect(mockService.getProduct).toHaveBeenCalledWith('123');
      expect(jsonMock).toHaveBeenCalledWith(product);
    });

    it.skip('debería retornar 404 si el producto no existe', async () => {
      // given
      mockRequest.params = { id: 'nonexistent' };
      mockService.getProduct.mockResolvedValue(null);

      // when
      await controller.getProduct(mockRequest as Request, mockResponse as Response);

      // then
      expect(statusMock).toHaveBeenCalledWith(404);
    });
  });

  describe('updateProduct', () => {
    it.skip('debería actualizar un producto existente', async () => {
      // given
      const updateData = { name: 'Updated Name' };
      const updatedProduct = { id: '123', name: 'Updated Name', price: 100, description: 'Test' };
      mockRequest.params = { id: '123' };
      mockRequest.body = updateData;
      mockService.updateProduct.mockResolvedValue(updatedProduct);

      // when
      await controller.updateProduct(mockRequest as Request, mockResponse as Response);

      // then
      expect(mockService.updateProduct).toHaveBeenCalledWith('123', updateData);
      expect(jsonMock).toHaveBeenCalledWith(updatedProduct);
    });

    it.skip('debería retornar 404 si el producto no existe para actualizar', async () => {
      // given
      mockRequest.params = { id: 'nonexistent' };
      mockRequest.body = { name: 'Updated' };
      mockService.updateProduct.mockResolvedValue(null);

      // when
      await controller.updateProduct(mockRequest as Request, mockResponse as Response);

      // then
      expect(statusMock).toHaveBeenCalledWith(404);
    });
  });

  describe('deleteProduct', () => {
    it.skip('debería eliminar un producto exitosamente', async () => {
      // given
      mockRequest.params = { id: '123' };
      mockService.deleteProduct.mockResolvedValue();

      // when
      await controller.deleteProduct(mockRequest as Request, mockResponse as Response);

      // then
      expect(mockService.deleteProduct).toHaveBeenCalledWith('123');
      expect(statusMock).toHaveBeenCalledWith(204);
    });

    it.skip('debería manejar error al eliminar producto inexistente', async () => {
      // given
      mockRequest.params = { id: 'nonexistent' };
      mockService.deleteProduct.mockRejectedValue(new Error('Product not found'));

      // when
      await controller.deleteProduct(mockRequest as Request, mockResponse as Response);

      // then
      expect(statusMock).toHaveBeenCalledWith(404);
    });
  });
});

// === ARCHIVO: tests/product.service.spec.ts ===
import { ProductService } from '../src/services/product.service';
import { ProductRepository } from '../src/repositories/product.repository';
import { Product, CreateProductDto, UpdateProductDto } from '../src/models/product';

jest.mock('../src/repositories/product.repository');

describe('ProductService', () => {
  let service: ProductService;
  let mockRepository: jest.Mocked<ProductRepository>;

  beforeEach(() => {
    mockRepository = {
      create: jest.fn(),
      findById: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    } as any;
    
    service = new ProductService(mockRepository);
  });

  describe('createProduct', () => {
    it.skip('debería crear un producto con datos válidos', async () => {
      // given
      const dto: CreateProductDto = { name: 'New Product', price: 50, description: 'Description' };
      const expectedProduct: Product = { id: 'uuid-1', ...dto };
      mockRepository.create.mockResolvedValue(expectedProduct);

      // when
      const result = await service.createProduct(dto);

      // then
      expect(mockRepository.create).toHaveBeenCalledWith(expect.objectContaining(dto));
      expect(result).toEqual(expectedProduct);
    });

    it.skip('debería lanzar error si el nombre está vacío', async () => {
      // given
      const dto: CreateProductDto = { name: '', price: 50 };

      // when & then
      await expect(service.createProduct(dto)).rejects.toThrow('Product name is required');
    });

    it.skip('debería lanzar error si el precio es negativo', async () => {
      // given
      const dto: CreateProductDto = { name: 'Test', price: -10 };

      // when & then
      await expect(service.createProduct(dto)).rejects.toThrow('Price must be positive');
    });

    it.skip('debería lanzar error si el precio es cero', async () => {
      // given
      const dto: CreateProductDto = { name: 'Test', price: 0 };

      // when & then
      await expect(service.createProduct(dto)).rejects.toThrow('Price must be positive');
    });
  });

  describe('getProduct', () => {
    it.skip('debería obtener un producto por id existente', async () => {
      // given
      const product: Product = { id: '123', name: 'Test', price: 100, description: 'Test' };
      mockRepository.findById.mockResolvedValue(product);

      // when
      const result = await service.getProduct('123');

      // then
      expect(mockRepository.findById).toHaveBeenCalledWith('123');
      expect(result).toEqual(product);
    });

    it.skip('debería retornar null si el producto no existe', async () => {
      // given
      mockRepository.findById.mockResolvedValue(null);

      // when
      const result = await service.getProduct('nonexistent');

      // then
      expect(result).toBeNull();
    });

    it.skip('debería lanzar error si el id está vacío', async () => {
      // when & then
      await expect(service.getProduct('')).rejects.toThrow('Product ID is required');
    });
  });

  describe('updateProduct', () => {
    it.skip('debería actualizar un producto existente', async () => {
      // given
      const updateData: UpdateProductDto = { name: 'Updated Name' };
      const updatedProduct: Product = { id: '123', name: 'Updated Name', price: 100, description: 'Test' };
      mockRepository.update.mockResolvedValue(updatedProduct);

      // when
      const result = await service.updateProduct('123', updateData);

      // then
      expect(mockRepository.update).toHaveBeenCalledWith('123', updateData);
      expect(result).toEqual(updatedProduct);
    });

    it.skip('debería retornar null si el producto no existe', async () => {
      // given
      mockRepository.update.mockResolvedValue(null);

      // when
      const result = await service.updateProduct('nonexistent', { name: 'Test' });

      // then
      expect(result).toBeNull();
    });

    it.skip('debería manejar actualización de precio negativo', async () => {
      // given
      const updateData: UpdateProductDto = { price: -50 };

      // when & then
      await expect(service.updateProduct('123', updateData)).rejects.toThrow('Price must be positive');
    });
  });

  describe('deleteProduct', () => {
    it.skip('debería eliminar un producto existente', async () => {
      // given
      mockRepository.delete.mockResolvedValue();

      // when
      await service.deleteProduct('123');

      // then
      expect(mockRepository.delete).toHaveBeenCalledWith('123');
    });

    it.skip('debería lanzar error si el producto no existe', async () => {
      // given
      mockRepository.delete.mockRejectedValue(new Error('Product not found'));

      // when & then
      await expect(service.deleteProduct('nonexistent')).rejects.toThrow('Product not found');
    });

    it.skip('debería lanzar error si el id está vacío', async () => {
      // when & then
      await expect(service.deleteProduct('')).rejects.toThrow('Product ID is required');
    });
  });
});

// === ARCHIVO: tests/product.repository.spec.ts ===
import { ProductRepository } from '../src/repositories/product.repository';
import { Product } from '../src/models/product';
import { DynamoDBDocumentClient, PutCommand, GetCommand, UpdateCommand, DeleteCommand } from '@aws-sdk/lib-dynamodb';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';

jest.mock('@aws-sdk/lib-dynamodb');
jest.mock('@aws-sdk/client-dynamodb');

describe('ProductRepository', () => {
  let repository: ProductRepository;
  let mockDocClient: jest.Mocked<DynamoDBDocumentClient>;

  beforeEach(() => {
    mockDocClient = {
      send: jest.fn(),
    } as any;
    
    (DynamoDBClient as jest.Mock).mockImplementation(() => ({}));
    (DynamoDBDocumentClient as jest.Mock).mockImplementation(() => mockDocClient);
    
    repository = new ProductRepository();
  });

  describe('create', () => {
    it.skip('debería crear un producto en DynamoDB', async () => {
      // given
      const product: Product = { id: '123', name: 'Test', price: 100, description: 'Test' };
      mockDocClient.send.mockResolvedValue({ Attributes: product });

      // when
      const result = await repository.create(product);

      // then
      expect(mockDocClient.send).toHaveBeenCalledWith(expect.any(PutCommand));
      expect(result).toEqual(product);
    });

    it.skip('debería manejar error al crear producto', async () => {
      // given
      const product: Product = { id: '123', name: 'Test', price: 100 };
      mockDocClient.send.mockRejectedValue(new Error('DynamoDB error'));

      // when & then
      await expect(repository.create(product)).rejects.toThrow('DynamoDB error');
    });
  });

  describe('findById', () => {
    it.skip('debería encontrar un producto por id', async () => {
      // given
      const product: Product = { id: '123', name: 'Test', price: 100, description: 'Test' };
      mockDocClient.send.mockResolvedValue({ Item: product });

      // when
      const result = await repository.findById('123');

      // then
      expect(mockDocClient.send).toHaveBeenCalledWith(expect.any(GetCommand));
      expect(result).toEqual(product);
    });

    it.skip('debería retornar null si el producto no existe', async () => {
      // given
      mockDocClient.send.mockResolvedValue({});

      // when
      const result = await repository.findById('nonexistent');

      // then
      expect(result).toBeNull();
    });

    it.skip('debería manejar error al buscar producto', async () => {
      // given
      mockDocClient.send.mockRejectedValue(new Error('DynamoDB error'));

      // when & then
      await expect(repository.findById('123')).rejects.toThrow('DynamoDB error');
    });
  });

  describe('update', () => {
    it.skip('debería actualizar un producto existente', async () => {
      // given
      const updateData = { name: 'Updated' };
      const updatedProduct: Product = { id: '123', name: 'Updated', price: 100, description: 'Test' };
      mockDocClient.send.mockResolvedValue({ Attributes: updatedProduct });

      // when
      const result = await repository.update('123', updateData);

      // then
      expect(mockDocClient.send).toHaveBeenCalledWith(expect.any(UpdateCommand));
      expect(result).toEqual(updatedProduct);
    });

    it.skip('debería retornar null si el producto no existe', async () => {
      // given
      mockDocClient.send.mockResolvedValue({});

      // when
      const result = await repository.update('nonexistent', { name: 'Test' });

      // then
      expect(result).toBeNull();
    });

    it.skip('debería manejar error al actualizar producto', async () => {
      // given
      mockDocClient.send.mockRejectedValue(new Error('DynamoDB error'));

      // when & then
      await expect(repository.update('123', { name: 'Test' })).rejects.toThrow('DynamoDB error');
    });
  });

  describe('delete', () => {
    it.skip('debería eliminar un producto existente', async () => {
      // given
      mockDocClient.send.mockResolvedValue({});

      // when
      await repository.delete('123');

      // then
      expect(mockDocClient.send).toHaveBeenCalledWith(expect.any(DeleteCommand));
    });

    it.skip('debería manejar error al eliminar producto', async () => {
      // given
      mockDocClient.send.mockRejectedValue(new Error('DynamoDB error'));

      // when & then
      await expect(repository.delete('123')).rejects.toThrow('DynamoDB error');
    });
  });
});

// === ARCHIVO: README.md ===
# Product CRUD API

API RESTful para gestión de productos utilizando Express y DynamoDB.

## Requisitos Previos

- Node.js 22.x
- npm 10.x
- Cuenta de AWS con credenciales configuradas (AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY)
- Región de AWS configurada

## Instalación

```bash
npm install
```

## Configuración

Las variables de entorno necesarias se configuran en un archivo `.env` en la raíz del proyecto:

```env
AWS_ACCESS_KEY_ID=tu_access_key
AWS_SECRET_ACCESS_KEY=tu_secret_key
AWS_REGION=us-east-1
DYNAMODB_TABLE=products
PORT=3000
```

## Scripts Disponibles

| Comando | Descripción |
|---------|-------------|
| `npm run dev` | Inicia el servidor en modo desarrollo con ts-node |
| `npm run build` | Compila el código TypeScript a JavaScript |
| `npm start` | Inicia el servidor desde los archivos compilados |
| `npm test` | Ejecuta las pruebas unitarias con Jest |
| `npm run test:watch` | Ejecuta pruebas en modo watch |
| `npm run lint` | Ejecuta ESLint para verificar el código |

## Estructura del Proyecto

```
├── src/
│   ├── main.ts                 # Punto de entrada de la aplicación
│   ├── app.ts                  # Configuración de Express
│   ├── server.ts               # Inicialización del servidor
│   ├── config/
│   │   └── dynamodb.ts         # Configuración del cliente DynamoDB
│   ├── models/
│   │   └── product.ts          # Entidad Product y DTOs
│   ├── repositories/
│   │   └── product.repository.ts # Acceso a datos de productos
│   ├── services/
│   │   └── product.service.ts  # Lógica de negocio
│   ├── controllers/
│   │   └── product.controller.ts # Controladores HTTP
│   ├── middlewares/
│   │   ├── error.middleware.ts # Manejo global de errores
│   │   └── validation.middleware.ts # Validación de requests
│   └── utils/
│       └── http-exceptions.ts # Excepciones HTTP personalizadas
├── tests/
│   ├── product.controller.spec.ts
│   ├── product.service.spec.ts
│   └── product.repository.spec.ts
├── package.json
├── tsconfig.json
└── README.md
```

## Endpoints de la API

### Crear Producto
```http
POST /api/products
Content-Type: application/json

{
  "name": "Producto Ejemplo",
  "price": 99.99,
  "description": "Descripción del producto"
}
```

Respuesta: `201 Created`

### Obtener Producto por ID
```http
GET /api/products/:id
```

Respuesta: `200 OK` con los datos del producto

### Actualizar Producto
```http
PUT /api/products/:id
Content-Type: application/json

{
  "name": "Nombre actualizado",
  "price": 149.99
}
```

Respuesta: `200 OK` con los datos actualizados

### Eliminar Producto
```http
DELETE /api/products/:id
```

Respuesta: `204 No Content`

## Manejo de Errores

La API utiliza códigos de estado HTTP estándar:
- `200` - Solicitud exitosa
- `201` - Recurso creado exitosamente
- `400` - Solicitud inválida (validación fallida)
- `404` - Recurso no encontrado
- `500` - Error interno del servidor

## Desarrollo

Para desarrollo se utiliza `ts-node` que permite ejecutar TypeScript directamente sin compilación previa. El servidor reload automáticamente cuando se detectan cambios.

## Pruebas

Las pruebas unitarias utilizan Jest con mocking de dependencias. Los archivos de prueba siguen la estructura given-when-then y utilizan `jest.mock` para simular colaboradores.

```bash
# Ejecutar todas las pruebas
npm test

# Ejecutar pruebas en modo watch
npm run test:watch
```

## Construcción para Producción

```bash
npm run build
npm start
```

Los archivos compilados se generan en el directorio `dist/`.

// === ARCHIVO: docker-compose.yml ===
# Infraestructura local del reto. SOLO desarrollo: credenciales de ejemplo (local-dev-only), puertos en loopback.
# Levantar: docker compose up -d --wait
name: infra-local
services:
  dynamodb-local:
    image: "amazon/dynamodb-local:2.5.2"
    command: ["-jar","DynamoDBLocal.jar","-sharedDb","-inMemory"]
    ports:
      - "127.0.0.1:8000:8000"
    healthcheck:
      test: ["CMD-SHELL","bash -c ':> /dev/tcp/127.0.0.1/8000' || exit 1"]
      interval: 10s
      timeout: 5s
      retries: 10
      start_period: 5s


// === ARCHIVO: infra-local/README.md ===
# Infraestructura local

Servicios de soporte para el reto, definidos en `docker-compose.yml` (raiz del repo).

```bash
docker compose up -d --wait
```

| Servicio | Imagen | Puertos (host) |
|---|---|---|
| DynamoDB Local | `amazon/dynamodb-local:2.5.2` | 8000 |

Credenciales: solo de desarrollo local (`local-dev-only`, `local`). No son secretos ni deben reutilizarse.
Los scripts de `infra-local/` (tablas, topics) se ejecutan con el compose en estado healthy.


// === ARCHIVO: infra-local/dynamodb/create-tables.sh ===
#!/usr/bin/env bash
# Crea las tablas en DynamoDB Local (idempotente). Credenciales dummy: DynamoDB Local no valida firmas.
set -euo pipefail

export AWS_ACCESS_KEY_ID=local
export AWS_SECRET_ACCESS_KEY=local
export AWS_REGION=us-east-1
ENDPOINT="${DYNAMODB_ENDPOINT:-http://localhost:8000}"

create_table() {
  local name="$1" pk="$2" sk="${3:-}"
  if aws dynamodb describe-table --table-name "$name" --endpoint-url "$ENDPOINT" >/dev/null 2>&1; then
    echo "Tabla $name ya existe"
    return
  fi
  local attrs="AttributeName=$pk,AttributeType=S"
  local keys="AttributeName=$pk,KeyType=HASH"
  if [ -n "$sk" ]; then
    attrs="$attrs AttributeName=$sk,AttributeType=S"
    keys="$keys AttributeName=$sk,KeyType=RANGE"
  fi
  # shellcheck disable=SC2086
  aws dynamodb create-table --table-name "$name" --attribute-definitions $attrs --key-schema $keys \
    --billing-mode PAY_PER_REQUEST --endpoint-url "$ENDPOINT" >/dev/null
  echo "Tabla $name creada"
}

create_table "app-items" "id"

```
