import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NewMessageDTO } from '../interfaces';
import { HttpService } from '@nestjs/axios';
import { ConstService } from '../constants';

@Injectable()
export class VkService {
  private allowedDomains = ['statbot.info', 'hackerwars.ru'];
  // according to RFC1035
  private linkRegex = /([a-z\-0-9]{1,255}\.)+[a-z\-0-9]{1,63}/giu;

  constructor(
    private configService: ConfigService,
    private httpService: HttpService,
    private constService: ConstService,
  ) {}

  answerConfirmationCode() {
    return this.configService.get<string>('CONFIRMATION_CODE');
  }

  *getLinks(text: string) {
    let result: RegExpExecArray;

    while ((result = this.linkRegex.exec(text)) !== null) {
      if (result.index === this.linkRegex.lastIndex) {
        this.linkRegex.lastIndex++;
      }

      yield result[0];
    }
  }

  async onMessageNew(message: NewMessageDTO) {
    const text = message.object.message.text;
    const peerId = message.object.message.peer_id;
    const haveLinks = this.linkRegex.test(text);

    if (haveLinks && peerId === 2000000031) {
      const links = Array.from(this.getLinks(text)).filter(
        (link) => link.length <= 253 && !this.allowedDomains.includes(link),
      );

      if (!links.length) {
        return;
      }

      console.log('bad links detected', links);

      // const axios = this.httpService.axiosRef;

      // await Promise.allSettled([
      //   axios.postForm(
      //     this.constService.getLinkFor('method/messages.delete').toString(),
      //     {
      //       message_ids: `${message.object.message.id}`,
      //       delete_for_all: '1',
      //       peer_id: `${peerId}`,
      //       cmids: `${message.object.message.conversation_message_id}`,
      //     },
      //   ),
      //   axios.postForm(
      //     this.constService.getLinkFor('messages.removeChatUser').toString(),
      //     {
      //       chat_id: `${message.object.message.peer_id - 2000000000}`,
      //       user_id: `${message.object.message.from_id}`,
      //     },
      //   ),
      // ]);
    }

    return 'ok';
  }

  logAndOk(request: any) {
    console.log(request?.body);

    return 'ok';
  }
}
