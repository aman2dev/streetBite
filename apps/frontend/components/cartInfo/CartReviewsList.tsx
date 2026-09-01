'use client';

import React, { useState } from 'react';
import { Review } from '../../lib/mockData';
import { useAuth } from '../../lib/useAuth';
import { ThumbsUp, ChevronDown, ChevronUp } from 'lucide-react';
import clsx from 'clsx';

interface CommentItem {
  id: string;
  user: string;
  avatar: string;
  date: string;
  content: string;
  likes: number;
  isLiked: boolean;
  replies?: CommentItem[];
}

interface CartReviewsListProps {
  reviews: Review[];
  cartName: string;
  cartId?: string;
}

export default function CartReviewsList({ reviews, cartName }: CartReviewsListProps) {
  const { user, signInWithGoogle } = useAuth();
  const [newCommentText, setNewCommentText] = useState('');
  const [replyingToId, setReplyingToId] = useState<string | null>(null);
  const [replyTargetUser, setReplyTargetUser] = useState<string>('');
  const [replyText, setReplyText] = useState('');

  // Track expanded reply threads
  const [expandedThreads, setExpandedThreads] = useState<Record<string, boolean>>({
    'comment-0': true, // Expand initial mock thread by default
  });

  const toggleThread = (id: string) => {
    setExpandedThreads((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const [comments, setComments] = useState<CommentItem[]>(() => {
    return reviews.map((rev, index) => ({
      id: rev.id || `comment-${index}`,
      user: rev.user || 'StreetFoodie',
      avatar: rev.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&q=80',
      date: rev.date || '2h ago',
      content: rev.comment || 'Great taste and awesome service!',
      likes: Math.floor(Math.random() * 20) + 3,
      isLiked: false,
      replies: index === 0 ? [
        {
          id: `reply-${index}-1`,
          user: 'Priya Sharma',
          avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80',
          date: '1h ago',
          content: 'Totally agree! Their chutney is top notch too.',
          likes: 6,
          isLiked: false,
        }
      ] : []
    }));
  });

  const handleLike = (commentId: string, parentId?: string) => {
    setComments((prev) =>
      prev.map((c) => {
        if (parentId && c.id === parentId) {
          return {
            ...c,
            replies: c.replies?.map((r) => {
              if (r.id !== commentId) return r;
              return {
                ...r,
                likes: r.isLiked ? r.likes - 1 : r.likes + 1,
                isLiked: !r.isLiked,
              };
            }),
          };
        }

        if (c.id !== commentId) return c;
        return {
          ...c,
          likes: c.isLiked ? c.likes - 1 : c.likes + 1,
          isLiked: !c.isLiked,
        };
      })
    );
  };

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCommentText.trim()) return;
    if (!user) {
      signInWithGoogle(true);
      return;
    }

    const newCommentObj: CommentItem = {
      id: `comment-${Date.now()}`,
      user: user.name,
      avatar: user.avatar,
      date: 'Just now',
      content: newCommentText.trim(),
      likes: 1,
      isLiked: true,
      replies: [],
    };

    setComments([newCommentObj, ...comments]);
    setNewCommentText('');
  };

  const handleAddReply = (parentCommentId: string) => {
    if (!replyText.trim()) return;
    if (!user) {
      signInWithGoogle(true);
      return;
    }

    const newReplyObj: CommentItem = {
      id: `reply-${Date.now()}`,
      user: user.name,
      avatar: user.avatar,
      date: 'Just now',
      content: replyText.trim(),
      likes: 1,
      isLiked: true,
    };

    setComments((prev) =>
      prev.map((c) =>
        c.id === parentCommentId
          ? { ...c, replies: [...(c.replies || []), newReplyObj] }
          : c
      )
    );

    // Auto expand replies thread when adding a reply
    setExpandedThreads((prev) => ({ ...prev, [parentCommentId]: true }));
    setReplyText('');
    setReplyingToId(null);
  };

  return (
    <div className="bg-surface p-4 sm:p-8 rounded-3xl flex flex-col gap-6">
      
      {/* Title */}
      <div className="flex items-center gap-3 pb-2 border-b border-on-surface/10">
        <h2 
          className="text-xl sm:text-2xl font-black text-on-surface"
          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
        >
          {comments.length} Comments
        </h2>
      </div>

      {/* Main Comment Input Box */}
      <form onSubmit={handleAddComment} className="flex gap-3 items-start">
        {user ? (
          <img src={user.avatar} alt={user.name} className="w-9 h-9 rounded-full object-cover flex-shrink-0" />
        ) : (
          <div className="w-9 h-9 rounded-full bg-surface-container flex items-center justify-center font-bold text-xs text-on-surface-variant flex-shrink-0">
            ?
          </div>
        )}
        <div className="flex-1 flex flex-col gap-2">
          <textarea
            rows={2}
            placeholder={user ? `Add a comment about ${cartName}...` : "Sign in to add a comment..."}
            value={newCommentText}
            onChange={(e) => setNewCommentText(e.target.value)}
            className="w-full p-3 bg-surface-container-lowest rounded-2xl text-sm font-medium text-on-surface placeholder:text-on-surface-variant/60 focus:outline-none border border-on-surface/10"
          />
          <div className="flex justify-end gap-2">
            {user ? (
              <button
                type="submit"
                disabled={!newCommentText.trim()}
                className="px-4 py-2 bg-primary text-on-primary font-black rounded-full text-xs uppercase tracking-wider cursor-pointer disabled:opacity-50 hover:bg-amber-400 transition-colors"
              >
                Comment
              </button>
            ) : (
              <button
                type="button"
                onClick={() => signInWithGoogle(true)}
                className="px-4 py-2 bg-primary text-on-primary font-black rounded-full text-xs uppercase cursor-pointer"
              >
                Sign In to Comment
              </button>
            )}
          </div>
        </div>
      </form>

      {/* Nested Comments Stream */}
      <div className="flex flex-col gap-6 pt-2">
        {comments.map((comment) => {
          const replyCount = comment.replies?.length || 0;
          const isThreadExpanded = expandedThreads[comment.id];

          return (
            <div key={comment.id} className="flex gap-3 items-start">
              
              {/* Parent Avatar */}
              <img 
                src={comment.avatar} 
                alt={comment.user} 
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full object-cover flex-shrink-0 mt-0.5" 
              />

              {/* Main Comment Content */}
              <div className="flex-1 flex flex-col gap-1.5 min-w-0">
                
                {/* User Header */}
                <div className="flex items-center gap-2">
                  <span className="font-extrabold text-xs sm:text-sm text-on-surface truncate">
                    {comment.user}
                  </span>
                  <span className="text-[11px] font-bold text-on-surface-variant/60">
                    {comment.date}
                  </span>
                </div>

                {/* Comment Content */}
                <p className="text-xs sm:text-sm font-medium text-on-surface leading-relaxed break-words">
                  {comment.content}
                </p>

                {/* Action Bar (Like, Reply) */}
                <div className="flex items-center gap-4 pt-1">
                  
                  {/* Like Button */}
                  <button
                    type="button"
                    onClick={() => handleLike(comment.id)}
                    className="flex items-center gap-1.5 text-xs font-bold text-on-surface-variant hover:text-on-surface transition-colors cursor-pointer"
                    title="Like"
                  >
                    <ThumbsUp size={15} className={clsx(comment.isLiked && "fill-current text-primary")} />
                    <span>{comment.likes > 0 ? comment.likes : ''}</span>
                  </button>

                  {/* Reply Button */}
                  <button
                    type="button"
                    onClick={() => {
                      if (replyingToId === comment.id) {
                        setReplyingToId(null);
                      } else {
                        setReplyingToId(comment.id);
                        setReplyTargetUser(comment.user);
                        setReplyText('');
                      }
                    }}
                    className="text-xs font-bold text-on-surface-variant hover:text-on-surface transition-colors cursor-pointer"
                  >
                    Reply
                  </button>
                </div>

                {/* Inline Reply Input Box */}
                {replyingToId === comment.id && (
                  <div className="mt-3 flex gap-2.5 items-start animate-in fade-in">
                    {user && <img src={user.avatar} alt={user.name} className="w-7 h-7 rounded-full object-cover flex-shrink-0" />}
                    <div className="flex-1 flex flex-col gap-2">
                      <textarea
                        rows={2}
                        placeholder={`Reply to ${replyTargetUser || comment.user}...`}
                        value={replyText}
                        onChange={(e) => setReplyText(e.target.value)}
                        className="w-full p-2.5 bg-surface-container-lowest rounded-xl text-xs font-medium focus:outline-none border border-on-surface/10"
                      />
                      <div className="flex justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => setReplyingToId(null)}
                          className="px-3 py-1 text-xs font-bold text-on-surface-variant hover:text-on-surface"
                        >
                          Cancel
                        </button>
                        <button
                          type="button"
                          onClick={() => handleAddReply(comment.id)}
                          disabled={!replyText.trim()}
                          className="px-3.5 py-1 bg-primary text-on-primary font-black rounded-full text-xs uppercase disabled:opacity-50 cursor-pointer"
                        >
                          Reply
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Collapsible Nested Replies Toggle Button */}
                {replyCount > 0 && (
                  <div className="pt-2">
                    <button
                      type="button"
                      onClick={() => toggleThread(comment.id)}
                      className="inline-flex items-center gap-2 text-xs font-black text-primary hover:bg-primary-container/40 px-3 py-1.5 rounded-full transition-colors cursor-pointer"
                    >
                      {isThreadExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                      <span>
                        {replyCount} {replyCount === 1 ? 'reply' : 'replies'}
                      </span>
                    </button>

                    {/* Nested Child Replies List */}
                    {isThreadExpanded && (
                      <div className="mt-3 flex flex-col gap-4 pl-2 sm:pl-4">
                        {comment.replies?.map((reply) => (
                          <div key={reply.id} className="flex gap-2.5 items-start">
                            {/* Reply User Avatar */}
                            <img 
                              src={reply.avatar} 
                              alt={reply.user} 
                              className="w-7 h-7 rounded-full object-cover flex-shrink-0 mt-0.5" 
                            />

                            {/* Reply Body */}
                            <div className="flex-1 flex flex-col gap-1 min-w-0">
                              <div className="flex items-center gap-2">
                                <span className="font-extrabold text-xs text-on-surface truncate">
                                  {reply.user}
                                </span>
                                <span className="text-[10px] font-bold text-on-surface-variant/60">
                                  {reply.date}
                                </span>
                              </div>

                              <p className="text-xs font-medium text-on-surface leading-relaxed break-words">
                                {reply.content}
                              </p>

                              {/* Nested Reply Action Bar */}
                              <div className="flex items-center gap-3 pt-1">
                                <button
                                  type="button"
                                  onClick={() => handleLike(reply.id, comment.id)}
                                  className="flex items-center gap-1 text-[11px] font-bold text-on-surface-variant hover:text-on-surface transition-colors cursor-pointer"
                                >
                                  <ThumbsUp size={13} className={clsx(reply.isLiked && "fill-current text-primary")} />
                                  <span>{reply.likes > 0 ? reply.likes : ''}</span>
                                </button>

                                <button
                                  type="button"
                                  onClick={() => {
                                    setReplyingToId(comment.id);
                                    setReplyTargetUser(reply.user);
                                    setReplyText('');
                                  }}
                                  className="text-[11px] font-bold text-on-surface-variant hover:text-on-surface transition-colors cursor-pointer"
                                >
                                  Reply
                                </button>
                              </div>

                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
}
