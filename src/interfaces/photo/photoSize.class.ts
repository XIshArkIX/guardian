import { IsNumber, IsString } from 'class-validator';

export class PhotoSize {
  @IsNumber()
  height: number;

  @IsString()
  url: string;

  @IsString()
  type: string;

  @IsNumber()
  width: number;
}
