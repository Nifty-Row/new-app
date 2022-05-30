import { createUserDto } from './../validators/authValidator';
import { LocalAuthGuard } from './../guards/local-auth.guard';
import {
  Controller,
  Post,
  Get,
  Body,
  UseGuards,
  Request,
} from '@nestjs/common';
import { AuthService } from './../services/auth.service';
import { Response, ResponseUtils } from 'utils';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get()
  async default() {
    return 'Hello World';
  }

  @Post('register')
  async register(@Body() user: createUserDto): Promise<Response> {
    try {
      const { status, message, data } = await this.authService.register(user);

      if (status == 'failed')
        return ResponseUtils.getErrorResponse(message, data);

      return ResponseUtils.getSuccessResponse(data, message);
    } catch (error) {
      return ResponseUtils.getErrorResponse(error.message, []);
    }
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return ResponseUtils.getSuccessResponse(
      await this.authService.login(req.user),
      'login successful'
    );
  }
}
