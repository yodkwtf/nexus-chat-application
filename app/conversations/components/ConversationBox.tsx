'use client';

import { useCallback, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { Conversation, Message, User } from '@prisma/client';
import { format } from 'date-fns';
import { useSession } from 'next-auth/react';
import clsx from 'clsx';
import { FullConversationTypes } from '@/app/types';
import useOtherUser from '@/app/hooks/useOtherUser';

interface ConversationBoxProps {
  conversation: FullConversationTypes;
  selected: boolean;
}

const ConversationBox: React.FC<ConversationBoxProps> = ({
  conversation,
  selected,
}) => {
  const otherUsers = useOtherUser(conversation);
  const router = useRouter();
  const session = useSession();

  const handleClick = useCallback(() => {
    router.push(`/conversations/${conversation.id}`);
  }, [conversation.id, router]);

  const lastMessage = useMemo(() => {
    const messages = conversation.messages || [];
    return messages[messages.length - 1];
  }, [conversation.messages]);

  const userEmail = useMemo(() => {
    return session.data?.user?.email;
  }, [session.data?.user?.email]);

  const hasSeen = useMemo(() => {
    if (!lastMessage) return false;

    const seenArray = lastMessage.seen || [];

    if (!userEmail) return false;

    return seenArray.filter((user) => user.email === userEmail).length !== 0;
  }, [lastMessage, userEmail]);

  const lastMessageText = useMemo(() => {
    if (lastMessage?.image) {
      return 'Sent an images';
    }

    if (lastMessage?.body) {
      return lastMessage.body;
    }

    return 'Started a conversation';
  }, [lastMessage]);

  return <div>ConversationBox</div>;
};
export default ConversationBox;
