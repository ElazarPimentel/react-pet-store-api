# Pata-Pata Petstore API

**Pata-Pata Petstore API** es una API backend desarrollada en **Node.js** y **Express.js** que gestiona listados de productos y carritos de compras para una tienda de mascotas Online. Esta API proporciona endpoints para **obtener detalles de productos**, **agregar nuevos productos** y **gestionar carritos de compras**.

## Características Principales
- **Productos**: Los usuarios pueden obtener una lista de productos disponibles en la tienda, ver detalles de productos individuales por su ID y agregar nuevos productos al catálogo.
- **Carritos de Compras**: Los usuarios pueden crear carritos de compras, agregar productos al carrito y actualizar la cantidad de productos en los carritos existentes.
- **Archivos Estáticos**: La API también sirve imágenes de los productos (thumbnails) alojadas en el directorio público del servidor.
- **Persistencia de Datos**: Los datos de productos y carritos se almacenan en archivos JSON, simulando una configuración básica de base de datos.
- **Middleware**: La API utiliza middleware personalizado para el manejo de errores y la validación de datos.

## Instalación
1. Cloná este repositorio.
2. Instalá las dependencias con:
   
   npm install
   
3. Ejecutá la aplicación localmente con:
   
   npm start
   

## Endpoints
### Productos
- **GET /products**: Obtené todos los productos disponibles.
- **GET /products/:id**: Obtén un producto específico por su ID.
- **POST /products**: Agregá un nuevo producto al catálogo.

### Carritos
- **GET /carts/:id**: Obtiene un carrito por su ID.
- **POST /carts**: Creá un nuevo carrito.
- **POST /carts/:cid/product/:pid**: Agregá un producto al carrito o actualizá la cantidad del producto existente en el carrito.

## Ejemplo de Uso
Con herramientas como **Postman** o lo que gustes. Podés realizar peticiones **GET** para obtener información y **POST** para agregar productos o carritos. 

## Deploy

En Vercel y se puede acceder a través de:

[https://react-pet-store-api.vercel.app](https://react-pet-store-api.vercel.app)

## Requerimientos

- **Node.js** versión 14 o superior.
- **Express.js** como framework backend.

## Middleware
La API utiliza varios middleware para mejorar su funcionalidad y seguridad:

- **Error Handling**: Middleware personalizado para capturar y manejar errores de manera consistente en toda la aplicación.
- **Data Validation**: Utiliza middleware para validar los datos de entrada en las solicitudes, asegurando que cumplan con los formatos y requisitos esperados.
- **CORS**: Configuración de Cross-Origin Resource Sharing para permitir solicitudes desde dominios específicos.
- **JSON Parsing**: Middleware para analizar el cuerpo de las solicitudes JSON entrantes.
