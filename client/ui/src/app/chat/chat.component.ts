import { Component, OnInit } from '@angular/core';
import { ChatService } from '../chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  message : string;
  messages : any [] = [];

  constructor(private chatService: ChatService) {

   }

  ngOnInit() {
    this.chatService
      .getMessages()
      .subscribe((message: string) => {
        // console.log('got msg - ' + message);
        
        this.messages.push(message);
      });
  }

  sendMsg(){
    this.chatService.sendMessage({ message: this.message, name: 'you'});
    this.message = '';
  }

}
