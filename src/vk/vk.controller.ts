import { OnEvent } from '@nestjs/event-emitter';
import { EditMessageObject, MessageDTO, NewMessageObject } from '../interfaces';
import { ValidationPipe } from '../global';
import { VkService } from './vk.service';
import { VkGuard } from './vk.guard';
import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  UseGuards,
} from '@nestjs/common';

@Controller(/* { host: 'guardian.statbot.info' } */)
@UseGuards(VkGuard)
export class VkController {
  constructor(private vkService: VkService) {}

  @Post()
  @HttpCode(200)
  defaultRoutePOST(@Body() request: any) {
    return this.vkService.getRouteFor(request);
  }

  @Get()
  defaultRouteGET(@Body() request: any) {
    return this.vkService.getRouteFor(request);
  }

  @OnEvent('messages.message_new')
  answerOnMessageNew(
    @Body(new ValidationPipe())
    message: MessageDTO & { object: NewMessageObject },
  ) {
    this.vkService.onMessageNew(message);
  }

  @OnEvent('messages.message_edit')
  answerOnMessageEdit(
    @Body(new ValidationPipe())
    message: MessageDTO & { object: EditMessageObject },
  ) {
    this.vkService.onMessageEdit(message);
  }
}
