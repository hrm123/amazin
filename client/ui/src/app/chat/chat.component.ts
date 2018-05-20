import { Component, OnInit } from '@angular/core';
import { ChatService } from '../chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  message : string;
  messages : string [] = [];

  constructor(private chatService: ChatService) {

   }

  ngOnInit() {
    this.chatService
      .getMessages()
      .subscribe((message: string) => {
        console.log('got msg - ' + message);
        
        this.messages.push(message);
        console.log(this.messages);
      });
  }

  sendMsg(){
    this.chatService.sendMessage(this.message);
    this.message = '';
  }

}
