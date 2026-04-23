'use client';

import React, { useState, useEffect, useRef } from 'react';
import MessageBubble from './MessageBubble';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send, Volume2, Mic } from 'lucide-react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface ChatWindowProps {
  initialLanguage?: string;
}

export default function ChatWindow({ initialLanguage = 'hi' }: ChatWindowProps) {
  const getInitialMessage = () => {
    switch(initialLanguage) {
      case 'hi': return 'नमस्ते! मैं अपना CFO हूँ। मैं आपकी बचत और फिक्स्ड डिपॉजिट (सावधि जमा) में सहायता कर सकता हूँ। आप कैसे हैं?';
      case 'en': return 'Hello! I am Apna CFO. I am here to assist you with your savings and Fixed Deposits. How are you doing today?';
      case 'bho': return 'राउर के नमस्ते! हम हई अपना CFO। हम राउर के FD और बचती में मदद करे खातिर तैयार बानी। कइसन बानी रउआ?';
      default: return 'नमस्ते! मैं अपना CFO हूँ।';
    }
  };

  const getPlaceholder = () => {
    switch(initialLanguage) {
      case 'hi': return 'अपना सवाल यहाँ लिखें...';
      case 'bho': return 'आपन सवाल इहाँ लिखीं...';
      default: return 'Type your financial question...';
    }
  };

  const getLoadingText = () => {
    switch(initialLanguage) {
      case 'hi': return 'अपना CFO विचार कर रहा है...';
      case 'bho': return 'अपना CFO विचार करत बा...';
      default: return 'Apna CFO is analyzing...';
    }
  };

  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: getInitialMessage() }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:8000/api/chat/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_id: 'test-user',
          message: input,
          language: initialLanguage,
          history: messages.slice(-5) // Send last 5 messages for context
        }),
      });

      const data = await response.json();
      setMessages(prev => [...prev, { role: 'assistant', content: data.response }]);
    } catch (error) {
      console.error('Error sending message:', error);
      setMessages(prev => [...prev, { role: 'assistant', content: 'Sorry, kuch error aa gaya. Kripya check karein ki backend chal raha hai.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[600px] w-full max-w-md bg-white dark:bg-slate-900 rounded-[2rem] shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden glass-effect">
      {/* Header */}
      <div className="p-5 text-white flex justify-between items-center bg-gradient-to-r from-emerald-600 to-teal-600 dark:from-emerald-700 dark:to-teal-800 shadow-sm z-10">
        <div>
          <h1 className="font-bold text-xl tracking-tight">Apna CFO</h1>
          <p className="text-xs text-emerald-100 font-medium opacity-90">Vernacular AI Finance Advisor</p>
        </div>
        <div className="flex gap-2">
          <Button variant="ghost" size="icon" className="text-white hover:bg-white/20 rounded-full transition-colors">
            <Volume2 size={20} />
          </Button>
        </div>
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-5 space-y-5 bg-slate-50/50 dark:bg-slate-950/50">
        {messages.map((msg, i) => (
          <MessageBubble key={i} role={msg.role} content={msg.content} />
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 p-4 rounded-2xl rounded-tl-none text-sm text-slate-500 dark:text-slate-400 font-medium shadow-sm animate-pulse flex items-center gap-2">
              <div className="flex gap-1">
                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-bounce"></span>
                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-bounce delay-75"></span>
                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-bounce delay-150"></span>
              </div>
              {getLoadingText()}
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex gap-3 items-center z-10">
        <Button variant="ghost" size="icon" className="text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 rounded-full transition-colors">
          <Mic size={22} />
        </Button>
        <Input 
          className="flex-1 bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 rounded-full px-4 h-11 shadow-inner placeholder:text-sm" 
          placeholder={getPlaceholder()}
          value={input}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInput(e.target.value)}
          onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => e.key === 'Enter' && handleSend()}
        />
        <Button 
          className="bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-500 dark:hover:bg-emerald-600 text-white rounded-full p-2 h-11 w-11 shadow-md transition-all active:scale-95 disabled:opacity-50"
          onClick={handleSend}
          disabled={isLoading}
        >
          <Send size={18} className="ml-1" />
        </Button>
      </div>
    </div>
  );
}
