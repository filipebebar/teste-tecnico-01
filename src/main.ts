import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { INestApplication, Logger } from '@nestjs/common';
import configuration from './config/configuration';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

function buildSwagger(app: INestApplication) {
  const documentBuilder = new DocumentBuilder();

  documentBuilder.setTitle('Teste-tecnico API').setDescription('Teste').setVersion('1.0');

  const document = SwaggerModule.createDocument(app, documentBuilder.build());
  SwaggerModule.setup('/doc', app, document);
}

async function bootstrap() {
  try {
    const app = await NestFactory.create(AppModule);
    app.setGlobalPrefix('api/');

    buildSwagger(app);
    await app.listen(configuration().port, '0.0.0.0', async () => {
      console.log(`Server running on ${await app.getUrl()}`);
      Logger.log(`Server running on ${await app.getUrl()}`, 'Bootstrap');
    });
  } catch (e) {
    console.log(e);
  }
}

bootstrap();
