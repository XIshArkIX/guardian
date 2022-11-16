import { Equals, IsNumber } from 'class-validator';

export class ConfirmationCodeDTO {
  @Equals('confirmation')
  type: string;

  @IsNumber()
  group_id: number;
}
