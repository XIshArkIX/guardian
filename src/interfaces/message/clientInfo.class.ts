import { IsArray, IsBoolean, IsNumber } from 'class-validator';

export class MessageCleintInfo {
  @IsArray()
  button_actions: Array<string>;

  @IsBoolean()
  keyboard: boolean;

  @IsBoolean()
  inline_keyboard: boolean;

  @IsBoolean()
  carousel: boolean;

  @IsNumber()
  lang_id: number;
}
