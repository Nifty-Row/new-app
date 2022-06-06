import { contactDTO } from './../validators/contactValidator';
import { InjectRepository } from '@nestjs/typeorm';
import { ContactUs, Newsletter } from './../models/contant.entity';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Response } from 'utils';

@Injectable()
export class ContactService {
  @InjectRepository(ContactUs) contactUsRepository: Repository<ContactUs>;
  @InjectRepository(Newsletter) newsletterRepository: Repository<Newsletter>;

  constructor() {}

  async contact(contactData: contactDTO): Promise<Response> {
    const contactMessage = await this.contactUsRepository.save(contactData);

    return {
      data: contactMessage,
      message: 'message sent successfully',
      status: 'success',
    };
  }

  async subscribeTONewsletter(email: string): Promise<Response> {
    const alreadySubscribed = await this.newsletterRepository.findOne({
      email,
    });

    if (alreadySubscribed)
      return {
        status: 'failed',
        message: 'You are already subscribed to our newsletter',
        data: [],
      };

    await this.newsletterRepository.save({ email });

    return {
      status: 'success',
      message: "you've successfully subscribed to our newsletter",
      data: [],
    };
  }
}
