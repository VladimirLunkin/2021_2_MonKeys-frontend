import BaseStore from './storeBase.js';
import { Chat } from '../components/chat/chat.js';
import { ProfileData, ProfileStore } from './profileStore.js';

interface Message {
    messageID: number;
    fromID: number;
    toID: number;
    text: string;
    date: Date;
    isRead: boolean;
}

interface Chat {
    fromUserID: number;
    name: string;
    img: string;
    messages: Message[];
}

interface ChatsData {
    chats: Chat[];
    currentChat: number;
}

const ChatsStore = new BaseStore<ChatsData>();

ChatsStore.set({
    chats: [],
    currentChat: null,
});

class ChatsManager {
    // all chats
    get chatsWithMessages() {
        const chats = [];
        ChatsStore.get().chats.forEach((chat: Chat) => {
            if (chat.messages.length != 0) {
                chats.push(chat);
            }
        });

        return chats;
    }
    set chats(chats: Chat[]) {
        if (chats === null) {
            chats = [];
        }

        const chatsStore = ChatsStore.get();
        chatsStore.chats = chats;
        ChatsStore.set(chatsStore);
    }

    // chat
    newChat(profile: ProfileData) {
        const newChatID = profile.id;

        const chatIdx = this.getChatIdxByChatID(newChatID);
        if (chatIdx != null) {
            return;
        }

        const chat: Chat = {
            fromUserID: newChatID,
            name: profile.name,
            img: profile.imgs[0],
            messages: [],
        };

        const chatsStore = ChatsStore.get();
        chatsStore.chats.push(chat);
        chatsStore.currentChat = newChatID;
        ChatsStore.set(chatsStore);
    }

    switchChat(chatID: number) {
        const chatsStore = ChatsStore.get();
        chatsStore.currentChat = chatID;
        ChatsStore.set(chatsStore);
    }

    // current chat
    get chatID() {
        return ChatsStore.get().currentChat;
    }
    get chat() {
        return this.getChatByID(this.chatID);
    }

    updateChatMessages(chatID: number, messages: Message[]) {
        if (messages === null) {
            return;
        }

        const chatsStore = ChatsStore.get();

        const chatIdx = this.getChatIdxByChatID(chatID);

        for (const msg of chatsStore.chats[chatIdx].messages) {
            messages.push(msg);
        }
        chatsStore.chats[chatIdx].messages = messages;

        ChatsStore.set(chatsStore);
    }

    saveNewMessage(message: Message) {
        const storeData = ChatsStore.get();
        const chatIdx = this.getChatIdxByMessage(message);

        storeData.chats[chatIdx].messages.push(message);

        ChatsStore.set(storeData);
    }

    getFirstMessageID(chatID: number) {
        const chat = this.getChatByID(chatID);
        return chat.messages[0].messageID;
    }

    private getChatByID(chatID: number) {
        const chats = ChatsStore.get().chats;

        for (const chat of chats) {
            if (chat.fromUserID === chatID) {
                return chat;
            }
        }

        return null;
    }
    private getChatIdxByChatID(chatID: number) {
        const chats = ChatsStore.get().chats;

        for (let i = 0; i < chats.length; i++) {
            if (chats[i].fromUserID === chatID) {
                return i;
            }
        }

        return null;
    }
    private getChatIdxByMessage(message: Message) {
        if (message === null) {
            return;
        }

        const profileID = ProfileStore.get().id;
        const chatID = profileID === message.fromID ? message.toID : message.fromID;

        return this.getChatIdxByChatID(chatID);
    }
}

const chatsManager = new ChatsManager();

export { ChatsStore, Message, Chat, chatsManager };
