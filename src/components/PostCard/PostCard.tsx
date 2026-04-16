import styles from './PostCard.module.css'

interface PostCardProps {
  userName: string
  timeAgo: string
  category: string
  region: string
  title: string
  body: string
  thumbnailUrl?: string
  hotelName?: string
  showBtozpick?: boolean
  showRealbook?: boolean
  likeCount: number
  commentCount: number
  bookmarkCount: number
  avatarUrl?: string
  onClick?: () => void
}

export default function PostCard({
  userName,
  timeAgo,
  category,
  region,
  title,
  body,
  thumbnailUrl,
  hotelName,
  showBtozpick,
  showRealbook,
  likeCount,
  commentCount,
  bookmarkCount,
  avatarUrl,
  onClick,
}: PostCardProps) {
  return (
    <div className={styles.card} onClick={onClick}>
      <div className={styles.wrapper}>
        <div className={styles.profile}>
          {avatarUrl ? (
            <img src={avatarUrl} alt={userName} className={styles.avatar} />
          ) : (
            <div className={styles.avatar} />
          )}
          <div className={styles.profileInfo}>
            <span className={styles.userName}>{userName}</span>
            <div className={styles.metaRow}>
              <span className={styles.metaText}>{timeAgo}</span>
              <span className={styles.dot} />
              <span className={styles.metaText}>{category}</span>
              <span className={styles.dot} />
              <span className={styles.metaText}>{region}</span>
            </div>
          </div>
        </div>

        <div className={styles.content}>
          {(showBtozpick || showRealbook) && (
            <div className={styles.tags}>
              {showBtozpick && (
                <div className={styles.tagBtozpick}>
                  <span className={styles.tagBtozpickText}>BTOZPICK</span>
                </div>
              )}
              {showRealbook && (
                <div className={styles.tagRealbook}>
                  <span className={styles.tagRealbookText}>리얼북</span>
                </div>
              )}
            </div>
          )}

          <div className={styles.bodyContainer}>
            <div className={styles.bodyRow}>
              <div className={styles.textBlock}>
                <span className={styles.title}>{title}</span>
                <span className={styles.body}>{body}</span>
              </div>
              {thumbnailUrl && (
                <img src={thumbnailUrl} alt="" className={styles.thumbnail} />
              )}
            </div>

            {hotelName && (
              <div className={styles.hotelTag}>
                <span className={styles.hotelName}>{hotelName}</span>
              </div>
            )}
          </div>
        </div>

        <div className={styles.actionBar}>
          <button className={styles.actionBtn}>
            <span className={styles.actionIcon}>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M10 17.5s-7-4.5-7-9a4 4 0 017-2.6A4 4 0 0117 8.5c0 4.5-7 9-7 9z" stroke="var(--color-gray-400)" strokeWidth="1.5" strokeLinejoin="round" />
              </svg>
            </span>
            <span className={styles.actionCount}>{likeCount}</span>
          </button>
          <button className={styles.actionBtn}>
            <span className={styles.actionIcon}>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M3 5a2 2 0 012-2h10a2 2 0 012 2v7a2 2 0 01-2 2H8l-3.5 2.5V14H5a2 2 0 01-2-2V5z" stroke="var(--color-gray-400)" strokeWidth="1.5" strokeLinejoin="round" />
              </svg>
            </span>
            <span className={styles.actionCount}>{commentCount}</span>
          </button>
          <button className={styles.actionBtn}>
            <span className={styles.actionIcon}>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M5 3h10a1 1 0 011 1v13.5l-5.5-3.5L5 17.5V4a1 1 0 011-1z" stroke="var(--color-gray-400)" strokeWidth="1.5" strokeLinejoin="round" />
              </svg>
            </span>
            <span className={styles.actionCount}>{bookmarkCount}</span>
          </button>
        </div>
      </div>
    </div>
  )
}
