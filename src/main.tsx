import { StrictMode, useState } from 'react'
import { createRoot } from 'react-dom/client'
import LoungePageV2 from './components/LoungePageV2/LoungePageV2'

function App() {
  const [hasReservation, setHasReservation] = useState(true)

  return (
    <>
      <LoungePageV2 simulateNoReservation={!hasReservation} />

      {/* 프로토타입 케이스 토글 */}
      <div style={{
        position: 'fixed',
        bottom: 20,
        right: 20,
        zIndex: 9999,
        background: '#1a1a1a',
        borderRadius: 12,
        padding: '8px 12px',
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        boxShadow: '0 4px 16px rgba(0,0,0,0.3)',
        fontFamily: 'sans-serif',
        fontSize: 12,
        color: '#fff',
        cursor: 'pointer',
        userSelect: 'none',
      }} onClick={() => setHasReservation(v => !v)}>
        <div style={{
          width: 32,
          height: 18,
          borderRadius: 9,
          background: hasReservation ? '#7B3CFF' : '#555',
          position: 'relative',
          transition: 'background 0.2s',
          flexShrink: 0,
        }}>
          <div style={{
            position: 'absolute',
            top: 2,
            left: hasReservation ? 16 : 2,
            width: 14,
            height: 14,
            borderRadius: '50%',
            background: '#fff',
            transition: 'left 0.2s',
          }} />
        </div>
        <span>{hasReservation ? '예약 있음' : '예약 없음'}</span>
      </div>
    </>
  )
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
