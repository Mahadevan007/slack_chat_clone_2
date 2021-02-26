import { INotification } from '../interfaces/inotification';

const notifications: INotification[] = [
    {
        name: 'general',
        unread: 1,
        type: 'channel'
    },
    {
        name: 'kudos',
        type: 'channel'
    },
    {
        name: 'random',
        type: 'channel'
    },
    {
        name: 'technical',
        unread: 24,
        type: 'channel'
    },
    {
        name: 'winwire',
        unread: 20,
        type: 'channel'
    },

    // messages 
    {
        name: 'Ashwin',
        unread: 1,
        active: true,
        type: 'message',
        userId: 'ash1234'
    },
    {
        name: 'Arun',
        type: 'message',
        userId: 'arun1234',
    },
    {
        name: 'Vinoth',
        type: 'message',
        userId: 'vinoth55',

    },
    {
        name: 'Karthik',
        type: 'message',
        userId: 'karthik78',
    },
    {
        name: 'Aravind',
        type: 'message',
        userId: 'aravind11'
    }
]

export default notifications