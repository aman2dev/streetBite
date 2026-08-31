'use client';

import React, { useEffect, useState, useRef } from 'react';
import { MessageSquare, Send, User } from 'lucide-react';
import { createClient } from '../../lib/supabase/client';
import { Database } from '../../lib/supabase/types';
import { motion, AnimatePresence } from 'framer-motion';

type MessageRow = Database['public']['Tables']['messages']['Row'];

interface MessageWithProfile extends MessageRow {
  profiles?: {
    username: string;
    avatar_url: string | null;
  } | null;
}

interface CartChatProps {
  cartId: string;
  cartName: string;
}

export default function CartChat({ cartId, cartName }: CartChatProps) {
  const [messages, setMessages] = useState<MessageWithProfile[]>([]);
  const [inputText, setInputText] = useState('');
  const [isSending, setIsSending] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const supabase = createClient();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Fetch initial messages & subscribe to Supabase Realtime
  useEffect(() => {
    let channel: any;

    async function fetchInitialMessages() {
      const { data, error } = await supabase
        .from('messages')
        .select('*, profiles(*)')
        .eq('cart_id', cartId)
        .order('created_at', { ascending: true });

      if (!error && data) {
        setMessages(data as MessageWithProfile[]);
        setTimeout(scrollToBottom, 100);
      }
    }

    fetchInitialMessages();

    // Setup Supabase Realtime Channel
    channel = supabase
      .channel(`cart-messages-${cartId}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'messages',
          filter: `cart_id=eq.${cartId}`,
        },
        async (payload) => {
          const newMsg = payload.new as MessageRow;
          
          // Optionally fetch profile for sender
          const { data: profile } = await supabase
            .from('profiles')
            .select('username, avatar_url')
            .eq('id', newMsg.sender_id)
            .single();

          const fullMsg: MessageWithProfile = {
            ...newMsg,
            profiles: profile || { username: 'Foodie Guest', avatar_url: null },
          };

          setMessages((prev) => [...prev, fullMsg]);
          setTimeout(scrollToBottom, 100);
        }
      )
      .subscribe();

    return () => {
      if (channel) {
        supabase.removeChannel(channel);
      }
    };
  }, [cartId]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || isSending) return;

    setIsSending(true);
    const textToSend = inputText.trim();
    setInputText('');

    try {
      const { data: userData } = await supabase.auth.getUser();
      const currentUserId = userData?.user?.id;

      if (!currentUserId) {
        // Fallback for unauthenticated guest demo: optimistic UI push
        const guestMsg: MessageWithProfile = {
          id: `msg-${Date.now()}`,
          cart_id: cartId,
          sender_id: 'guest',
          text: textToSend,
          created_at: new Date().toISOString(),
          profiles: { username: 'You (Guest)', avatar_url: null },
        };
        setMessages((prev) => [...prev, guestMsg]);
        setTimeout(scrollToBottom, 100);
        setIsSending(false);
        return;
      }

      await supabase.from('messages').insert({
        cart_id: cartId,
        sender_id: currentUserId,
        text: textToSend,
      });

    } catch (err) {
      console.error('Error sending message:', err);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="bg-surface-container-lowest p-6 sm:p-8 rounded-3xl border-4 border-on-surface shadow-[8px_8px_0px_0px_#1a1c1c] flex flex-col gap-4">
      <div className="flex items-center justify-between border-b-2 border-on-surface/20 pb-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-primary text-on-primary rounded-2xl border-2 border-on-surface">
            <MessageSquare size={24} />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-on-surface">
              💬 Live Cart Chat
            </h2>
            <p className="text-xs font-bold text-on-surface-variant">
              Realtime discussion for {cartName}
            </p>
          </div>
        </div>
        <span className="flex items-center gap-2 bg-emerald-100 text-emerald-800 text-xs font-black px-3 py-1 rounded-full border border-emerald-400">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          Realtime Active
        </span>
      </div>

      {/* Messages List Area */}
      <div className="h-64 overflow-y-auto bg-surface border-2 border-on-surface rounded-2xl p-4 flex flex-col gap-3">
        {messages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center text-on-surface-variant">
            <p className="font-bold">No messages yet!</p>
            <p className="text-xs font-medium">Be the first to ask about queue time or today's specials.</p>
          </div>
        ) : (
          messages.map((msg) => (
            <div key={msg.id} className="flex items-start gap-2.5">
              <div className="w-8 h-8 rounded-full bg-primary-fixed border border-on-surface flex items-center justify-center text-xs font-bold shrink-0">
                {msg.profiles?.username ? msg.profiles.username.charAt(0).toUpperCase() : <User size={14} />}
              </div>
              <div className="bg-surface-container border-2 border-on-surface p-3 rounded-2xl max-w-[80%]">
                <div className="flex items-center justify-between gap-4 mb-1">
                  <span className="text-xs font-extrabold text-primary">
                    {msg.profiles?.username || 'Guest Foodie'}
                  </span>
                  <span className="text-[10px] text-on-surface-variant font-medium">
                    {new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
                <p className="text-sm font-bold text-on-surface">{msg.text}</p>
              </div>
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input Form */}
      <form onSubmit={handleSendMessage} className="flex gap-2">
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Ask a question or comment live..."
          className="flex-1 bg-surface border-2 border-on-surface rounded-2xl px-4 py-3 font-bold text-on-surface placeholder:text-on-surface-variant/60 focus:outline-none focus:ring-2 focus:ring-primary"
        />
        <button
          type="submit"
          disabled={isSending || !inputText.trim()}
          className="bg-primary hover:bg-surface-tint text-on-primary font-black px-6 py-3 rounded-2xl border-2 border-on-surface shadow-[3px_3px_0px_0px_#1a1c1c] uppercase flex items-center gap-2 disabled:opacity-50 transition-all active:translate-x-0.5 active:translate-y-0.5"
        >
          <Send size={18} />
          <span className="hidden sm:inline">Send</span>
        </button>
      </form>
    </div>
  );
}
