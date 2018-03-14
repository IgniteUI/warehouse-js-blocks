import { Injectable } from '@angular/core';

import { Message } from "./message";
import { MessageTarget } from "./messageTarget";

@Injectable()
export class MessagesService {

  private messages: Message[] = new Array();

  // this service is used to pass messages between the components
  constructor() {
  }

  // add new messages for a specific target
  addMessage(target: MessageTarget, message: string) {
    let newMessage:Message = new Message();
    newMessage.messageTarget = target;
    newMessage.message = message;
    this.messages.push(newMessage);
  }

  // obtain the messages for a specific target
  // the returned messages will be removed fomr the messages list
  obtainMessages(target: MessageTarget): string[] {
    let result: string[] = new Array();
    for (let i = this.messages.length - 1; i >= 0 ; i--) {
      if (this.messages[i].messageTarget == target) {
        result.unshift(this.messages[i].message);
        this.messages.splice(i, 1);
      }
    }
    return result;
  }

}
