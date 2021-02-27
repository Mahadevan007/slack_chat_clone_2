import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { channelMessages } from 'src/app/constants/channelMessages';
import { channelMessage } from 'src/app/interfaces/channel-messages';
import { IChatMessage } from 'src/app/interfaces/ichat-message';
import { HostListener } from "@angular/core";
import { messageService } from 'src/app/services/message.service';
@Component({
  selector: 'app-channel-page',
  templateUrl: './channel-page.component.html',
  styleUrls: ['./channel-page.component.scss']
})
export class ChannelPageComponent implements OnInit {
  channels: channelMessage[] = [];
  showBackdrop2: boolean = false;
  italicText: boolean = false;
  showModal: boolean = false;
  newChannelName: string;
  showBackdrop: boolean = false;
  displaysidebar: boolean = false;
  boldText: boolean = false;
  subscription: Subscription;
  subscription2: Subscription;
  currentChannel: any[] = [];
  message: string = "";
  channelName: string = "";
  constructor(private route: ActivatedRoute, private messageService: messageService) { }

  ngOnInit() {
    var that = this;
    this.channels = this.messageService.getChannels();
    this.subscription = this.messageService.channelsChanged.subscribe((data: channelMessage[]) => {
      this.channels = data;
      that.currentChannel = [];
      const id = this.route.snapshot.params['id'];
      this.channelName = id;
      console.log("ID======", id);
      this.channels.forEach(function (data, index) {
        console.log(data);
        if (data.name == id) {
          data.messages.forEach(function (data, index) {
            that.currentChannel.push(data)
          })

          console.log(that.currentChannel)
        }
      })
    })
    this.subscription2 = this.route.params.subscribe(
      (params: Params) => {
        that.currentChannel = [];
        const id = this.route.snapshot.params['id'];
        this.channelName = id;
        console.log("ID======", id);
        this.channels.forEach(function (data, index) {
          console.log(data);
          if (data.name == id) {
            data.messages.forEach(function (data, index) {
              that.currentChannel.push(data)
            })

            console.log(that.currentChannel)
          }
        })
      }
    )
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.showBackdrop2 = false;
    this.displaysidebar = false;
  }

  ngOnDestroy() {

    this.subscription.unsubscribe()
  }

  sendMessage() {
    if (this.message != "") {
      console.log(this.message)
      // this.currentChannel.push({
      //   message: this.message,
      //   userId: "you",
      //   username: "You",
      //   timestamp: new Date(),
      //   bold: this.boldText,
      //   italic: this.italicText
      // })
      this.messageService.addChannels(this.channelName, {
        message: this.message,
        userId: "you",
        username: "You",
        timestamp: new Date(),
        bold: this.boldText,
        italic: this.italicText
      })
    }
    // this.boldText = false;
    this.message = "";
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

  openModal() {
    this.showModal = true;
    this.showBackdrop = true;
  }

  closeModal() {
    this.showBackdrop = false;
    this.showModal = false;
  }

  toggleBoldText() {
    this.boldText = this.boldText == true ? false : true;
  }

  log(val: any) {
    console.log(val);
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
