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
    <div className="flex flex-col h-[600px] w-full max-w-md bg-white rounded-xl shadow-2xl border border-slate-200 overflow-hidden">
      {/* Header */}
      <div className="bg-emerald-600 p-4 text-white flex justify-between items-center bg-gradient-to-r from-emerald-600 to-teal-600">
        <div>
          <h1 className="font-bold text-lg">Apna CFO</h1>
          <p className="text-xs text-emerald-100">Vernacular AI Finance Advisor</p>
        </div>
        <div className="flex gap-2">
          <Button variant="ghost" size="icon" className="text-white hover:bg-emerald-700">
            <Volume2 size={20} />
          </Button>
        </div>
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50">
        {messages.map((msg, i) => (
          <MessageBubble key={i} role={msg.role} content={msg.content} />
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-slate-200 p-3 rounded-2xl rounded-tl-none animate-pulse">
              Apna CFO soch raha hai...
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="p-4 border-t border-slate-200 bg-white flex gap-2 items-center">
        <Button variant="ghost" size="icon" className="text-slate-400">
          <Mic size={24} />
        </Button>
        <Input 
          className="flex-1 border-slate-200 focus:ring-emerald-500" 
          placeholder="Apna sawaal likhein..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
        />
        <Button 
          className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-full p-2"
          onClick={handleSend}
          disabled={isLoading}
        >
          <Send size={20} />
        </Button>
      </div>
    </div>
  );
}
