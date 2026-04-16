import styles from './StatusBar.module.css'

export default function StatusBar() {
  const now = new Date()
  const hours = now.getHours()
  const minutes = now.getMinutes().toString().padStart(2, '0')

  return (
    <div className={styles.statusBar}>
      <span className={styles.time}>{hours}:{minutes}</span>
      <div className={styles.rightIcons}>
        {/* 신호 */}
        <svg width="17" height="12" viewBox="0 0 17 12" fill="none">
          <rect x="0" y="9" width="3" height="3" rx="0.5" fill="black"/>
          <rect x="4.5" y="6" width="3" height="6" rx="0.5" fill="black"/>
          <rect x="9" y="3" width="3" height="9" rx="0.5" fill="black"/>
          <rect x="13.5" y="0" width="3" height="12" rx="0.5" fill="black"/>
        </svg>
        {/* 와이파이 */}
        <svg width="16" height="12" viewBox="0 0 16 12" fill="none">
          <path d="M8 9.5C8.8 9.5 9.5 10.2 9.5 11S8.8 12.5 8 12.5 6.5 11.8 6.5 11 7.2 9.5 8 9.5Z" fill="black"/>
          <path d="M8 6C9.8 6 11.4 6.8 12.5 8L14 6.5C12.5 4.9 10.4 4 8 4S3.5 4.9 2 6.5L3.5 8C4.6 6.8 6.2 6 8 6Z" fill="black"/>
          <path d="M8 2.4C10.8 2.4 13.3 3.6 15 5.6L16.5 4.1C14.4 1.6 11.4 0 8 0S1.6 1.6 -0.5 4.1L1 5.6C2.7 3.6 5.2 2.4 8 2.4Z" fill="black"/>
        </svg>
        {/* 배터리 */}
        <svg width="25" height="12" viewBox="0 0 25 12" fill="none">
          <rect x="0.5" y="0.5" width="21" height="11" rx="3.5" stroke="black" strokeOpacity="0.35"/>
          <rect x="2" y="2" width="16" height="8" rx="2" fill="black"/>
          <path d="M23 4V8C23.8 7.5 24.5 6.8 24.5 6C24.5 5.2 23.8 4.5 23 4Z" fill="black" fillOpacity="0.4"/>
        </svg>
      </div>
    </div>
  )
}
