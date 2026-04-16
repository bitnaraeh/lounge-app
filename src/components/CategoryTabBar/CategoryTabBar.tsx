import styles from './CategoryTabBar.module.css'

const CATEGORIES = ['\u{C219}\u{C18C}\u{D6C4}\u{AE30}', '\u{C5EC}\u{D589}\u{D6C4}\u{AE30}', '\u{BE44}\u{D1A0}\u{C988}\u{D53D}', '\u{AD81}\u{AE08}\u{D574}\u{C694}', '\u{B3D9}\u{D589}\u{BAA8}\u{C9D1}', '\u{C77C}\u{C0C1}\u{C218}\u{B2E4}']

const REGIONS = [
  '\u{C804}\u{CCB4}', '\u{B300}\u{D55C}\u{BBFC}\u{AD6D}', '\u{C77C}\u{BCF8}', '\u{B300}\u{B9CC}', '\u{D64D}\u{CF69}', '\u{C2F1}\u{AC00}\u{D3EC}\u{B974}',
  '\u{BCA0}\u{D2B8}\u{B0A8}', '\u{D0DC}\u{AD6D}', '\u{BBF8}\u{AD6D}', '\u{C2A4}\u{D398}\u{C778}', '\u{D504}\u{B791}\u{C2A4}', '\u{C774}\u{D0C8}\u{B9AC}\u{C544}',
  '\u{C2A4}\u{C704}\u{C2A4}', '\u{D638}\u{C8FC}', '\u{ADF8}\u{C678} \u{AD6D}\u{AC00}',
]

interface CategoryTabBarProps {
  activeCategory: string
  onCategoryChange: (cat: string) => void
  activeRegion: string
  onRegionChange: (region: string) => void
  showRegionBar?: boolean
}

export default function CategoryTabBar({
  activeCategory,
  onCategoryChange,
  activeRegion,
  onRegionChange,
  showRegionBar = true,
}: CategoryTabBarProps) {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.tabList} role="tablist">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              className={styles.tab}
              data-active={cat === activeCategory}
              role="tab"
              aria-selected={cat === activeCategory}
              onClick={() => onCategoryChange(cat)}
            >
              <span className={styles.tabText}>{cat}</span>
              <div className={styles.indicator} />
            </button>
          ))}
        </div>
      </div>
      {showRegionBar && (
        <div className={styles.regionBar}>
          <div className={styles.regionList}>
            {REGIONS.map((r) => (
              <button
                key={r}
                className={styles.regionChip}
                data-active={r === activeRegion}
                onClick={() => onRegionChange(r)}
              >
                {r}
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  )
}
