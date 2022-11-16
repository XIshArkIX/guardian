import { Module } from '@nestjs/common';
import { ConstService } from './const.service';

@Module({
  imports: [],
  controllers: [],
  providers: [ConstService],
  exports: [ConstService],
})
export class ConstModule {}
