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
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M10 17.5C10 17.5 2.5 13 2.5 7.5C2.5 5.43 4.18 3.75 6.25 3.75C7.5 3.75 8.6 4.37 9.25 5.32C9.9 4.37 11 3.75 12.25 3.75C14.32 3.75 16 5.43 16 7.5C16 13 10 17.5 10 17.5Z" stroke="#999" strokeWidth="1.5" fill="none"/>
            </svg>
            <span className={styles.actionCount}>{likeCount}</span>
          </button>
          <button className={styles.actionBtn}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M17.5 10C17.5 13.31 14.14 16 10 16C9.14 16 8.32 15.87 7.56 15.63L3.75 17.5L4.87 14.18C3.97 13.14 3.5 11.88 3.5 10.5C3.5 7.19 6.86 4.5 11 4.5" stroke="#999" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
            </svg>
            <span className={styles.actionCount}>{commentCount}</span>
          </button>
          <button className={styles.actionBtn}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M5 3.75H15C15.69 3.75 16.25 4.31 16.25 5V17.5L10 14.38L3.75 17.5V5C3.75 4.31 4.31 3.75 5 3.75Z" stroke="#999" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
            </svg>
            <span className={styles.actionCount}>{bookmarkCount}</span>
          </button>
        </div>
      </div>
    </div>
  )
}
