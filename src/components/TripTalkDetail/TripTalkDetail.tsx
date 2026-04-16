import { useState, useRef } from 'react'
import styles from './TripTalkDetail.module.css'
import type { TripTalk, Comment } from '../../data/tripTalks'

interface TripTalkDetailProps {
  post: TripTalk
  onBack: () => void
}

export default function TripTalkDetail({ post, onBack }: TripTalkDetailProps) {
  const [liked, setLiked] = useState(false)
  const [likeCount, setLikeCount] = useState(post.likeCount)
  const [comments, setComments] = useState<Comment[]>(post.comments)
  const [expandedReplies, setExpandedReplies] = useState<Set<number>>(new Set())
  const [commentLikes, setCommentLikes] = useState<Record<number, boolean>>(() => {
    const map: Record<number, boolean> = {}
    post.comments.forEach((c) => { map[c.id] = c.isLiked })
    return map
  })
  const [replyTo, setReplyTo] = useState<{ commentId: number; userName: string } | null>(null)
  const [inputValue, setInputValue] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  const toggleLike = () => {
    setLiked((prev) => !prev)
    setLikeCount((prev) => (liked ? prev - 1 : prev + 1))
  }

  const toggleCommentLike = (commentId: number) => {
    setCommentLikes((prev) => ({ ...prev, [commentId]: !prev[commentId] }))
  }

  const toggleReplies = (commentId: number) => {
    setExpandedReplies((prev) => {
      const next = new Set(prev)
      if (next.has(commentId)) next.delete(commentId)
      else next.add(commentId)
      return next
    })
  }

  const handleReply = (commentId: number, userName: string) => {
    setReplyTo({ commentId, userName })
    inputRef.current?.focus()
  }

  const handleSend = () => {
    if (!inputValue.trim()) return
    const newComment: Comment = {
      id: Date.now(),
      userName: 'me',
      timeAgo: '방금',
      body: replyTo ? `@${replyTo.userName} ${inputValue}` : inputValue,
      likeCount: 0,
      isLiked: false,
      isMine: true,
    }
    if (replyTo) {
      setComments((prev) =>
        prev.map((c) =>
          c.id === replyTo.commentId
            ? { ...c, replies: [...(c.replies || []), newComment] }
            : c
        )
      )
      setExpandedReplies((prev) => new Set(prev).add(replyTo.commentId))
    } else {
      setComments((prev) => [...prev, newComment])
    }
    setInputValue('')
    setReplyTo(null)
  }

  return (
    <div className={styles.page}>
      <nav className={styles.nav}>
        <button className={styles.backBtn} onClick={onBack} aria-label="뒤로가기">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M15 19l-7-7 7-7" stroke="var(--color-gray-900)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <span className={styles.navTitle}>{post.hotelName || post.title}</span>
        <button className={styles.moreBtn} aria-label="더보기">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="5" r="1.5" fill="var(--color-gray-900)" />
            <circle cx="12" cy="12" r="1.5" fill="var(--color-gray-900)" />
            <circle cx="12" cy="19" r="1.5" fill="var(--color-gray-900)" />
          </svg>
        </button>
      </nav>

      <div className={styles.scrollArea}>
        <div className={styles.postSection}>
          <div className={styles.header}>
            <img className={styles.avatar} src={post.avatarUrl} alt={`${post.userName} 프로필`} />
            <div className={styles.profileInfo}>
              <span className={styles.userName}>{post.userName}</span>
              <span className={styles.metaText}>{post.timeAgo}</span>
            </div>
          </div>

          <div className={styles.contentBody}>
            {(post.showBtozpick || post.showRealbook) && (
              <div className={styles.tags}>
                {post.showBtozpick && (
                  <span className={styles.tagBtozpick}>
                    <span className={styles.tagIcon}>
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                        <path d="M6 1l1.2 2.8L10 5l-2.4 2 .4 3.2L6 8.8 3.8 10.2l.6-3.2L2 5l2.8-1.2L6 1z" fill="#fff" />
                      </svg>
                    </span>
                    <span className={styles.tagText}>비토즈픽</span>
                  </span>
                )}
                {post.showRealbook && (
                  <span className={styles.tagRealbook}>
                    <span className={styles.tagRealbookText}>리얼투숙</span>
                  </span>
                )}
              </div>
            )}
            <p className={styles.postTitle}>{post.title}</p>
            <p className={styles.postBody}>{post.fullBody}</p>
            <div className={styles.imageWrapper}>
              <img className={styles.postImage} src={post.imageUrl} alt="" />
              <div className={styles.pageControl}>
                <span style={{ fontWeight: 700 }}>1</span>
                <span>/</span>
                <span>4</span>
              </div>
            </div>

            {post.hotelName && (
              <div className={styles.hotelCard}>
                <img className={styles.hotelCardThumb} src={post.thumbnailUrl} alt="" />
                <div className={styles.hotelCardInfo}>
                  <span className={styles.hotelCardName}>{post.hotelName}</span>
                  <div className={styles.hotelCardMeta}>
                    <span className={styles.hotelCardMetaText}>{post.region}</span>
                  </div>
                </div>
                <div className={styles.hotelCardArrow}>
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M4.5 2.5l4 3.5-4 3.5" stroke="var(--color-gray-400)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </div>
            )}
          </div>

          {/* Action bar */}
          <div className={styles.actionRow}>
            <div className={styles.actionLeft}>
              <button className={styles.actionBtn} onClick={toggleLike} aria-label={`좋아요 ${likeCount}`}>
                <span className={styles.actionIcon}>
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path
                      d="M10 17.5s-7-4.5-7-9a4 4 0 017-2.6A4 4 0 0117 8.5c0 4.5-7 9-7 9z"
                      stroke={liked ? '#FF375C' : 'var(--color-gray-400)'}
                      fill={liked ? '#FF375C' : 'none'}
                      strokeWidth="1.5"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                <span className={`${styles.actionCount} ${liked ? styles.actionCountActive : ''}`}>{likeCount}</span>
              </button>
              <button className={styles.actionBtn} aria-label={`댓글 ${comments.length}`}>
                <span className={styles.actionIcon}>
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M3 5a2 2 0 012-2h10a2 2 0 012 2v7a2 2 0 01-2 2H8l-3.5 2.5V14H5a2 2 0 01-2-2V5z" stroke="var(--color-gray-400)" strokeWidth="1.5" strokeLinejoin="round" />
                  </svg>
                </span>
                <span className={styles.actionCount}>{comments.length}</span>
              </button>
              <button className={styles.actionBtn} aria-label={`북마크 ${post.bookmarkCount}`}>
                <span className={styles.actionIcon}>
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M5 3h10a1 1 0 011 1v13.5l-5.5-3.5L5 17.5V4a1 1 0 011-1z" stroke="var(--color-gray-400)" strokeWidth="1.5" strokeLinejoin="round" />
                  </svg>
                </span>
                <span className={styles.actionCount}>{post.bookmarkCount}</span>
              </button>
            </div>
            <button className={styles.shareBtn} aria-label="공유">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M15 7a2 2 0 100-4 2 2 0 000 4zM5 12a2 2 0 100-4 2 2 0 000 4zM15 17a2 2 0 100-4 2 2 0 000 4zM7 11l6 3M13 6l-6 3" stroke="var(--color-gray-400)" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </button>
          </div>
        </div>

        {/* Comments */}
        <div className={styles.commentsSection}>
          {comments.map((comment) => (
            <div key={comment.id} className={styles.comment}>
              <div className={styles.commentHeader}>
                <img className={styles.commentAvatar} src={`https://i.pravatar.cc/56?u=${comment.userName}`} alt={`${comment.userName} 프로필`} />
                <span className={styles.commentUserName}>{comment.userName}</span>
                <span className={styles.commentTime}>{comment.timeAgo}</span>
              </div>
              <p className={styles.commentBody}>{comment.body}</p>
              <div className={styles.commentActions}>
                <button className={styles.commentActionBtn} data-liked={commentLikes[comment.id]} onClick={() => toggleCommentLike(comment.id)}>
                  좋아요{comment.likeCount > 0 && ` ${comment.likeCount}`}
                </button>
                <button className={styles.commentActionBtn} onClick={() => handleReply(comment.id, comment.userName)}>답글달기</button>
                {comment.isMine && <button className={styles.commentActionBtn}>삭제</button>}
              </div>
              {comment.replies && comment.replies.length > 0 && (
                <>
                  <button className={styles.viewRepliesBtn} onClick={() => toggleReplies(comment.id)}>
                    {expandedReplies.has(comment.id) ? '숨기기' : `댓글보기 (${comment.replies.length})`}
                    <svg className={styles.viewRepliesArrow} data-open={expandedReplies.has(comment.id)} width="8" height="8" viewBox="0 0 8 8" fill="none">
                      <path d="M2 3l2 2 2-2" stroke="var(--color-gray-400)" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                  {expandedReplies.has(comment.id) && comment.replies.map((reply) => (
                    <div key={reply.id} className={styles.reply}>
                      <div className={styles.replyHeader}>
                        <img className={styles.replyAvatar} src={`https://i.pravatar.cc/40?u=${reply.userName}`} alt={`${reply.userName} 프로필`} />
                        <span className={styles.commentUserName}>{reply.userName}</span>
                        <span className={styles.commentTime}>{reply.timeAgo}</span>
                      </div>
                      <p className={styles.replyBody}>{reply.body}</p>
                      <div className={styles.replyActions}>
                        <button className={styles.commentActionBtn}>좋아요</button>
                        <button className={styles.commentActionBtn} onClick={() => handleReply(comment.id, reply.userName)}>답글달기</button>
                        {reply.isMine && <button className={styles.commentActionBtn}>삭제</button>}
                      </div>
                    </div>
                  ))}
                </>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Input bar */}
      <div className={styles.inputBar}>
        {replyTo && (
          <div className={styles.replyIndicator}>
            <span>{replyTo.userName}에게 답글 작성 중</span>
            <button className={styles.replyIndicatorClose} onClick={() => setReplyTo(null)} aria-label="답글 취소">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M4 4l6 6M10 4l-6 6" stroke="var(--color-gray-400)" strokeWidth="1.2" strokeLinecap="round" />
              </svg>
            </button>
          </div>
        )}
        <div className={styles.inputField}>
          <input ref={inputRef} className={styles.inputText} placeholder="댓글을 남겨보세요" value={inputValue} onChange={(e) => setInputValue(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleSend()} />
          <button className={`${styles.sendBtn} ${inputValue.trim() ? styles.sendBtnActive : ''}`} onClick={handleSend} aria-label="전송">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M2 9l14-7-4 7 4 7L2 9z" fill={inputValue.trim() ? 'var(--color-primary-500)' : '#ccc'} />
            </svg>
          </button>
        </div>
        <div className={styles.homeIndicator}>
          <div className={styles.homeBar} />
        </div>
      </div>
    </div>
  )
}
