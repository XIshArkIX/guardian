import { AttachmentType } from './attachment.enum';
import { AttachmentLink } from './attachmentLink';
import { ValidateNested } from 'class-validator';

export class Attachment {
  @ValidateNested()
  type: AttachmentType;

  @ValidateNested()
  link: AttachmentLink;
}
