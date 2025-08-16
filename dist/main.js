"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
async function bootstrap() {
    const logger = new common_1.Logger('Bootstrap');
    try {
        const app = await core_1.NestFactory.create(app_module_1.AppModule);
        app.enableCors({
            origin: process.env.CORS_ORIGIN || '*',
            credentials: true,
        });
        app.useGlobalPipes(new common_1.ValidationPipe({
            whitelist: true,
            transform: true,
            forbidNonWhitelisted: true,
            transformOptions: { enableImplicitConversion: true },
        }));
        app.setGlobalPrefix('api/v1', {
            exclude: [{ path: '', method: common_1.RequestMethod.GET }],
        });
        if (process.env.NODE_ENV !== 'production') {
            const config = new swagger_1.DocumentBuilder()
                .setTitle('EduCommerce API')
                .setDescription('API documentation for Coffee, Tea, Herbal, and Courses platform')
                .setVersion('1.0')
                .addBearerAuth({ type: 'http', scheme: 'bearer', bearerFormat: 'JWT' }, 'Authorization')
                .build();
            const document = swagger_1.SwaggerModule.createDocument(app, config);
            swagger_1.SwaggerModule.setup('api/docs', app, document);
        }
        const port = process.env.PORT || 3002;
        const host = process.env.HOST || 'localhost';
        await app.listen(port, host);
        logger.log(`🚀 Server running at http://${host}:${port}`);
        logger.log(`📚 Swagger docs: http://${host}:${port}/api/docs`);
    }
    catch (error) {
        logger.error('Failed to start application', error);
        process.exit(1);
    }
}
bootstrap();
//# sourceMappingURL=main.js.map