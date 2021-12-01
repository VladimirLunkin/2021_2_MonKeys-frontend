import EventBus from './eventBus.js';
import router from '../route/router.js';
import { chatsManager } from '../store/chatsStore.js';
import { getChatRequest } from '../requests/chatRequest.js';
import { HTTPSuccess } from '../utils/constants/HTTPStatus.js';
import { ProfileData } from '../store/profileStore.js';

export const ChatsEventsRegister = () => {
    EventBus.register('chats:preview-chat', (chatID: number) => {
        chatsManager.switchChat(chatID);

        router.go(`/chat`);
        window.history.replaceState('', '', '/chats');

        const messageID = chatsManager.getFirstMessageID(chatID);
        getChatRequest(chatID, messageID).then((data) => {
            if (data.status !== HTTPSuccess) {
                throw 'bad request';
            }

            chatsManager.openChat(chatID);
            chatsManager.updateChatMessages(chatID, data.body);
        });
    });

    EventBus.register('chats:new-chat', (profile: ProfileData) => {
        if (profile == null) {
            return;
        }
        const chatID = profile.id;

        if (chatsManager.hasChat(chatID)) {
            chatsManager.switchChat(chatID);

            if (chatsManager.hasMessages(chatID)) {
                const messageID = chatsManager.getFirstMessageID(chatID);
                getChatRequest(chatID, messageID).then((data) => {
                    if (data.status !== HTTPSuccess) {
                        throw 'bad request';
                    }

                    chatsManager.openChat(chatID);
                    chatsManager.updateChatMessages(chatID, data.body);
                });
            }
        } else {
            chatsManager.newChat(profile);
        }

        router.go('/chat');
        window.history.replaceState('', '', '/chats');
    });
};