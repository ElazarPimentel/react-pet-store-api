### **README.md**

# Pata-Pata Petstore API

**Pata-Pata Petstore API** es una API backend creada en **Node.js** y **Express.js** que administra listados de productos y carritos de compras para una tienda de mascotas online. Esta API provee endpoints para **consultar detalles de productos**, **agregar nuevos productos**, **actualizar y eliminar productos**, y **gestionar carritos de compras**.

## Características Principales
- **Productos**: Los usuarios pueden obtener una lista de productos disponibles, ver detalles de productos individuales por su ID, agregar nuevos productos al catálogo, actualizar productos existentes y eliminar productos.
- **Carritos de Compras**: Los usuarios pueden crear carritos de compras, agregar productos al carrito y actualizar la cantidad de productos en los carritos.
- **Archivos Estáticos**: La API también sirve las imágenes de los productos (thumbnails) alojadas en el directorio público del servidor.
- **Persistencia de Datos**: Los datos de productos y carritos se almacenan en archivos JSON ubicados en el directorio `/tmp` para compatibilidad con Vercel.
- **Middleware**: La API utiliza middleware personalizado para la validación de datos y manejo de errores.

## Instalación
1. Cloná este repositorio.
2. Instalá las dependencias con:
   npm install

3. Ejecutá la aplicación localmente con:
   npm start

## Endpoints
### Productos
- **GET /products**: Obtené todos los productos disponibles. Podés agregar un parámetro de consulta `?limit` para limitar la cantidad de productos retornados.
- **GET /products/:id**: Consultá un producto específico por su ID.
- **POST /products**: Agregá un nuevo producto al catálogo. Campos requeridos:
  - `title` (string)
  - `description` (string)
  - `code` (string)
  - `price` (number)
  - `stock` (number)
  - `category` (string)
  
  Campos opcionales:
  - `status` (boolean, por defecto `true`)
  - `thumbnails` (array de strings con rutas de imágenes)
  
- **PUT /products/:id**: Actualizá los campos de un producto existente excepto su `id`. Campos a actualizar:
  - `title` (string)
  - `description` (string)
  - `code` (string)
  - `price` (number)
  - `stock` (number)
  - `category` (string)
  - `status` (boolean)
  - `thumbnails` (array de strings con rutas de imágenes)
  
- **DELETE /products/:id**: Eliminá un producto por su ID.

### Carritos
- **GET /carts/:id**: Consultá un carrito por su ID.
- **POST /carts**: Creá un nuevo carrito con un `id` auto-generado y un array vacío de `products`.
- **POST /carts/:cid/product/:pid**: Agregá un producto al carrito o actualizá la cantidad de un producto existente en el carrito. 

Campos gestionados:
  - `product` (ID del producto)
  - `quantity` (incrementa si el producto ya existe en el carrito)

## Ejemplo de Uso
Podés utilizar herramientas como **Postman** para hacer solicitudes **GET**, **POST**, **PUT** y **DELETE** a los endpoints mencionados y gestionar productos o carritos.

### **Ejemplos:**

- **Agregar un nuevo producto:**
  POST /products
  {
    "title": "Juguete para Gatos",
    "description": "Un juguete divertido para gatos",
    "code": "JG-001",
    "price": 15.99,
    "stock": 100,
    "category": "Juguetes",
    "thumbnails": ["https://mi-tienda.com/images/juguete_gato.jpg"]
  }
  

- **Actualizar un producto existente:**
  PUT /products/1
  {
    "price": 17.99,
    "stock": 95
  }
  

- **Crear un nuevo carrito:**
    POST /carts
  

- **Agregar un producto al carrito:**
  POST /carts/1/product/2


## Deploy
La API está alojada en Vercel y se puede acceder en:

[https://react-pet-store-api.vercel.app](https://react-pet-store-api.vercel.app)

## Requerimientos
- **Node.js** versión 14 o superior.
- **Express.js** como framework backend.

## Middleware
La API utiliza varios middleware personalizados para mejorar su funcionalidad:

- **Manejo de Errores**: Middleware que captura y gestiona errores de manera uniforme en toda la aplicación.
- **Validación de Datos**: Middleware que valida los datos de entrada en las solicitudes, asegurando que tengan los formatos y requisitos correctos.
- **CORS**: Configuración de Cross-Origin Resource Sharing para permitir solicitudes de dominios específicos.
- **Análisis de JSON**: Middleware para interpretar el cuerpo de las solicitudes JSON.

## Notas Adicionales
- **Persistencia de Datos en Vercel**: Debido a las restricciones del sistema de archivos de Vercel, los archivos JSON para productos y carritos se almacenan en el directorio `/tmp`, que es temporal y se reinicia en cada invocación de función. Para una persistencia de datos real, se recomienda utilizar una base de datos externa.
- **Limitaciones de `/tmp`**: Recordá que los datos almacenados en `/tmp` no son persistentes y se perderán entre las ejecuciones. Esto es adecuado para propósitos de prueba y desarrollo, pero no para un entorno de producción.

## Contribuciones
Las contribuciones son bienvenidas. Si encontrás algún problema o querés proponer mejoras, podés abrir un issue o pull request. ¡Gracias por colaborar! :)

### **Descripción de los Cambios Realizados:**

1. **Actualización de Endpoints:**
   - **Productos:**
     - Se añadieron los endpoints `PUT /products/:id` y `DELETE /products/:id` para cumplir con los requisitos de actualización y eliminación de productos.
     - Se incluyó la opción de limitar los productos retornados en `GET /products` mediante el parámetro de consulta `?limit`.
   
   - **Carritos:**
     - Se mantuvieron los endpoints existentes, asegurando que cumplan con los requisitos de la asignación.

2. **Detalles de Campos:**
   - Se especificaron claramente los campos requeridos y opcionales para los endpoints `POST` y `PUT` de productos.
   - Se aclaró que el campo `thumbnails` es opcional y no se fuerza una imagen por defecto.

3. **Notas Adicionales:**
   - Se añadió una sección sobre la persistencia de datos en Vercel, destacando las limitaciones del directorio `/tmp` y recomendando el uso de una base de datos externa para la persistencia real.

4. **Ejemplos de Uso:**
   - Se incluyeron ejemplos prácticos para los distintos endpoints, facilitando el entendimiento y uso de la API.
