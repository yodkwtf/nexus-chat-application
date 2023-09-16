'use client';

import React, { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { ClipLoader } from 'react-spinners';
import LOADING_MESSAGES from '@/app/constants/loadingMessages';
import getRandomIndex from '../actions/getRandomIndex';

const LoadingModal = () => {
  const index = getRandomIndex(LOADING_MESSAGES);
  const loadingText = LOADING_MESSAGES[index];

  return (
    <Transition.Root show as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={() => {}}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-100 bg-opacity-50 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex items-center justify-center min-h-full p-4 text-center">
            <Dialog.Panel>
              <ClipLoader size={24} color="#3B82F6" />
              <p className="mt-4">{loadingText}</p>
            </Dialog.Panel>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default LoadingModal;
