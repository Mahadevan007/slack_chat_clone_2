import { Component, OnInit } from '@angular/core';
import { messageService } from '../services/message.service';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  showModal: boolean = false;
  showBackdrop: boolean = false;
  newChannelName: string;
  constructor(private messageService: messageService) { }

  ngOnInit() {
  }

  openModal() {
    this.showModal = true;
    this.showBackdrop = true;
  }


  closeModal() {
    this.showBackdrop = false;
    this.showModal = false;
  }

  addChannel() {
    console.log(this.newChannelName);
    this.messageService.addNotification(this.newChannelName, "channel");
    this.messageService.createChannel(this.newChannelName);
    this.closeModal();
  }

}
