import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidebarComponent } from './chat/sidebar/sidebar.component';
import { RouterModule } from '@angular/router';
import { ChatComponent } from './chat/chat.component';
import { APP_ROUTES } from './app.route';
import { AngularFontAwesomeModule } from "angular-font-awesome";
import { DirectMessagingComponent } from './chat/direct-messaging/direct-messaging.component';
import { ChatPageComponent } from './chat/chat-page/chat-page.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon'
import { MatTooltipModule } from '@angular/material/tooltip'
import { MatButtonModule } from '@angular/material/button';
import { ChannelPageComponent } from './chat/channel-page/channel-page.component'
import { FormsModule } from '@angular/forms';
import { messageService } from "./services/message.service"

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    ChatComponent,
    DirectMessagingComponent,
    ChatPageComponent,
    ChannelPageComponent,

  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(APP_ROUTES),
    AppRoutingModule,
    AngularFontAwesomeModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatTooltipModule,
    MatButtonModule,
    FormsModule
  ],
  providers: [messageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
