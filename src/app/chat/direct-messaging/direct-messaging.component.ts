import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { IChatMessage } from 'src/app/interfaces/ichat-message';
import { messageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-direct-messaging',
  templateUrl: './direct-messaging.component.html',
  styleUrls: ['./direct-messaging.component.scss']
})
export class DirectMessagingComponent implements OnInit, OnDestroy {
  directMessages: IChatMessage[] = [];
  subscription: Subscription;
  constructor(private messageService: messageService) { }

  ngOnInit() {
    this.directMessages = this.messageService.getMessages();
    this.subscription = this.messageService.messagesChanged.subscribe((data: IChatMessage[]) => {
      this.directMessages = data;
    })
    console.log(this.directMessages);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  log(val) {
    console.log(val);
  }

}
