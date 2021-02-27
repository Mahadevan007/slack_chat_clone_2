import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { INotification } from 'src/app/interfaces/inotification';
import notifications from 'src/app/constants/notifications';
import { messageService } from 'src/app/services/message.service';
import { Subscription } from 'rxjs';
import { IChatMessage } from 'src/app/interfaces/ichat-message';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit, OnDestroy {
  channels: INotification[] = [];
  directMessages: INotification[] = [];
  subscription: Subscription;
  @Output() modalEvent: EventEmitter<void> = new EventEmitter<void>();
  showModal: boolean = false;
  showBackdrop: boolean = false;
  notifications: INotification[] = []

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private messageService: messageService) { }

  ngOnInit() {
    this.subscription = this.messageService.notificationsChanged.subscribe((data: INotification[]) => {
      this.notifications = data;
      this.channels = this.notifications.filter(notification => notification.type === 'channel');
      this.directMessages = this.notifications.filter(notification => notification.type === 'message');
    })
    this.notifications = this.messageService.getNotification();
    this.channels = this.notifications.filter(notification => notification.type === 'channel');
    this.directMessages = this.notifications.filter(notification => notification.type === 'message');
  }

  onAddChannel() {

  }

  openModal() {
    this.modalEvent.emit();
  }

  navigateToDirectMessage() {
    this.router.navigate(['app/directmessage'])
  }



  // openModal() {
  //   this.showModal = true;
  //   this.showBackdrop = true;
  // }

  closeModal() {
    this.showBackdrop = false;
    this.showModal = false;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
