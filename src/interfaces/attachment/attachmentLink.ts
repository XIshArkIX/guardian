import { IsBoolean, IsString, ValidateNested } from 'class-validator';
import { Photo } from '../photo/attachmentPhoto.class';

export class AttachmentLink {
  @IsString()
  url: string;

  @IsString()
  title: string;

  @IsString()
  caption: string;

  @IsString()
  description: string;

  @ValidateNested()
  photo: Photo;

  @IsBoolean()
  is_favorite: boolean;
}
