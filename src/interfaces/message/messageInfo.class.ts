import { Attachment } from '../attachment/attachment.class';
import { ForwardMessage } from './forward.class';
import {
  IsNumber,
  IsOptional,
  IsArray,
  IsBoolean,
  IsString,
  ValidateNested,
} from 'class-validator';

export class MessageInfo {
  @IsNumber()
  date: number;

  @IsNumber()
  from_id: number;

  @IsNumber()
  id: number;

  @IsNumber()
  out: number;

  @IsOptional()
  @IsArray()
  @ValidateNested()
  attachments: Array<Attachment>;

  @IsNumber()
  conversation_message_id: number;

  @IsOptional()
  @IsArray()
  fwd_messages: Array<ForwardMessage>;

  @IsOptional()
  @IsBoolean()
  important: boolean;

  @IsOptional()
  @IsBoolean()
  is_hidden: boolean;

  @IsNumber()
  peer_id: number;

  @IsNumber()
  random_id: number;

  @IsString()
  text: string;
}
