export interface UserPhoto {
  displayImage: string;
  coverImage: string;
}

export interface UserSocial {
  twitterUrl: string;
  facebookUrl: string;
  telegramUrl: string;
  youtubeUrl: string;
  pinterestUrl: string;
  discordUrl: string;
}

export interface SliderImages {
  firstSlide?: string;
  secondSlide?: string;
  thirdSlide?: string;
}

export enum Role {
  User = 'user',
  Admin = 'admin',
  SuperAdmin = 'super-admin',
}
