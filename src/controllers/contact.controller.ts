import { contactDTO } from './../validators/contactValidator';
import { ContactService } from './../services/contact.service';
import { Controller, Post, Body, Get } from '@nestjs/common';
import { Response, ResponseUtils } from 'utils';

@Controller('contact')
export class ContactController {
  constructor(private contactService: ContactService) {}

  @Post('send-message')
  async sendMessage(@Body() user: contactDTO): Promise<Response> {
    try {
      const { status, message, data } = await this.contactService.contact(user);

      if (status == 'failed')
        return ResponseUtils.getErrorResponse(message, data);

      return ResponseUtils.getSuccessResponse(data, message);
    } catch (error) {
      return ResponseUtils.getErrorResponse(error.message, []);
    }
  }

  @Post('subscribe-to-newsletter')
  async subscribeTONewsletter(@Body() body: any) {
    try {
      const { status, message, data } =
        await this.contactService.subscribeTONewsletter(body.email);

      if (status == 'failed')
        return ResponseUtils.getErrorResponse(message, data);

      return ResponseUtils.getSuccessResponse(data, message);
    } catch (error) {
      return ResponseUtils.getErrorResponse(error.message, []);
    }
  }

  @Get('messages')
  async getMessages(): Promise<Response> {
    try {
      const data = await this.contactService.getMessages();

      return ResponseUtils.getSuccessResponse(data);
    } catch (error) {
      return ResponseUtils.getErrorResponse(error.message, []);
    }
  }

  @Get('subscribers')
  async getSubscribers(): Promise<Response> {
    try {
      const data = await this.contactService.getSubscribers();

      return ResponseUtils.getSuccessResponse(data);
    } catch (error) {
      return ResponseUtils.getErrorResponse(error.message, []);
    }
  }
}
