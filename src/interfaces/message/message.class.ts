import { EditMessageObject } from './editMessageObject.class';
import { NewMessageObject } from './newMessageObject.class';
import {
  IsNumber,
  IsString,
  Equals,
  ValidateNested,
  IsIn,
} from 'class-validator';
import { MessageType } from './messageType.enum';

export class MessageDTO {
  @IsNumber()
  group_id: number;

  @IsIn(Object.values(MessageType))
  type: MessageType;

  @IsString()
  event_id: string;

  @Equals('5.131')
  v: string;

  @ValidateNested()
  object: NewMessageObject | EditMessageObject;

  @IsString()
  secret: string;
}
