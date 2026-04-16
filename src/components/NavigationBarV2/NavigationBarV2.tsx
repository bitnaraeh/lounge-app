import styles from './NavigationBarV2.module.css'

interface NavigationBarV2Props {
  onSearch?: () => void
  activeMainTab: 'lounge' | 'myTrip'
  onMainTabChange: (tab: 'lounge' | 'myTrip') => void
  hasReservation: boolean
  hidden?: boolean
}

export default function NavigationBarV2({ onSearch, activeMainTab, onMainTabChange, hasReservation, hidden = false }: NavigationBarV2Props) {
  const isAI = activeMainTab === 'myTrip'

  return (
    <nav className={styles.navBar} data-hidden={hidden}>
      <div className={styles.pillWrap}>
        <div className={styles.pill}>
          <button
            className={styles.pillTab}
            data-active={activeMainTab === 'lounge'}
            onClick={() => onMainTabChange('lounge')}
          >
            {'\u{B77C}\u{C6B4}\u{C9C0}'}
          </button>
          <button
            className={styles.pillTab}
            data-active={activeMainTab === 'myTrip'}
            onClick={() => onMainTabChange('myTrip')}
          >
            {'AI\u{CD94}\u{CC9C}'}
            {!hasReservation && activeMainTab !== 'myTrip' && (
              <span className={styles.bubble}>{'AI\u{C640} \u{D568}\u{AED8} \u{C5EC}\u{D589}\u{C744} \u{ACC4}\u{D68D}\u{D574}\u{BD10}\u{C694}!'}</span>
            )}
          </button>
        </div>
      </div>
      <div className={styles.actions}>
        {!isAI && (
          <button className={styles.iconBtn} aria-label={'\u{ACF5}\u{C9C0}'}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M4 13V11l7-3V4a1 1 0 012 0v4l7 3v2l-7 1v4.5a1.5 1.5 0 01-3 0V15l-6-2z" fill="var(--color-gray-900)" />
            </svg>
          </button>
        )}
        <button className={styles.iconBtn} aria-label={'\u{AC80}\u{C0C9}'} onClick={onSearch}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <circle cx="11" cy="11" r="6" stroke="var(--color-gray-900)" strokeWidth="2" />
            <path d="M16 16l4 4" stroke="var(--color-gray-900)" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>
      </div>
    </nav>
  )
}
