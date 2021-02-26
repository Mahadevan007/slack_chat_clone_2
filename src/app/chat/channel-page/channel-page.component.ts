import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { channelMessages } from 'src/app/constants/channelMessages';
import { channelMessage } from 'src/app/interfaces/channel-messages';
import { IChatMessage } from 'src/app/interfaces/ichat-message';

@Component({
  selector: 'app-channel-page',
  templateUrl: './channel-page.component.html',
  styleUrls: ['./channel-page.component.scss']
})
export class ChannelPageComponent implements OnInit {
  channels: channelMessage[] = [];
  subscription: Subscription;
  currentChannel: any[] = [];
  message: string = "";
  channelName: string = "";
  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    var that = this;
    this.channels = channelMessages;
    this.subscription = this.route.params.subscribe(
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

  ngOnDestroy() {

    this.subscription.unsubscribe()
  }

  sendMessage() {
    console.log(this.message)
    this.currentChannel.push({
      message: this.message,
      userId: "you",
      username: "You",
      timestamp: new Date()
    })
  }

}
