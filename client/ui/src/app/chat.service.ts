import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ChatService {
  url = 'http://localhost:3031';
  socket : any;

  constructor() {
    this.socket = io(this.url);
   }

   public sendMessage(message){
    this.socket.emit('new-message', message);
   }

   public getMessages = () => {
    return Observable.create((observer) => {
      this.socket.on('new-message', (message) => {
        observer.next(message);
      });
    });
   };

}
