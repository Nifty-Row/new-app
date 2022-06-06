import { contactDTO } from './../validators/contactValidator';
import { ContactUs, Newsletter } from './../models/contant.entity';
import { Repository } from 'typeorm';
import { Response } from 'utils';
export declare class ContactService {
    contactUsRepository: Repository<ContactUs>;
    newsletterRepository: Repository<Newsletter>;
    constructor();
    contact(contactData: contactDTO): Promise<Response>;
    subscribeTONewsletter(email: string): Promise<Response>;
}
