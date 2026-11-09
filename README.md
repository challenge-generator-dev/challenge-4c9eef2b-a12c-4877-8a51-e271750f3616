# Implementación de CRUD de productos en DynamoDB con Express

El sistema debe permitir a los usuarios crear, leer, actualizar y eliminar productos en una base de datos DynamoDB. Los productos tienen atributos como nombre, precio y descripción. El sistema debe manejar errores comunes como productos duplicados y validaciones de campos. La API debe ser accesible a través de Express y debe ser testeada con Jest.

## Informacion General

| Campo | Valor |
|-------|-------|
| **Tema** | crud-de-productos-con-express-y-dynamodb |
| **Nivel** | advanced-l2 |
| **Tipo** | practical |
| **Tiempo estimado** | 8 horas |

## Fases del Reto

### Fase 0: Configuración del Proyecto

**Objetivo:** Obtener el proyecto base funcional enviando el Código Base a un asistente de IA, que lo analizará, corregirá errores y entregará cada archivo con su ruta.

**Tiempo estimado:** 15-30 minutos

**Instrucciones:**

- Asegúrate de tener instalado para ejecutar el proyecto: Node.js 18+, npm, VS Code o similar.
- Copia todo el contenido del campo **Código Base** de este reto — incluyendo el texto de instrucciones que aparece al inicio.
- Abre un asistente de IA (Claude en claude.ai, ChatGPT o Gemini — se recomienda Claude), pega el contenido copiado en el chat y envíalo.
- El asistente analizará los archivos, corregirá errores y entregará cada archivo con su ruta. Guárdalos en la carpeta donde quieras trabajar, respetando las rutas.
- Ejecuta `npm install && npm run build` (o `npm start`). Si no hay errores, estás listo.

**Entregable:** El proyecto compila/arranca sin errores.

<details>
<summary>Pistas de conocimiento</summary>

- Copia el Código Base completo incluyendo el texto de instrucciones al inicio — esas instrucciones le indican al asistente exactamente qué hacer con los archivos.
- Si el asistente no entrega todos los archivos al terminar el análisis, escríbele: "entrégame todos los archivos con su ruta".
- Si el proyecto tiene errores al arrancar, comparte el mensaje de error con el mismo asistente para que lo corrija.

</details>

### Fase 1: Configuración inicial y creación de productos

**Objetivo:** Configurar el entorno de desarrollo y permitir la creación de productos.

**Tiempo estimado:** 2 horas

**Instrucciones:**

- Configurar el proyecto con Express y DynamoDB.
- Implementar la funcionalidad para crear un producto.
- Asegurar que los productos creados tengan atributos válidos (nombre, precio, descripción).

**Entregable:** Proyecto configurado con Express y DynamoDB, y funcionalidad para crear productos.

<details>
<summary>Pistas de conocimiento</summary>

- Configuración de DynamoDB y Express.
- Validación de campos en la creación de productos.

</details>

### Fase 2: Lectura y actualización de productos

**Objetivo:** Permitir la lectura y actualización de productos existentes.

**Tiempo estimado:** 3 horas

**Instrucciones:**

- Implementar la funcionalidad para leer un producto por su ID.
- Implementar la funcionalidad para actualizar un producto.
- Asegurar que las actualizaciones respeten las validaciones de campos.

**Entregable:** Funcionalidad para leer y actualizar productos.

<details>
<summary>Pistas de conocimiento</summary>

- Consulta de productos por ID en DynamoDB.
- Actualización de productos con validación de campos.

</details>

### Fase 3: Eliminación de productos y pruebas unitarias

**Objetivo:** Permitir la eliminación de productos y cubrir todas las funcionalidades con pruebas unitarias.

**Tiempo estimado:** 3 horas

**Instrucciones:**

- Implementar la funcionalidad para eliminar un producto por su ID.
- Escribir pruebas unitarias para todas las funcionalidades CRUD utilizando Jest.
- Asegurar que las pruebas cubran casos borde y errores comunes.

**Entregable:** Funcionalidad para eliminar productos y suite de pruebas unitarias.

<details>
<summary>Pistas de conocimiento</summary>

- Eliminación de productos en DynamoDB.
- Escritura de pruebas unitarias con Jest.

</details>

## Dimensiones Evaluadas

- **queEs**: ¿Qué es un producto y cuáles son sus atributos?
- **paraQueSirve**: ¿Para qué sirve cada operación CRUD en el contexto de productos?
- **comoSeUsa**: ¿Cómo se usa la API para crear, leer, actualizar y eliminar productos?
- **erroresComunes**: ¿Cuáles son los errores comunes que pueden ocurrir al realizar operaciones CRUD y cómo se manejan?
- **queDecisionesImplica**: ¿Qué decisiones de diseño implica la implementación de las operaciones CRUD y cómo se justifican?

## Criterios de Evaluacion

- Configuración correcta del entorno de desarrollo con Express y DynamoDB.
- Implementación de la funcionalidad para crear productos con validación de campos.
- Implementación de la funcionalidad para leer productos por su ID.
- Implementación de la funcionalidad para actualizar productos con validación de campos.
- Implementación de la funcionalidad para eliminar productos por su ID.
- Escritura de pruebas unitarias para todas las funcionalidades CRUD utilizando Jest.
- Cobertura de casos borde y errores comunes en las pruebas unitarias.

## Como trabajar con un asistente de IA

Hay dos caminos, elegi uno:

- **AGENTS.md** (recomendado) — instrucciones nativas del repo. Abri esta carpeta con tu agente local (Claude Code, Cursor, Codex, Copilot, Gemini) y las carga solo. Sabe que archivos faltan y con que comando se verifica, y completa el scaffold escribiendo en disco.
- **PROMPT_MEJORA.md** — para copiar y pegar en un chat (claude.ai, ChatGPT) si no tenes un agente en el IDE. Declara lo mismo que AGENTS.md; los archivos que te devuelva el chat los guardas en esta carpeta respetando las rutas.

Ninguno de los dos resuelve las fases del reto: eso es tu trabajo.

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

## Verificacion

El proyecto esta listo para trabajar cuando este comando corre sin errores:

```bash
npm install && npm run build && docker compose config -q
```

---

*Reto generado automaticamente por Challenge Generator - Pragma*
