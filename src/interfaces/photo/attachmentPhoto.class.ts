import { PhotoSize } from './photoSize.class';
import {
  IsArray,
  IsBoolean,
  IsNumber,
  IsString,
  ValidateNested,
} from 'class-validator';

export class Photo {
  @IsNumber()
  album_id: number;

  @IsNumber()
  date: number;

  @IsNumber()
  id: number;

  @IsNumber()
  owner_id: number;

  @IsArray()
  @ValidateNested()
  sizes: Array<PhotoSize>;

  @IsString()
  text: string;

  @IsString()
  user_id: string;

  @IsBoolean()
  has_tags: boolean;
}
