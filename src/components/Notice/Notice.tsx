import styles from './Notice.module.css'

export default function Notice() {
  return (
    <div className={styles.notice}>
      <div className={styles.content}>
        <div className={styles.titleRow}>
          <span className={styles.badge}>공지</span>
          <span className={styles.text}> 공지입니다.</span>
        </div>
        <button className={styles.arrow} aria-label="공지 더보기">
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M4.5 3l3 3-3 3" stroke="var(--color-gray-400)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
    </div>
  )
}
