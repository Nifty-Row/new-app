import { AdminService } from './../services/admin.service';
import { Response } from './../../utils';
import { SliderImages } from './../interfaces';
export declare class PhotoController {
    private adminService;
    constructor(adminService: AdminService);
    updateProfileImages(images: SliderImages): Promise<Response>;
}
