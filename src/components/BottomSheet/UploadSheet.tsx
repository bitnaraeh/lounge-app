import styles from './BottomSheet.module.css'

interface UploadSheetProps {
  onClose: () => void
  onTripTalk: () => void
}

export default function UploadSheet({ onClose, onTripTalk }: UploadSheetProps) {
  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.sheet} onClick={(e) => e.stopPropagation()}>
        <div className={styles.sheetHeader}>
          <button className={styles.closeBtn} onClick={onClose} aria-label="닫기">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M6 6l12 12M18 6l-12 12" stroke="var(--color-gray-900)" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        <button className={styles.listItem} onClick={() => {}}>
          <div className={styles.listIcon}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <rect x="3" y="5" width="18" height="14" rx="2" stroke="#333" strokeWidth="1.5" />
              <path d="M10 9.5l5 3-5 3v-6z" fill="#333" />
            </svg>
          </div>
          <div className={styles.listTextWrap}>
            <span className={styles.listTitle}>여행 영상 올리기</span>
            <span className={styles.listDesc}>영상을 공유하고 혜택을 받아보세요</span>
          </div>
        </button>

        <button className={styles.listItem} onClick={onTripTalk}>
          <div className={styles.listIcon}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <rect x="4" y="6" width="16" height="12" rx="3" fill="#009DF6" />
              <path d="M9 18l3 2 3-2" stroke="#009DF6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              <line x1="12" y1="10" x2="12" y2="10" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
              <line x1="9" y1="14" x2="15" y2="14" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </div>
          <div className={styles.listTextWrap}>
            <span className={styles.listTitle}>트립톡 쓰기</span>
            <span className={styles.listDesc}>라운지에서 여행 이야기를 나눠보세요</span>
          </div>
        </button>

        <button className={styles.listItem} onClick={() => {}}>
          <div className={styles.listIcon}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <rect x="4" y="4" width="16" height="16" rx="2" stroke="#333" strokeWidth="1.5" />
              <path d="M8 12h8M12 8v8" stroke="#333" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </div>
          <div className={styles.listTextWrap}>
            <span className={styles.listTitle}>여행 기록 쓰기</span>
            <span className={styles.listDesc}>숙박 후기와 여행의 추억을 기록해보세요</span>
          </div>
        </button>
      </div>
    </div>
  )
}
