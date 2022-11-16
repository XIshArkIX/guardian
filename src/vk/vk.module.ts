import { VkService } from './vk.service';
import { VkController } from './vk.controller';
import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ConstModule } from '../constants';

@Module({
  imports: [HttpModule, ConstModule],
  controllers: [VkController],
  providers: [VkService],
})
export class VkModule {}
