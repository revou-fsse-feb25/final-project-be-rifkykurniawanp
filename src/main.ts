import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Setup Swagger API Documentation
  const config = new DocumentBuilder()
    .setTitle('E-Commerce & E-Learning API')
    .setDescription('API documentation for E-Commerce and E-Learning platform')
    .setVersion('1.0')
    .addTag('products') // Add tag for products module
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
