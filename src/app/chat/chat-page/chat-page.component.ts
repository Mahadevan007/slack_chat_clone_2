import { ActivatedRoute, Params, Router } from '@angular/router';
import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import messages from '../../constants/messages';
import { IChatMessage } from '../../interfaces/ichat-message';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-chat-page',
  templateUrl: './chat-page.component.html',
  styleUrls: ['./chat-page.component.scss']
})
export class ChatPageComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  chatMessages: IChatMessage[] = [];
  // userName: string = "";
  currentUser: IChatMessage[] = [];
  userName: string = "";
  message: string = "";
  userId: string = "";
  @ViewChild('f', { static: true }) messagetext: Input
  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    var that = this;

    this.chatMessages = messages;
    this.subscription = this.route.params.subscribe(
      (params: Params) => {
        this.currentUser = [];
        const id = this.route.snapshot.params['id'];
        this.userId = id;
        console.log("ID======", id);
        this.chatMessages.forEach(function (data, index) {
          console.log(data);
          if (data.userId == id) {
            console.log(that.currentUser)
            that.userName = data.username;
            that.currentUser.push(data)
          }
        })
      }
    )
    console.log(this.currentUser);
  }

  ngOnDestroy() {

    this.subscription.unsubscribe()
  }

  sendMessage() {
    console.log(this.message)
    this.currentUser.push({
      message: this.message,
      userId: this.userId,
      username: "You",
      timestamp: new Date()
    })
  }


}
