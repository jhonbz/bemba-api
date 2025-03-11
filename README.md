# BEMBA API

Este proyecto es una API desarrollada en Node.js para gestionar la base de datos en AWS RDS.

## Requisitos Previos
Antes de comenzar, asegúrate de tener instalado:

- [Node.js](https://nodejs.org/) (versión recomendada: LTS)
- [Git](https://git-scm.com/)
- Un editor de código como [VS Code](https://code.visualstudio.com/)
- MySQL o PostgreSQL (dependiendo de la base de datos en AWS RDS)

## Instalación

1. **Clonar el repositorio**
```sh
 git clone https://github.com/tuusuario/bemba-api.git
 cd bemba-api
```

2. **Instalar dependencias**
```sh
 npm install
```

3. **Crear el archivo `.env` y configurar las credenciales de AWS RDS**
Crea un archivo `.env` en la raíz del proyecto y agrega:
```env
DB_HOST=database-bemba.ccvqw4qmw5n4.us-east-1.rds.amazonaws.com
DB_USER=tu_usuario
DB_PASS=tu_contraseña
DB_NAME=nombre_de_tu_base
DB_PORT=3306
PORT=3000
```

4. **Iniciar el servidor**
```sh
 node server.js
```
O con `nodemon` para recargar automáticamente los cambios:
```sh
 npm install -g nodemon
 nodemon server.js
```

## Endpoints de la API

### **Prueba de conexión**
- `GET /` → Devuelve un mensaje confirmando que el servidor está corriendo.

### **Obtener todos los artistas**
- `GET /artistas` → Devuelve una lista de todos los artistas en la base de datos.

Más endpoints serán añadidos conforme avance el desarrollo.

## Consideraciones
- **No subir el archivo `.env`** para mantener seguras las credenciales.
- Asegurar que el grupo de seguridad en AWS permite la conexión desde tu IP.

---
Con esto, ya puedes trabajar con la API de BEMBA 🚀

