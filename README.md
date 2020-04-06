### Prueba Tecnica Backend

Desarollo de API REST con operaciones CRUD
- Endpoints Disponibles: centroscomerciales, locales, marcas, tiendas, usuarios, inquilino
- Se debe configurar el archivo .env en el se deben  incluir las variables de entorno DB_URI, DB_NAME y SecretKey.
- para acceder al los endpoints es necesario agregar un usuario, con roles Administrador o Inquilino,  este devuelve un token el cual se agrega a los headers para la validacion por roles.
- se agrega la ruta login para el logeo de un usuario, el cual retorna un token para acceder a los diferentes endpoints