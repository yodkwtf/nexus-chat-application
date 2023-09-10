'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import clsx from 'clsx';
import { MdOutlineGroupAdd } from 'react-icons/md';
import { FullConversationTypes } from '@/app/types';
import useConversation from '@/app/hooks/useConversation';
import ConversationBox from './ConversationBox';

interface ConversationListProps {
  initialConversations: FullConversationTypes[];
}

const ConversationList: React.FC<ConversationListProps> = ({
  initialConversations,
}) => {
  const [conversations, setConversations] = useState(initialConversations);
  const router = useRouter();

  const { conversationId, isOpen } = useConversation();

  return (
    <aside
      className={clsx(
        'fixed inset-y-0 pb-20 lg:pb-0 lg:left-20 lg:w-80 lg:block overflow-y-auto border-r border-gray-200',
        isOpen ? 'hidden' : 'block w-full left-0'
      )}
    >
      <div className="px-5">
        <div className="flex justify-between mb-4 pt-4">
          <div className="text-2xl font-bold text-neutral-800">Chats</div>
          <div className="rounded-full p-2 bg-gray-100 text-gray-600 cursor-pointer hover:opacity-75 transition">
            <MdOutlineGroupAdd size={20} />
          </div>
        </div>

        {conversations.map((conversation) => (
          <ConversationBox
            key={conversation.id}
            conversation={conversation}
            selected={conversationId === conversation.id}
          />
        ))}
      </div>
    </aside>
  );
};
export default ConversationList;
