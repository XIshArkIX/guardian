import { ConfirmationCodeDTO, NewMessageDTO } from '../interfaces';
import { VkService } from './vk.service';
import { VkGuard } from './vk.guard';
import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';

@Controller(/* { host: 'guardian.statbot.info' } */)
@UseGuards(VkGuard)
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
  answerOnMessageNew(@Body() message: NewMessageDTO) {
    return this.vkService.onMessageNew(message);
  }

  @Post()
  @HttpCode(200)
  defaultRoutePOST(body: any) {
    return this.vkService.logAndOk(body);
  }

  @Get()
  defaultRouteGET(@Request() request) {
    return this.vkService.logAndOk(request);
  }
}
