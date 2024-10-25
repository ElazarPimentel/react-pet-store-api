# Pata-Pata Petstore API

**Pata-Pata Petstore API** es una API backend creada en **Node.js** y **Express.js** que administra listados de productos y carritos de compras para una tienda de mascotas online. La API provee endpoints para **consultar detalles de productos**, **agregar nuevos productos** y **gestionar carritos de compras**.

## Características Principales
- **Productos**: Los usuarios pueden obtener una lista de productos disponibles, ver los detalles de productos individuales por su ID y agregar nuevos productos al catálogo.
- **Carritos de Compras**: Los usuarios pueden crear carritos de compras, agregar productos al carrito y actualizar la cantidad de productos en los carritos.
- **Archivos Estáticos**: La API también sirve las imágenes de los productos (thumbnails) alojadas en el directorio público del servidor.
- **Persistencia de Datos**: Los datos de productos y carritos se almacenan en archivos JSON, simulando una base de datos básica.
- **Middleware**: La API utiliza middleware personalizado para la validación de datos y manejo de errores.

## Instalación
1. Cloná este repositorio.
2. Instalá las dependencias con:

   npm install

3. Ejecutá la aplicación localmente con:

   npm start

## Endpoints
### Productos
- **GET /products**: Obtené todos los productos disponibles.
- **GET /products/:id**: Consultá un producto específico por su ID.
- **POST /products**: Agregá un nuevo producto al catálogo.

### Carritos
- **GET /carts/:id**: Consultá un carrito por su ID.
- **POST /carts**: Creá un nuevo carrito.
- **POST /carts/:cid/product/:pid**: Agregá un producto al carrito o actualizá la cantidad de un producto existente en el carrito.

## Ejemplo de Uso
Podés utilizar herramientas como **Postman** para hacer solicitudes **GET** y **POST** a los endpoints mencionados y gestionar productos o carritos.

## Deploy
La API está desplegada en Vercel y se puede acceder en:

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