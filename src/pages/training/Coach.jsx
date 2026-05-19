import { useState, useRef, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Loader2, Trash2, Zap, Mountain, Activity, Utensils, Heart, Trophy } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { getChatMessages, sendChatMessage, quickAction, clearChat } from '@/lib/trainingApi';

const QUICK_ACTIONS = [
  { id: 'generate_training_plan', label: 'Generate Training Plan', icon: Activity },
  { id: 'analyze_load', label: 'Analyze Load', icon: Zap },
  { id: 'nutrition_advice', label: 'Nutrition Advice', icon: Utensils },
  { id: 'recovery_tips', label: 'Recovery Tips', icon: Heart },
  { id: 'race_prep', label: 'Race Prep', icon: Trophy },
];

function MarkdownMessage({ content }) {
  return (
    <div className="text-sm leading-relaxed space-y-1">
      {content.split('\n').map((line, i) => {
        if (line.startsWith('# ')) return <p key={i} className="text-base font-bold text-white">{line.slice(2)}</p>;
        if (line.startsWith('## ')) return <p key={i} className="text-sm font-bold text-white mt-2">{line.slice(3)}</p>;
        if (line.startsWith('- ') || line.startsWith('* ')) return <p key={i} className="ml-4 text-[hsl(215,20%,65%)]">• {line.slice(2)}</p>;
        if (line.trim() === '') return <br key={i} />;
        return <p key={i} className="text-[hsl(215,20%,65%)]">{line}</p>;
      })}
    </div>
  );
}

export default function TrainingCoach() {
  const qc = useQueryClient();
  const [input, setInput] = useState('');
  const [sessionId] = useState(() => `session-${Date.now()}`);
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef(null);

  const { data: messages = [], isLoading } = useQuery({ queryKey: ['t-chat-messages'], queryFn: getChatMessages });

  const sendMutation = useMutation({
    mutationFn: (msg) => sendChatMessage(msg, sessionId),
    onMutate: () => setIsTyping(true),
    onSettled: () => { qc.invalidateQueries({ queryKey: ['t-chat-messages'] }); setIsTyping(false); },
  });

  const quickMutation = useMutation({
    mutationFn: quickAction,
    onMutate: () => setIsTyping(true),
    onSettled: () => { qc.invalidateQueries({ queryKey: ['t-chat-messages'] }); setIsTyping(false); },
  });

  const clearMutation = useMutation({ mutationFn: clearChat, onSuccess: () => qc.invalidateQueries({ queryKey: ['t-chat-messages'] }) });

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, isTyping]);

  const handleSend = () => {
    if (!input.trim() || sendMutation.isPending) return;
    const msg = input.trim();
    setInput('');
    sendMutation.mutate(msg);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)] gap-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl gradient-blue glow-blue">
            <Mountain className="h-5 w-5 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white">Peak AI Coach</h1>
            <p className="text-xs text-[hsl(215,20%,55%)]">Powered by Ollama · Full athlete context</p>
          </div>
        </div>
        <Button variant="ghost" size="sm" onClick={() => clearMutation.mutate()} disabled={!messages.length}
          className="text-[hsl(215,20%,55%)] hover:text-white hover:bg-[hsl(222,47%,11%)]">
          <Trash2 className="h-4 w-4 mr-2" /> Clear
        </Button>
      </div>

      {/* Quick Actions */}
      <div className="flex gap-2 flex-wrap">
        {QUICK_ACTIONS.map(({ id, label, icon: Icon }) => (
          <Button key={id} variant="outline" size="sm"
            className="h-8 text-xs border-[hsl(222,47%,14%)] bg-transparent hover:bg-[hsl(222,47%,11%)] text-[hsl(215,20%,55%)] hover:text-white"
            onClick={() => quickMutation.mutate(id)} disabled={quickMutation.isPending || sendMutation.isPending}>
            <Icon className="h-3 w-3 mr-1.5" />{label}
          </Button>
        ))}
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-hidden rounded-xl border border-[hsl(222,47%,14%)] bg-[hsl(222,47%,7%)]">
        <div ref={scrollRef} className="h-full overflow-y-auto p-4 space-y-4">
          {isLoading ? (
            <div className="flex justify-center py-8"><Loader2 className="h-6 w-6 animate-spin text-[hsl(215,20%,55%)]" /></div>
          ) : messages.length === 0 ? (
            <div className="text-center py-12">
              <Mountain className="h-12 w-12 text-[hsl(215,20%,40%)] mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">Hello, I'm Peak</h3>
              <p className="text-[hsl(215,20%,55%)] text-sm max-w-sm mx-auto">
                Your AI coach with full access to your training data. Ask anything about your training, nutrition, or recovery.
              </p>
            </div>
          ) : (
            <AnimatePresence>
              {messages.map(msg => (
                <motion.div key={msg.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  {msg.role === 'assistant' && (
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full gradient-blue mr-2 mt-1">
                      <Mountain className="h-3.5 w-3.5 text-white" />
                    </div>
                  )}
                  <div className={`max-w-[85%] rounded-2xl px-4 py-3 ${
                    msg.role === 'user'
                      ? 'bg-[hsl(217,91%,60%)] text-white rounded-tr-sm'
                      : 'bg-[hsl(222,47%,11%)] border border-[hsl(222,47%,14%)] rounded-tl-sm'
                  }`}>
                    {msg.role === 'assistant' ? <MarkdownMessage content={msg.content} /> : <p className="text-sm">{msg.content}</p>}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          )}

          {isTyping && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full gradient-blue mr-2">
                <Mountain className="h-3.5 w-3.5 text-white" />
              </div>
              <div className="bg-[hsl(222,47%,11%)] border border-[hsl(222,47%,14%)] rounded-2xl rounded-tl-sm px-4 py-3">
                <div className="flex gap-1 items-center h-5">
                  {[0, 1, 2].map(i => (
                    <motion.div key={i} className="h-2 w-2 rounded-full bg-[hsl(215,20%,55%)]"
                      animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.2 }} />
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>

      {/* Input */}
      <div className="flex gap-2">
        <textarea
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); } }}
          placeholder="Ask Peak anything about your training, nutrition, or recovery..."
          rows={2}
          className="flex-1 rounded-xl border border-[hsl(222,47%,14%)] bg-[hsl(222,47%,7%)] px-4 py-3 text-sm text-white placeholder:text-[hsl(215,20%,45%)] resize-none focus:outline-none focus:border-[hsl(217,91%,60%)]/50 min-h-[56px] max-h-[160px]"
        />
        <Button className="h-14 px-4 self-end bg-[hsl(217,91%,60%)] hover:bg-[hsl(217,91%,50%)] text-white"
          onClick={handleSend} disabled={!input.trim() || sendMutation.isPending || isTyping}>
          {sendMutation.isPending || isTyping ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
        </Button>
      </div>
    </div>
  );
}
