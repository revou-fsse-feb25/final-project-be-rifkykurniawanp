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
            origin: process.env.CORS_ORIGIN ? process.env.CORS_ORIGIN.split(',') : '*',
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
        app.getHttpAdapter().get('/', (req, res) => {
            res.send('✅ EduCommerce API is running');
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
        const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 3002;
        const host = '0.0.0.0';
        await app.listen(port, host);
        logger.log(`🚀 Server running at http://${host}:${port}`);
        if (process.env.NODE_ENV !== 'production') {
            logger.log(`📚 Swagger docs: http://${host}:${port}/api/docs`);
        }
    }
    catch (error) {
        logger.error('❌ Failed to start application', error.stack || error.message);
        process.exit(1);
    }
}
bootstrap();
//# sourceMappingURL=main.js.map