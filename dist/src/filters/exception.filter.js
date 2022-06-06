"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var ExceptionsFilter_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExceptionsFilter = void 0;
const common_1 = require("@nestjs/common");
let ExceptionsFilter = ExceptionsFilter_1 = class ExceptionsFilter {
    constructor() {
        this.logger = new common_1.Logger(ExceptionsFilter_1.name);
    }
    catch(exception, host) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const request = ctx.getRequest();
        let status = common_1.HttpStatus.INTERNAL_SERVER_ERROR;
        this.logger.error('Error: ');
        this.logger.error(exception);
        let message = exception;
        if (exception.message) {
            message = exception.message;
        }
        if (exception.response) {
            message = exception.response.message;
        }
        if (message.indexOf !== undefined) {
            if (message.indexOf('not found') >= 0) {
                status = common_1.HttpStatus.NOT_FOUND;
            }
        }
        response.status(status).json({
            status: 'error',
            message: message,
            statusCode: status,
            timestamp: new Date().toISOString(),
        });
    }
};
ExceptionsFilter = ExceptionsFilter_1 = __decorate([
    (0, common_1.Catch)()
], ExceptionsFilter);
exports.ExceptionsFilter = ExceptionsFilter;
//# sourceMappingURL=exception.filter.js.map