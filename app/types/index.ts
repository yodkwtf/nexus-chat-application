import { Conversation, Message, User } from '@prisma/client';

export type FullMessageTypes = Message & {
  sender: User;
  seen: User[];
};

export type FullConversationTypes = Conversation & {
  users: User[];
  messages: FullMessageTypes[];
};
