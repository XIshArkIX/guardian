import { Attachment } from '../attachment/attachment.class';
import {
  IsArray,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

export class ForwardMessage {
  @IsNumber()
  date: number;

  @IsNumber()
  from_id: number;

  @IsString()
  text: string;

  @IsArray()
  @ValidateNested()
  attachments: Array<Attachment>;

  @IsNumber()
  conversation_message_id: number;

  @IsOptional()
  @IsArray()
  @ValidateNested()
  fwd_messages?: Array<ForwardMessage>;

  @IsNumber()
  id: number;

  @IsNumber()
  peer_id: number;
}
