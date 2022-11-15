/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class VkService {
  constructor(private configService: ConfigService) {}

  answerConfirmationCode() {
    return this.configService.get<string>('CONFIRMATION_CODE');
  }

  logAndOk(body: any) {
    console.log(body);

    return 'ok';
  }
}
