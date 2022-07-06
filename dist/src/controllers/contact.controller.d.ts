import { contactDTO } from './../validators/contactValidator';
import { ContactService } from './../services/contact.service';
import { Response } from 'utils';
export declare class ContactController {
    private contactService;
    constructor(contactService: ContactService);
    sendMessage(user: contactDTO): Promise<Response>;
    subscribeTONewsletter(body: any): Promise<Response>;
}
