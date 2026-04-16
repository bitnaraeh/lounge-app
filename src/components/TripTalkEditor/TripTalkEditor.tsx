import { useState } from 'react'
import styles from './TripTalkEditor.module.css'

const CATEGORIES = ['궁금해요', '숙소후기', '여행 후기', '일상 수다', '동행 모집']

interface TripTalkEditorProps {
  onClose: () => void
}

export default function TripTalkEditor({ onClose }: TripTalkEditorProps) {
  const [showCategorySheet, setShowCategorySheet] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  const handleSelectCategory = (cat: string) => {
    setSelectedCategory(cat)
    setShowCategorySheet(false)
  }

  return (
    <div className={styles.page}>
      <nav className={styles.nav}>
        <button className={styles.closeBtn} onClick={onClose} aria-label="닫기">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M6 6l12 12M18 6l-12 12" stroke="var(--color-gray-900)" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>
        <button className={styles.submitBtn}>올리기</button>
      </nav>

      <div className={styles.scrollArea}>
        <div className={styles.editRow} onClick={() => setShowCategorySheet(true)}>
          <div className={styles.editRowIcon}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M3 5a2 2 0 012-2h10a2 2 0 012 2v7a2 2 0 01-2 2H8l-3.5 2.5V14H5a2 2 0 01-2-2V5z" fill="var(--color-gray-900)" />
            </svg>
          </div>
          <div className={styles.editRowText}>
            <span className={styles.editRowLabel}>{selectedCategory || '궁금해요'}</span>
          </div>
          <div className={styles.editRowArrow}>
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M7 5l4 4-4 4" stroke="var(--color-gray-400)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>

        <div className={styles.editRow}>
          <div className={styles.editRowIcon}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M10 2a6 6 0 00-6 6c0 4 6 10 6 10s6-6 6-10a6 6 0 00-6-6zm0 8a2 2 0 110-4 2 2 0 010 4z" fill="var(--color-gray-900)" />
            </svg>
          </div>
          <div className={styles.editRowText}>
            <span className={styles.editRowLabel}>트립톡과 관련된 지역을 선택해주세요</span>
            <span className={styles.editRowSub}>숙소를 선택해야 트립톡을 작성할 수 있어요</span>
          </div>
          <div className={styles.editRowArrow}>
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M7 5l4 4-4 4" stroke="var(--color-gray-400)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>

        <div className={styles.divider} />

        <div className={styles.photoSection}>
          <button className={styles.photoBtn}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M4 7a2 2 0 012-2h2l1-2h6l1 2h2a2 2 0 012 2v10a2 2 0 01-2 2H6a2 2 0 01-2-2V7z" stroke="var(--color-gray-400)" strokeWidth="1.5" />
              <circle cx="12" cy="12" r="3" stroke="var(--color-gray-400)" strokeWidth="1.5" />
            </svg>
            <span className={styles.photoCount}>0/10</span>
          </button>
        </div>

        <div className={styles.editorArea}>
          <input className={styles.titleInput} placeholder="제목을 입력해주세요" />
          <textarea className={styles.bodyInput} placeholder={"숙소는 어땠나요? 다녀온 숙소에 대해 적어주세요.\n(광고 홍보 목적, 거래 관련 및 명예훼손 글은 올리실 수 없어요.)"} />
        </div>

        <div className={styles.infoBox}>
          <span className={styles.infoTitle}>따뜻한 트립비토즈 커뮤니티를 만들기 위해 약속을 지켜주세요</span>
          <span className={styles.infoLink}>트립비토즈 게시판 운영정책 보러가기</span>
        </div>
      </div>

      {/* Category selection bottom sheet */}
      {showCategorySheet && (
        <div className={styles.categoryOverlay} onClick={() => setShowCategorySheet(false)}>
          <div className={styles.categorySheet} onClick={(e) => e.stopPropagation()}>
            <div className={styles.categoryHeader}>
              <button className={styles.closeBtn} onClick={() => setShowCategorySheet(false)} aria-label="닫기">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M6 6l12 12M18 6l-12 12" stroke="var(--color-gray-900)" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </button>
              <span className={styles.categoryTitle}>주제 선택</span>
            </div>
            {CATEGORIES.map((cat) => (
              <button key={cat} className={styles.categoryItem} onClick={() => handleSelectCategory(cat)}>
                <span className={`${styles.categoryItemText} ${selectedCategory === cat ? styles.categoryItemActive : ''}`}>
                  {cat}
                </span>
                {selectedCategory === cat && (
                  <div className={styles.categoryCheck}>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M3 8l4 4 6-6" stroke="var(--color-primary-500)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
