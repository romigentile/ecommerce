import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { loggerGlobal } from './middlewares/loggerGlobal';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(loggerGlobal)
  app.useGlobalPipes(new ValidationPipe({whitelist: true})) //* VOY A USAR LA INSTANCIA

  const swaggerConfig = new DocumentBuilder()
    .setTitle("Ecommerce Romina Gentile - M4 FullStack BackEnd - Henry")
    .setDescription("Esta es la API construida con NestJS para el Ecommerce del M4 de la especialidad BackEnd de Henry. \n- Al iniciarse el servidor, se realiza una precarga de datos en categorias y productos de forma automática. \n- Para acceder a rutas autorizadas, se requiere un token. \n- El token se obtiene de la petición POST a la ruta /auth/login \n- El token es valido por 1 hora. \n- Si crea un usuario y se le indica que el mismo ya existe, no modifique el nombre. Puede modificar el email agregando caracteres alfa numéricos aleatorios antes del @, sin modificar example.com. \n- Si crea un producto y se le indica que ya existe, modifique el nombre agregando numeros aleatorios, manteniendo la extructura TestProduct. \n- Si crea una categoría y se le indica que ya existe, modifique el nombre agregando numeros aleatorios, manteniendo la extructura TestCategory.")
    .setContact("Romina Gentile", "https://github.com/romigentile", "romigentile@hotmail.com")
    .setVersion('1.0')
    .addBearerAuth()
    .build();

    const document = SwaggerModule.createDocument(app, swaggerConfig);
    SwaggerModule.setup('api', app, document);

    app.use('/', (req, res) => {
      res.redirect('/api');
    });

  await app.listen(3000);
}
bootstrap();
