import { Routes } from '@angular/router';
import { ChatComponent } from './chat/chat.component';
import { ChatPageComponent } from './chat/chat-page/chat-page.component';
import { DirectMessagingComponent } from './chat/direct-messaging/direct-messaging.component';
import { ChannelPageComponent } from './chat/channel-page/channel-page.component';


export const APP_ROUTES: Routes = [
    { path: '', redirectTo: 'app', pathMatch: 'full' },
    {
        path: 'app', component: ChatComponent,
        children: [
            // { path: 'channel/:channelId', component:  },
            { path: '', redirectTo: 'chatpage/ash1234', pathMatch: 'full' },
            { path: 'directmessage', component: DirectMessagingComponent },
            { path: 'chatpage/:id', component: ChatPageComponent },
            { path: 'channelpage/:id', component: ChannelPageComponent }
        ]
    },
]