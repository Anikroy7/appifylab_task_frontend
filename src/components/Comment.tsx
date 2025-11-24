import { useState } from 'react';
import type { Comment as CommentType, Reply as ReplyType } from '../store/api/postApi';
import { useToggleCommentLikeMutation, useAddReplyMutation, useToggleReplyLikeMutation } from '../store/api/postApi';
import { useAppSelector } from '../store/hooks';

interface CommentProps {
    postId: string;
    comment: CommentType;
}

const Comment = ({ postId, comment }: CommentProps) => {
    const [showReplyInput, setShowReplyInput] = useState(false);
    const [replyContent, setReplyContent] = useState('');
    const [showAllReplies, setShowAllReplies] = useState(false);
    const { user } = useAppSelector((state) => state.auth);

    const [toggleCommentLike] = useToggleCommentLikeMutation();
    const [addReply] = useAddReplyMutation();
    const [toggleReplyLike] = useToggleReplyLikeMutation();

    const isCommentLikedByUser = comment.likes.some(like => like.userId._id === user?._id);

    const handleCommentLike = async () => {
        try {
            await toggleCommentLike({ postId, commentId: comment._id }).unwrap();
        } catch (error) {
            console.error('Failed to like comment:', error);
        }
    };

    const handleReplySubmit = async () => {
        if (!replyContent.trim()) return;

        try {
            await addReply({ postId, commentId: comment._id, content: replyContent }).unwrap();
            setReplyContent('');
            setShowReplyInput(false);
            setShowAllReplies(true);
        } catch (error) {
            console.error('Failed to add reply:', error);
        }
    };

    const handleReplyLike = async (replyId: string) => {
        try {
            await toggleReplyLike({ postId, commentId: comment._id, replyId }).unwrap();
        } catch (error) {
            console.error('Failed to like reply:', error);
        }
    };

    const formatTimeAgo = (dateString: string) => {
        const date = new Date(dateString);
        const now = new Date();
        const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

        if (seconds < 60) return 'Just now';
        if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
        if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
        if (seconds < 604800) return `${Math.floor(seconds / 86400)}d ago`;
        return date.toLocaleDateString();
    };

    const visibleReplies = showAllReplies ? comment.replies : comment.replies.slice(0, 2);

    return (
        <div className="_comment_wrapper" style={{ marginBottom: '16px' }}>
            <div className="_comment_container" style={{ display: 'flex', gap: '12px' }}>
                <div className="_comment_avatar">
                    <div className="_avatar_letter" style={{ width: '36px', height: '36px', fontSize: '14px' }}>
                        {comment.userId.firstName?.charAt(0)}
                    </div>
                </div>
                <div className="_comment_content" style={{ flex: 1 }}>
                    <div className="_comment_bubble" style={{
                        background: '#f0f2f5',
                        padding: '8px 12px',
                        borderRadius: '18px',
                        display: 'inline-block',
                        maxWidth: '100%'
                    }}>
                        <div className="_comment_author" style={{ fontWeight: 600, fontSize: '13px', marginBottom: '2px' }}>
                            {comment.userId.firstName} {comment.userId.lastName}
                        </div>
                        <div className="_comment_text" style={{ fontSize: '14px', wordBreak: 'break-word' }}>
                            {comment.content}
                        </div>
                    </div>
                    <div className="_comment_actions" style={{
                        display: 'flex',
                        gap: '16px',
                        marginTop: '4px',
                        paddingLeft: '12px',
                        fontSize: '12px',
                        color: '#65676b'
                    }}>
                        <button
                            onClick={handleCommentLike}
                            style={{
                                background: 'none',
                                border: 'none',
                                cursor: 'pointer',
                                fontWeight: isCommentLikedByUser ? 600 : 400,
                                color: isCommentLikedByUser ? '#1877f2' : '#65676b',
                                padding: 0
                            }}
                        >
                            {isCommentLikedByUser ? 'Liked' : 'Like'}
                        </button>
                        <button
                            onClick={() => setShowReplyInput(!showReplyInput)}
                            style={{
                                background: 'none',
                                border: 'none',
                                cursor: 'pointer',
                                color: '#65676b',
                                padding: 0
                            }}
                        >
                            Reply
                        </button>
                        <span>{formatTimeAgo(comment.createdAt)}</span>
                        {comment.likes.length > 0 && (
                            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                <svg width="12" height="12" viewBox="0 0 16 16" fill="currentColor" style={{ color: '#1877f2' }}>
                                    <path d="M8 0a8 8 0 100 16A8 8 0 008 0zM6.5 5C7.328 5 8 5.672 8 6.5S7.328 8 6.5 8 5 7.328 5 6.5 5.672 5 6.5 5zm3 0C10.328 5 11 5.672 11 6.5S10.328 8 9.5 8 8 7.328 8 6.5 8.672 5 9.5 5zM8 13c-2.3 0-4.31-1.46-5.11-3.5h10.22c-.8 2.04-2.81 3.5-5.11 3.5z" />
                                </svg>
                                {comment.likes.length}
                            </span>
                        )}
                    </div>

                    {/* Reply Input */}
                    {showReplyInput && (
                        <div className="_reply_input_container" style={{ marginTop: '12px', display: 'flex', gap: '8px' }}>
                            <div className="_avatar_letter" style={{ width: '32px', height: '32px', fontSize: '12px', flexShrink: 0 }}>
                                {user?.firstName?.charAt(0)}
                            </div>
                            <div style={{ flex: 1, display: 'flex', gap: '8px' }}>
                                <input
                                    type="text"
                                    value={replyContent}
                                    onChange={(e) => setReplyContent(e.target.value)}
                                    onKeyPress={(e) => e.key === 'Enter' && handleReplySubmit()}
                                    placeholder="Write a reply..."
                                    style={{
                                        flex: 1,
                                        padding: '8px 12px',
                                        borderRadius: '18px',
                                        border: '1px solid #ddd',
                                        outline: 'none',
                                        fontSize: '14px'
                                    }}
                                />
                                <button
                                    onClick={handleReplySubmit}
                                    disabled={!replyContent.trim()}
                                    style={{
                                        padding: '8px 16px',
                                        borderRadius: '18px',
                                        border: 'none',
                                        background: replyContent.trim() ? '#1877f2' : '#e4e6eb',
                                        color: replyContent.trim() ? 'white' : '#bcc0c4',
                                        cursor: replyContent.trim() ? 'pointer' : 'not-allowed',
                                        fontSize: '14px',
                                        fontWeight: 600
                                    }}
                                >
                                    Send
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Replies */}
                    {comment.replies.length > 0 && (
                        <div className="_replies_container" style={{ marginTop: '12px' }}>
                            {visibleReplies.map((reply: ReplyType) => {
                                const isReplyLikedByUser = reply.likes.some(like => like.userId._id === user?._id);
                                return (
                                    <div key={reply._id} className="_reply_item" style={{ display: 'flex', gap: '12px', marginBottom: '12px' }}>
                                        <div className="_reply_avatar">
                                            <div className="_avatar_letter" style={{ width: '32px', height: '32px', fontSize: '12px' }}>
                                                {reply.userId.firstName?.charAt(0)}
                                            </div>
                                        </div>
                                        <div className="_reply_content" style={{ flex: 1 }}>
                                            <div className="_reply_bubble" style={{
                                                background: '#f0f2f5',
                                                padding: '8px 12px',
                                                borderRadius: '18px',
                                                display: 'inline-block',
                                                maxWidth: '100%'
                                            }}>
                                                <div className="_reply_author" style={{ fontWeight: 600, fontSize: '13px', marginBottom: '2px' }}>
                                                    {reply.userId.firstName} {reply.userId.lastName}
                                                </div>
                                                <div className="_reply_text" style={{ fontSize: '14px', wordBreak: 'break-word' }}>
                                                    {reply.content}
                                                </div>
                                            </div>
                                            <div className="_reply_actions" style={{
                                                display: 'flex',
                                                gap: '16px',
                                                marginTop: '4px',
                                                paddingLeft: '12px',
                                                fontSize: '12px',
                                                color: '#65676b'
                                            }}>
                                                <button
                                                    onClick={() => handleReplyLike(reply._id)}
                                                    style={{
                                                        background: 'none',
                                                        border: 'none',
                                                        cursor: 'pointer',
                                                        fontWeight: isReplyLikedByUser ? 600 : 400,
                                                        color: isReplyLikedByUser ? '#1877f2' : '#65676b',
                                                        padding: 0
                                                    }}
                                                >
                                                    {isReplyLikedByUser ? 'Liked' : 'Like'}
                                                </button>
                                                <span>{formatTimeAgo(reply.createdAt)}</span>
                                                {reply.likes.length > 0 && (
                                                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                                        <svg width="12" height="12" viewBox="0 0 16 16" fill="currentColor" style={{ color: '#1877f2' }}>
                                                            <path d="M8 0a8 8 0 100 16A8 8 0 008 0zM6.5 5C7.328 5 8 5.672 8 6.5S7.328 8 6.5 8 5 7.328 5 6.5 5.672 5 6.5 5zm3 0C10.328 5 11 5.672 11 6.5S10.328 8 9.5 8 8 7.328 8 6.5 8.672 5 9.5 5zM8 13c-2.3 0-4.31-1.46-5.11-3.5h10.22c-.8 2.04-2.81 3.5-5.11 3.5z" />
                                                        </svg>
                                                        {reply.likes.length}
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                            {comment.replies.length > 2 && !showAllReplies && (
                                <button
                                    onClick={() => setShowAllReplies(true)}
                                    style={{
                                        background: 'none',
                                        border: 'none',
                                        color: '#65676b',
                                        cursor: 'pointer',
                                        fontSize: '14px',
                                        fontWeight: 600,
                                        padding: '4px 0',
                                        marginLeft: '44px'
                                    }}
                                >
                                    View {comment.replies.length - 2} more {comment.replies.length - 2 === 1 ? 'reply' : 'replies'}
                                </button>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Comment;
