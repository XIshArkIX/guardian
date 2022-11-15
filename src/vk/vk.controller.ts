/*
https://docs.nestjs.com/controllers#controllers
*/

import { Body, Controller, Get, HttpCode, Post, Request } from '@nestjs/common';
import { ConfirmationCodeDTO } from '../interfaces';
import { VkService } from './vk.service';

@Controller(/* { host: 'guardian.statbot.info' } */)
export class VkController {
  constructor(private vkService: VkService) {}

  @Post()
  @HttpCode(200)
  // using filter pipe
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  answerConfirmationCode(@Body() confirmation: ConfirmationCodeDTO) {
    return this.vkService.answerConfirmationCode();
  }

  @Post()
  @HttpCode(200)
  defaultRoutePOST(body: any) {
    return this.vkService.logAndOk(body);
  }

  @Get()
  defaultRouteGET(@Request() req) {
    return this.vkService.logAndOk(req);
  }
}
