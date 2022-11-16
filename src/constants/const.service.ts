import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ConstService {
  public v = '5.131';

  constructor(private configService: ConfigService) {}

  public getLinkFor(method: string) {
    const url = new URL(method, 'https://api.vk.com');

    url.searchParams.append('v', this.v);
    url.searchParams.append('token', this.configService.get<string>('TOKEN'));

    return url;
  }
}
