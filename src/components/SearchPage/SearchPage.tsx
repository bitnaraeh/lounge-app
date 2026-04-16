import { useState, useRef, useEffect } from 'react'
import styles from './SearchPage.module.css'
import StatusBar from '../StatusBar/StatusBar'

const POPULAR = ['부산광역시', '오사카', '세부', '도쿄', '후쿠오카', '서울특별시', '뉴욕', '푸꾸옥']

interface SearchPageProps {
  onBack: () => void
}

export default function SearchPage({ onBack }: SearchPageProps) {
  const [query, setQuery] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  return (
    <div className={styles.page}>
      <StatusBar />
      <div className={styles.searchArea}>
        <div className={styles.searchBar}>
          <button className={styles.backBtn} onClick={onBack} aria-label="뒤로가기">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M15 19l-7-7 7-7" stroke="var(--color-gray-900)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <div className={styles.inputWrap}>
            <input
              ref={inputRef}
              className={styles.searchInput}
              placeholder="검색어를 입력해주세요"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
          <button className={styles.searchBtn} aria-label="검색">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <circle cx="11" cy="11" r="6" stroke="var(--color-gray-900)" strokeWidth="2" />
              <path d="M16 16l4 4" stroke="var(--color-gray-900)" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      </div>

      <div className={styles.section}>
        <div className={styles.sectionHeader}>
          <span className={styles.sectionTitle}>인기 검색어</span>
        </div>
        <div className={styles.chips}>
          {POPULAR.map((keyword) => (
            <button key={keyword} className={styles.chip} onClick={() => setQuery(keyword)}>
              {keyword}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
