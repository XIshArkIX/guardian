import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { AttachmentType } from '../interfaces/attachment';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { ConstService } from '../constants';
import {
  EditMessageObject,
  ForwardMessage,
  ICommonRequest,
  MessageDTO,
  MessageType,
  NewMessageObject,
} from '../interfaces';

@Injectable()
export class VkService {
  private allowedDomains = ['statbot.info', 'hackerwars.ru'];
  // according to RFC1035
  private linkRegex = /([a-z\-0-9]{1,255}\.)+[a-z\-0-9]{1,63}/iu;

  private logger = new Logger(VkService.name);

  constructor(
    private configService: ConfigService,
    private httpService: HttpService,
    private eventEmitter: EventEmitter2,
    private constService: ConstService,
  ) {}

  answerConfirmationCode() {
    this.logger.log('Receive confirmation event');

    return this.configService.get<string>('CONFIRMATION_CODE');
  }

  getLink(text: string) {
    let result: RegExpExecArray;

    if ((result = this.linkRegex.exec(text)) !== null) {
      return result[0];
    }

    return null;
  }

  hasLinkAttachment(message: MessageDTO) {
    let attachments;

    switch (message.type) {
      case MessageType.EDIT:
        attachments = (message.object as EditMessageObject).attachments;
        break;
      case MessageType.NEW:
        attachments = (message.object as NewMessageObject).message.attachments;
        break;
      default:
        throw new BadRequestException('Unknown message type');
    }

    if (!attachments.length) {
      return false;
    }

    return attachments.some(({ type }) => type === AttachmentType.LINK);
  }

  // TODO: release anti-forward bypass
  // processForward(forward: ForwardMessage, originalMessage) {
  //   const text = forward.text;
  // }

  async onMessageEdit(message: MessageDTO & { object: EditMessageObject }) {
    this.logger.log('Receive message_edit event');

    const text = message.object.text;
    const peerId = message.object.peer_id;
    const hasBadLinksInText = this.linkRegex.test(text);

    const punishment = () => {
      const axios = this.httpService.axiosRef;

      return Promise.all([
        axios
          .postForm(
            this.constService.getLinkFor('method/messages.delete').toString(),
            {
              message_ids: `${message.object.id}`,
              delete_for_all: '1',
              peer_id: `${peerId}`,
              cmids: `${message.object.conversation_message_id}`,
            },
          )
          .then((response) => {
            if (response.data.error) {
              return Promise.reject(response.data);
            }
          }),
        axios
          .postForm(
            this.constService
              .getLinkFor('method/messages.removeChatUser')
              .toString(),
            {
              chat_id: `${message.object.peer_id - 2000000000}`,
              user_id: `${message.object.from_id}`,
            },
          )
          .then((response) => {
            if (response.data.error) {
              return Promise.reject(response.data);
            }
          }),
      ]);
    };

    if (peerId !== 2000000031) {
      return;
    }

    if (hasBadLinksInText) {
      const link = this.getLink(text);

      if (!link || this.allowedDomains.includes(link)) {
        return;
      }

      try {
        await punishment();
      } catch (error) {
        console.error(error);
      }

      return;
    }

    const hasLinkAttachment = this.hasLinkAttachment(message);

    if (hasLinkAttachment) {
      const attachments = message.object.attachments.filter(
        ({ type }) => type === AttachmentType.LINK,
      );
      const links = attachments.map((attachment) => attachment.link.url);
      const hasBadLinks = links.some(
        (link) => !this.allowedDomains.includes(link),
      );

      if (!hasBadLinks) {
        return;
      }

      try {
        await punishment();
      } catch (error) {
        console.error(error);
      }
    }
  }

  async onMessageNew(message: MessageDTO & { object: NewMessageObject }) {
    this.logger.log('Receive message_new event');

    const text = message.object.message.text;
    const peerId = message.object.message.peer_id;
    const hasBadLinksInText = this.linkRegex.test(text);

    const punishment = () => {
      const axios = this.httpService.axiosRef;

      return Promise.all([
        axios
          .postForm(
            this.constService.getLinkFor('method/messages.delete').toString(),
            {
              message_ids: `${message.object.message.id}`,
              delete_for_all: '1',
              peer_id: `${peerId}`,
              cmids: `${message.object.message.conversation_message_id}`,
            },
          )
          .then((response) => {
            if (response.data.error) {
              return Promise.reject(response.data);
            }
          }),
        axios
          .postForm(
            this.constService
              .getLinkFor('method/messages.removeChatUser')
              .toString(),
            {
              chat_id: `${message.object.message.peer_id - 2000000000}`,
              user_id: `${message.object.message.from_id}`,
            },
          )
          .then((response) => {
            if (response.data.error) {
              return Promise.reject(response.data);
            }
          }),
      ]);
    };

    if (peerId !== 2000000031) {
      return;
    }

    if (hasBadLinksInText) {
      const link = this.getLink(text);

      if (!link || this.allowedDomains.includes(link)) {
        return;
      }

      try {
        await punishment();
      } catch (error) {
        console.error(error);
      }

      return;
    }

    const hasLinkAttachment = this.hasLinkAttachment(message);

    if (hasLinkAttachment) {
      const attachments = message.object.message.attachments.filter(
        ({ type }) => type === AttachmentType.LINK,
      );
      const links = attachments.map((attachment) => attachment.link.url);
      const hasBadLinks = links.some(
        (link) => !this.allowedDomains.includes(link),
      );

      if (!hasBadLinks) {
        return;
      }

      try {
        await punishment();
      } catch (error) {
        console.error(error);
      }
    }

    // TODO: release anti-forward bypass
    // const hasForwards = message.object.message.fwd_messages.length > 0;

    // if (hasForwards) {
    //   const forwards = message.object.message.fwd_messages;

    //   for (const forward of forwards) {
    //     await this.onMessageNew(forward);
    //   }
    // }

    return 'ok';
  }

  getRouteFor(request: ICommonRequest) {
    switch (request.type) {
      case 'confirmation':
        return this.answerConfirmationCode();
      case 'message_new':
        this.eventEmitter.emit('messages.message_new', request);
        break;
      case 'message_edit':
        this.eventEmitter.emit('messages.message_edit', request);
        break;
      default:
        break;
    }

    return 'ok';
  }

  logAndOk(request: any) {
    return 'ok';
  }
}
