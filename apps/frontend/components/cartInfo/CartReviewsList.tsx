'use client';

import React, { useState } from 'react';
import { Review } from '../../lib/mockData';
import { useAuth } from '../../lib/useAuth';
import { Heart } from 'lucide-react';
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
  const [replyText, setReplyText] = useState('');

  const [comments, setComments] = useState<CommentItem[]>(() => {
    return reviews.map((rev, index) => ({
      id: rev.id || `comment-${index}`,
      user: rev.user || 'StreetFoodie',
      avatar: rev.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&q=80',
      date: rev.date || '2h ago',
      content: rev.comment || 'Great taste and awesome service!',
      likes: Math.floor(Math.random() * 20) + 2,
      isLiked: false,
      replies: index === 0 ? [
        {
          id: `reply-${index}-1`,
          user: 'Priya Sharma',
          avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80',
          date: '1h ago',
          content: 'Totally agree! Their chutney is top notch too.',
          likes: 5,
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

    setReplyText('');
    setReplyingToId(null);
  };

  return (
    <div className="bg-surface p-6 sm:p-8 rounded-3xl flex flex-col gap-6">
      
      {/* Title */}
      <div className="pb-2">
        <h2 
          className="text-xl sm:text-2xl font-black text-on-surface"
          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
        >
          Comments ({comments.length})
        </h2>
      </div>

      {/* Input Box */}
      <form onSubmit={handleAddComment} className="flex flex-col gap-3">
        <textarea
          rows={3}
          placeholder={user ? `Comment on ${cartName}...` : "Sign in to post a comment..."}
          value={newCommentText}
          onChange={(e) => setNewCommentText(e.target.value)}
          className="w-full p-3.5 bg-surface-container-lowest rounded-2xl text-sm font-medium text-on-surface placeholder:text-on-surface-variant/60 focus:outline-none border border-on-surface/10"
        />
        <div className="flex justify-end">
          {user ? (
            <button
              type="submit"
              disabled={!newCommentText.trim()}
              className="px-5 py-2.5 bg-primary text-on-primary font-black rounded-xl text-xs uppercase cursor-pointer disabled:opacity-50"
            >
              Post Comment
            </button>
          ) : (
            <button
              type="button"
              onClick={() => signInWithGoogle(true)}
              className="px-5 py-2.5 bg-primary text-on-primary font-black rounded-xl text-xs uppercase cursor-pointer"
            >
              Sign In to Comment
            </button>
          )}
        </div>
      </form>

      {/* Simple Comments List */}
      <div className="flex flex-col divide-y divide-on-surface/10 pt-2">
        {comments.map((comment) => (
          <div key={comment.id} className="py-4 first:pt-0 last:pb-0 flex flex-col gap-2">
            
            {/* User Header */}
            <div className="flex items-center gap-2.5">
              <img src={comment.avatar} alt={comment.user} className="w-8 h-8 rounded-full object-cover" />
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-xs text-on-surface">{comment.user}</span>
                <span className="text-[11px] font-bold text-on-surface-variant/60">• {comment.date}</span>
              </div>
            </div>

            {/* Content */}
            <p className="text-sm font-medium text-on-surface leading-relaxed pl-10">
              {comment.content}
            </p>

            {/* Actions */}
            <div className="flex items-center gap-4 pl-10 pt-1">
              <button
                type="button"
                onClick={() => handleLike(comment.id)}
                className="flex items-center gap-1.5 text-xs font-bold text-on-surface-variant hover:text-on-surface transition-colors cursor-pointer"
              >
                <Heart size={15} className={clsx(comment.isLiked && "fill-error text-error")} />
                <span>{comment.likes}</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  if (replyingToId === comment.id) {
                    setReplyingToId(null);
                  } else {
                    setReplyingToId(comment.id);
                    setReplyText('');
                  }
                }}
                className="text-xs font-bold text-on-surface-variant hover:text-on-surface transition-colors cursor-pointer"
              >
                Reply
              </button>
            </div>

            {/* Inline Reply Form */}
            {replyingToId === comment.id && (
              <div className="ml-10 mt-2 flex flex-col gap-2">
                <textarea
                  rows={2}
                  placeholder={`Reply to ${comment.user}...`}
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  className="w-full p-2.5 bg-surface-container-lowest rounded-xl text-xs font-medium focus:outline-none border border-on-surface/10"
                />
                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setReplyingToId(null)}
                    className="px-3 py-1 text-xs font-bold text-on-surface-variant"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={() => handleAddReply(comment.id)}
                    disabled={!replyText.trim()}
                    className="px-4 py-1 bg-primary text-on-primary font-black rounded-lg text-xs uppercase disabled:opacity-50 cursor-pointer"
                  >
                    Submit Reply
                  </button>
                </div>
              </div>
            )}

            {/* Replies */}
            {comment.replies && comment.replies.length > 0 && (
              <div className="ml-10 mt-3 border-l-2 border-on-surface/10 pl-4 flex flex-col gap-3">
                {comment.replies.map((reply) => (
                  <div key={reply.id} className="flex flex-col gap-1">
                    <div className="flex items-center gap-2">
                      <img src={reply.avatar} alt={reply.user} className="w-6 h-6 rounded-full object-cover" />
                      <span className="font-extrabold text-xs text-on-surface">{reply.user}</span>
                      <span className="text-[10px] font-bold text-on-surface-variant/60">• {reply.date}</span>
                    </div>
                    <p className="text-xs font-medium text-on-surface pl-8">
                      {reply.content}
                    </p>
                    <div className="pl-8 pt-0.5">
                      <button
                        type="button"
                        onClick={() => handleLike(reply.id, comment.id)}
                        className="flex items-center gap-1.5 text-[11px] font-bold text-on-surface-variant hover:text-on-surface transition-colors cursor-pointer"
                      >
                        <Heart size={14} className={clsx(reply.isLiked && "fill-error text-error")} />
                        <span>{reply.likes}</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

          </div>
        ))}
      </div>

    </div>
  );
}
