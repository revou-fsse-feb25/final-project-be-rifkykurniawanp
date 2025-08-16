import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { RequestMethod, ValidationPipe, Logger } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const logger = new Logger('Bootstrap');

  try {
    const app = await NestFactory.create(AppModule);

    // CORS Configuration
    app.enableCors({
      origin: process.env.CORS_ORIGIN ? process.env.CORS_ORIGIN.split(',') : '*',
      credentials: true,
    });

    // Global Validation
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        transform: true,
        forbidNonWhitelisted: true,
        transformOptions: { enableImplicitConversion: true },
      }),
    );

    // API Prefix
    app.setGlobalPrefix('api/v1', {
      exclude: [{ path: '', method: RequestMethod.GET }],
    });

    // Root health check (important for Railway)
    app.getHttpAdapter().get('/', (req, res) => {
      res.send('✅ EduCommerce API is running');
    });

    // Swagger (disable in production)
    if (process.env.NODE_ENV !== 'production') {
      const config = new DocumentBuilder()
        .setTitle('EduCommerce API')
        .setDescription('API documentation for Coffee, Tea, Herbal, and Courses platform')
        .setVersion('1.0')
        .addBearerAuth(
          { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
          'Authorization',
        )
        .build();

      const document = SwaggerModule.createDocument(app, config);
      SwaggerModule.setup('api/docs', app, document);
    }

    // Port & Host
    const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 3002;
    const host = '0.0.0.0'; // always bind for Railway

    await app.listen(port, host);

    logger.log(`🚀 Server running at http://${host}:${port}`);
    if (process.env.NODE_ENV !== 'production') {
      logger.log(`📚 Swagger docs: http://${host}:${port}/api/docs`);
    }
  } catch (error) {
    logger.error('❌ Failed to start application', error.stack || error.message);
    process.exit(1);
  }
}

bootstrap();
