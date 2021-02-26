import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { INotification } from 'src/app/interfaces/inotification';
import notifications from 'src/app/constants/notifications';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  channels: INotification[] = [];
  directMessages: INotification[] = [];
  @Output() modalEvent: EventEmitter<void> = new EventEmitter<void>();

  constructor(private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.channels = notifications.filter(notification => notification.type === 'channel')
    this.directMessages = notifications.filter(notification => notification.type === 'message')
  }

  openModal() {
    this.modalEvent.emit();
  }

  navigateToDirectMessage() {
    this.router.navigate(['app/directmessage'])
  }

}
