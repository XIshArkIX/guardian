import { ValidateNested } from 'class-validator';
import { MessageCleintInfo } from './clientInfo.class';
import { MessageInfo } from './messageInfo.class';

export class NewMessageObject {
  @ValidateNested()
  message: MessageInfo;

  @ValidateNested()
  client_info: MessageCleintInfo;
}
