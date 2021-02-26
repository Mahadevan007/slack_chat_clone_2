import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  showModal: boolean = false;
  showBackdrop: boolean = false;
  constructor() { }

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

}
