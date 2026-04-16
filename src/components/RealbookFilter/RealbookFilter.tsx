import styles from './RealbookFilter.module.css'

interface RealbookFilterProps {
  checked: boolean
  onChange: (checked: boolean) => void
}

export default function RealbookFilter({ checked, onChange }: RealbookFilterProps) {
  return (
    <div className={styles.container}>
      <button
        className={styles.label}
        role="checkbox"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
      >
        <span className={styles.checkbox} data-checked={checked}>
          {checked && (
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M3 7l3 3 5-5" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          )}
        </span>
        <span className={styles.text}>리얼투숙 리뷰만 보기</span>
      </button>
    </div>
  )
}
