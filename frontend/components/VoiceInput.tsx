'use client';

import React, { useState } from 'react';
import { Mic, Square, Loader2 } from 'lucide-react';
import { Button } from './ui/button';

export default function VoiceInput() {
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const toggleRecording = () => {
    if (isRecording) {
      setIsRecording(false);
      setIsProcessing(true);
      // Simulate processing
      setTimeout(() => setIsProcessing(false), 2000);
    } else {
      setIsRecording(true);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <Button 
        variant={isRecording ? "default" : "ghost"} 
        size="icon" 
        className={`${isRecording ? 'bg-red-500 hover:bg-red-600 animate-pulse' : 'text-slate-400'}`}
        onClick={toggleRecording}
        disabled={isProcessing}
      >
        {isProcessing ? <Loader2 size={24} className="animate-spin text-emerald-600" /> : isRecording ? <Square size={20} /> : <Mic size={24} />}
      </Button>
    </div>
  );
}
