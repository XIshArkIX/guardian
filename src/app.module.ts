import { VkModule } from './vk/vk.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    VkModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
