'use client';

import { Suspense } from 'react';
import ChatWindow from '@/components/ChatWindow';
import { useSearchParams } from 'next/navigation';

function ChatContent() {
  const searchParams = useSearchParams();
  const lang = searchParams.get('lang') || 'hi';
  
  return (
    <div className="w-full h-full min-h-[calc(100vh-120px)] flex justify-center p-0 md:p-6 lg:p-10">
       <div className="w-full max-w-5xl">
         <ChatWindow initialLanguage={lang} />
       </div>
    </div>
  );
}

export default function ChatPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center dark:text-white font-bold animate-pulse">Initializing Interface...</div>}>
      <ChatContent />
    </Suspense>
  )
}
