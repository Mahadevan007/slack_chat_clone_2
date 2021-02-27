import { ActivatedRoute, Params, Router } from '@angular/router';
import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import messages from '../../constants/messages';
import { IChatMessage } from '../../interfaces/ichat-message';
import { Subscription } from 'rxjs';
import { HostListener } from "@angular/core";
import { messageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-chat-page',
  templateUrl: './chat-page.component.html',
  styleUrls: ['./chat-page.component.scss']
})
export class ChatPageComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  subscription2: Subscription;
  showBackdrop2: boolean = false;
  newChannelName: string;
  showModal: boolean = false;
  showBackdrop: boolean = false;
  displaysidebar: boolean = false;
  chatMessages: any[] = [];
  boldText: boolean = false;
  italicText: boolean = false;
  // userName: string = "";
  currentUser: any[] = [];
  userName: string = "";
  message: string = "";
  userId: string = "";
  @ViewChild('f', { static: true }) messagetext: Input
  constructor(private route: ActivatedRoute, private messageService: messageService) { }

  ngOnInit() {
    var that = this;
    this.chatMessages = messages;
    this.subscription = this.messageService.messagesChanged.subscribe((data: IChatMessage[]) => {
      this.chatMessages = data;
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
    })
    this.subscription2 = this.route.params.subscribe(
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
    this.subscription2.unsubscribe();
    this.subscription.unsubscribe()
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.showBackdrop2 = false;
    this.displaysidebar = false;

  }

  sendMessage() {
    if (this.message != "") {
      console.log(this.message)
      this.messageService.addMessage({
        message: this.message,
        userId: this.userId,
        username: "You",
        timestamp: new Date(),
        bold: this.boldText,
        italic: this.italicText
      })
      this.message = "";
    }
  }

  openSidebar() {
    this.displaysidebar = true;
    this.showBackdrop2 = true;
  }

  closeSidebar() {
    this.showBackdrop2 = false;
    this.displaysidebar = false;
    this.showBackdrop = false;
    this.showModal = false;
  }

  toggleBoldText() {
    this.boldText = this.boldText == true ? false : true;
  }

  openModal() {
    console.log("show Modal")
    this.showModal = true;
    this.showBackdrop = true;
  }

  closeModal() {
    this.showBackdrop = false;
    this.showModal = false;
  }

  toggleItalicText() {
    this.italicText = this.italicText == true ? false : true;
  }

  addChannel() {
    console.log(this.newChannelName);
    this.messageService.addNotification(this.newChannelName, "channel");
    this.messageService.createChannel(this.newChannelName);
    this.closeModal();
  }

}
