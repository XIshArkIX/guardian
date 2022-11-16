import { Attachment } from '../attachment/attachment.class';
import { ForwardMessage } from './forward.class';
import {
  IsArray,
  IsNumber,
  IsBoolean,
  IsString,
  ValidateNested,
} from 'class-validator';

export class EditMessageObject {
  @IsNumber()
  date: number;

  @IsNumber()
  from_id: number;

  @IsNumber()
  id: number;

  @IsNumber()
  out: number;

  @IsNumber()
  @ValidateNested()
  attachments: Array<Attachment>;

  @IsNumber()
  conversation_message_id: number;

  @IsArray()
  @ValidateNested()
  fwd_messages: Array<ForwardMessage>;

  @IsBoolean()
  important: boolean;

  @IsBoolean()
  is_hidden: boolean;

  @IsNumber()
  peer_id: number;

  @IsNumber()
  random_id: number;

  @IsString()
  text: string;

  @IsNumber()
  update_time: number;
}
