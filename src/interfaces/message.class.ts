class MessageCleintInfo {
  button_actions: Array<string>;
  keyboard: boolean;
  inline_keyboard: boolean;
  carousel: boolean;
  lang_id: number;
}

class MessageObject {
  date: number;
  from_id: number;
  id: number;
  out: number;
  attachments: Array<any>;
  conversation_message_id: number;
  fwd_messages: Array<any>;
  important: boolean;
  is_hidden: boolean;
  peer_id: number;
  random_id: number;
  text: string;
}

class NewMessageObject {
  message: MessageObject;
  client_info: MessageCleintInfo;
}

export class NewMessageDTO {
  group_id: number;
  type = 'message_new';
  event_id: string;
  v = '5.131';
  object: NewMessageObject;
  secret: string;
}
