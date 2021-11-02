# API DE LOCALIZACIONES Y GESTION DE USUARIOS 

Un API que provee una herramienta de gestion de localizaciones, y te permite gestionar cuentas de usuario,
con el objetivo de servir de backend para explotar un API de datos climatologicos de manera personalizada desde un frontend *UNDER CONSTRUCTION*.

## Comenzando 🚀

Clona el repositorio `git clone https://github.com/rubensantibanezacosta/my_weather_backend`


## Pre-requisitos 📋

- **Node.js** y **NPM**  ***https://nodejs.org/es/***

- **MySQL** o **MariaDB** ***https://www.mysql.com/downloads/***



## Instalación 🔧

- Importa el archivo **myWeather.sql** a tu servidor MySQL. Ruta `backend/Estudiantes.sql` 

- Crea un archivo `.env` en la raíz del proyecto, utilizando como plantilla el archivo env.example ubicado en la raiz del proyecto también.

- En la raiz del proyecto, abre una terminal y ejecuta los scripts:

    ###### *Para instalar paquetes*
      
    - `npm install` 
    
    ###### *Para obtener API KEYS*
    
    - `npm run apiKeys` para generar dos nuevos tokens en la base de datos, uno con scopes de administrador, y otro con scopes de usuario.
    -  Mas tarde necesitaras copiarlos y pegarlos para las peticiones en POSTMAN.

   ###### *Para levantar el servidor* 
    - Dos opciones:
      - `npm run dev` para levantar el servidor en modo desarrollo, con hot reloading.
      - `npm run start` para levantar el sevidor en modo producción




## Uso 📦

RUTAS a la API:

### ​REGISTRAR NUEVO USUARIO

#### ​POST

[http://localhost:4000/api/auth/sign-up/](http://localhost:4000/api/auth/sign-up/)
(json)


`body{`

`password: 1551,`

`name: Ruben,`

`username: test@test,`

`isAdmin:false`

`}`

### ​INICIAR SESIÓN

#### ​POST

[http://localhost:4000/api/auth/sign-in](http://localhost:4000/api/auth/sign-in/)

Authorization: basic

`username: ruben@ruben,`

`password: 1234,`

(json)

`body{`

`apiKeyToken:{{Api key Token}},`

`rememberMe:true`

`},`

`}`

response:

`{`

`token:{{sign-in-token}}`

`user: {`

`username: ruben@ruben,`

`name: Ruben`

`}`

`}`

##### ​

### ​ACTUALIZAR DATOS DE USUARIO

### ​PUT

[http://localhost:4000/api/user/ruben@ruben](http://localhost:4000/api/user/ruben@ruben)

Authorization: Bearer token {{_sing-in token_}}

(json)

`body{`

`password: 1234,`

`name: Ruben,`

`username: ruben@ruben;`

`isAdmin:true`

`},`

### ​OBTENER TODOS LOS USUARIOS

#### ​GET

Authorization: Bearer token {{_sing-in token_}}

http://localhost:4000/api/user/

### ​OBTENER USUARIO POR NOMBRE DE USUARIO

#### ​GET

Authorization: Bearer token {{_sing-in token_}}

http://localhost:4000/api/user/ruben@ruben

### ​CREAR USUARIO

#### ​POST

http://localhost:4000/api/user/

Authorization: Bearer token {{_sing-in token_}}

(Json)

`body{`

`password: 1551,`

`name: Ruben,`

`username: test@test,`

`isAdmin:true`

`}`

### ​ELIMINAR USUARIO POR NOMBRE DE USUARIO

#### ​DELETE

http://localhost:4000/api/user/test@test

Authorization : Bearer token {{_sing-in token_}}




## Construido con 🛠️



* [Express js](https://expressjs.com/es/) - *Framework usado para el Backend*
* [Visual Studio Code](https://code.visualstudio.com) - *Editor utilizado*
* [MySQL](https://www.mysql.com/) - *Motor de bases de datos*
* [Sequelize](https://sequelize.org/) - *ORM utilizado*


## Autores ✒️


* **Ruben Santibañez Acosta** - *Desarrollo y documentación* -  [rubensantibanezacosta](https://github.com/rubensantibanezacosta)


## Agradecimientos :wave:


* **Tiburcio Cruz Ravelo** - *Docente del Instituto IES El Rincón* -  [tcurav](https://github.com/tcrurav)



---
⌨️ con ❤️ por [rubensantibanezacosta](https://github.com/rubensantibanezacosta) 😊
