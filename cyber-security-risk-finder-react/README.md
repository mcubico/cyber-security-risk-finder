# Buscador de riesgos de Ciberseguridad

## Descripción General

En este repositorio encontrarás el código fuente de una pequeña aplicación que tiene como propósito facilitar la búsqueda de riesgos de ciberseguridad. La aplicación se construyó usando el framework ReactJS y para su funcionamiento se apoya en el repositorio ([api-py-flask-mongo](https://github.com/mcubico/api-py-flask-mongo.git)) que facilita la gestión de los riesgos.

## Dependencias Principales

- ReactJS
- API py flask mongo

## Instrucciones de instalación

### Descargue el repositorio desde GitHub

```shell
git clone https://github.com/mcubico/cyber-security-risk-finder.git
```

### Instalar las dependencias del proyecto

Después de descargar el proyecto ubíquese en ese directorio y ejecute el siguiente:

```shell
npm install
```

## Estructura del proyecto

```
cyber-security-risk-finder-react
┣ coverage
┃ ┣ base.css
┃ ┣ block-navigation.js
┃ ┣ clover.xml
┃ ┣ coverage-final.json
┃ ┣ favicon.png
┃ ┣ index.html
┃ ┣ prettify.css
┃ ┣ prettify.js
┃ ┣ sort-arrow-sprite.png
┃ ┗ sorter.js
┣ public
┃ ┗ vite.svg
┣ src
┃ ┣ assets
┃ ┃ ┗ react.svg
┃ ┣ components
┃ ┃ ┣ atoms
┃ ┃ ┃ ┗ Copyright.tsx
┃ ┃ ┣ molecules
┃ ┃ ┃ ┣ PrivateRoutes.tsx
┃ ┃ ┃ ┗ SearchBar.tsx
┃ ┃ ┗ organisms
┃ ┃ ┃ ┗ CustomTable.tsx
┃ ┣ context
┃ ┣ models
┃ ┃ ┣ api-response.model.ts
┃ ┃ ┣ custom-table-props.model.ts
┃ ┃ ┣ features.model.ts
┃ ┃ ┣ fetch-risk-response.model.ts
┃ ┃ ┣ pagination.model.ts
┃ ┃ ┗ risk.model.ts
┃ ┣ pages
┃ ┃ ┣ HomePage.tsx
┃ ┃ ┣ LoginPage.tsx
┃ ┃ ┗ RootPage.tsx
┃ ┣ redux
┃ ┃ ┗ store.ts
┃ ┣ router
┃ ┃ ┗ router.tsx
┃ ┣ services
┃ ┃ ┗ risk-api.service.ts
┃ ┣ utils
┃ ┃ ┣ json-server
┃ ┃ ┃ ┣ config.json
┃ ┃ ┃ ┣ db.json
┃ ┃ ┃ ┗ routes.json
┃ ┃ ┣ axios-instance.ts
┃ ┃ ┣ custom-table-styles.ts
┃ ┃ ┣ order.d.ts
┃ ┃ ┗ risk-grid-columns.tsx
┃ ┣ App.tsx
┃ ┣ env.d.ts
┃ ┣ main.tsx
┃ ┗ vite-env.d.ts
┣ .env.production
┣ .eslintrc.cjs
┣ .gitignore
┣ index.html
┣ package-lock.json
┣ package.json
┣ README.md
┣ tsconfig.json
┣ tsconfig.node.json
┣ vite.config.ts
┗ vitest.config.ts
```

## Variables de entorno

Agregue el archivo ```.env.production``` y gestione las siguientes variables de entorno:

```properties
VITE_APP_TITLE= 'Cyber Security Risk Finder'
VITE_HOME_ROUTE= '/home'
VITE_LOGIN_ROUTE= '/login'
VITE_API_URL_BASE=
VITE_API_RISKS_ENDPOINT=
```

## Estructura de la Base de datos

### Colecciones

| `Name`   | `Comment`                                       |
|----------|-------------------------------------------------|
| Users    | Usuarios con permisos de interacción con la API |
| Risks    | Colección con los riesgos                       |
| Features | Características de los riesgos                  |

#### Users

| `Nombre` | `Tipo`   |
|----------|----------|
| _id      | ObjectId |
| username | string   |
| password | string   |

#### Risks

| `Nombre`    | `Tipo`   |
|-------------|----------|
| _id         | ObjectId |
| risk        | string   |
| description | string   |
| active      | boolean  |

#### Features

| `Nombre`      | `Tipo`   | `Comentario`                            |
|---------------|----------|-----------------------------------------|
| _id           | ObjectId | Este id es el mismo del riesgo asociado |
| vulnerability | string   |                                         |
| probability   | string   |                                         |
| impact        | string   |                                         |
| thread        | string   |                                         |

## Modo de uso

Para lanzar la aplicación, use el siguiente comando:

```shell
npm run dev
```

Visite la url : <http://localhost:3000/>

## Pruebas

Para verificar que la aplicación pasa todas las pruebas unitarias y funcionales antes de subir cualquier cambio, ejecute el siguiente comando:

## Colaboración

Todas las sugerencias y pull request son bienvenidos. Para cambios críticos por favor abra un issue primero para que lo revisemos.

## License

[MIT](https://choosealicense.com/licenses/mit/)
