import { VkService } from './vk.service';
import { VkController } from './vk.controller';
/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';

@Module({
  imports: [],
  controllers: [VkController],
  providers: [VkService],
})
export class VkModule {}
