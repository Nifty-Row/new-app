"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, {
        logger: ['error', 'warn', 'debug', 'log', 'verbose'],
    });
    app.enableCors();
    app.useGlobalPipes(new common_1.ValidationPipe());
    app.setGlobalPrefix('/yasuke-server');
    app.use((0, express_1.json)({ limit: '50mb' }));
    app.use((0, express_1.urlencoded)({ extended: true, limit: '50mb' }));
    await app.listen(process.env.PORT, () => {
        console.log(`app server running on PORT ${process.env.PORT}`);
    });
}
bootstrap();
//# sourceMappingURL=main.js.map