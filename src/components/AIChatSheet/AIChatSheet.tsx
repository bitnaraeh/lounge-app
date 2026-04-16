import { useState, useRef, useEffect } from 'react'
import styles from './AIChatSheet.module.css'
import type { TripTalk } from '../../data/tripTalks'

type MsgType = 'text' | 'options' | 'tripTalks' | 'loading'

interface Message {
  id: number
  role: 'user' | 'ai'
  type: MsgType
  text?: string
  options?: string[]
  posts?: TripTalk[]
}

interface ChatHistory {
  role: 'user' | 'assistant'
  content: string
}

interface AIChatSheetProps {
  onClose: () => void
  onViewPost?: (post: TripTalk) => void
  onWritePost?: () => void
}

export default function AIChatSheet({ onClose, onViewPost, onWritePost }: AIChatSheetProps) {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const composing = useRef(false)
  const bottomRef = useRef<HTMLDivElement>(null)
  const didInit = useRef(false)
  const chatHistory = useRef<ChatHistory[]>([])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  useEffect(() => {
    if (didInit.current) return
    didInit.current = true
    add('ai', { type: 'text', text: '안녕하세요! 어떤 여행을 찾고 계세요? 여행지나 원하는 스타일을 말씀해주세요 😊' })
    add('ai', { type: 'options', text: '인기 여행지', options: ['오사카', '도쿄', '방콕', '다낭', '발리', '제주'] })
  }, [])

  const add = (role: 'user' | 'ai', partial: Omit<Message, 'id' | 'role'>) => {
    setMessages((prev) => [...prev, { ...partial, id: Date.now() + Math.random(), role } as Message])
  }

  const callChatAPI = async (userText: string) => {
    chatHistory.current.push({ role: 'user', content: userText })

    setIsLoading(true)
    add('ai', { type: 'loading' })

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: chatHistory.current }),
      })
      const data = await res.json()

      // 로딩 메시지 제거
      setMessages((prev) => prev.filter((m) => m.type !== 'loading'))

      if (!data.success) {
        add('ai', { type: 'text', text: '잠시 오류가 생겼어요. 다시 시도해주세요 🙏' })
        return
      }

      chatHistory.current.push({ role: 'assistant', content: data.message })

      add('ai', { type: 'text', text: data.message })

      if (data.posts && data.posts.length > 0) {
        add('ai', { type: 'text', text: '관련 트립톡이에요 👇' })
        add('ai', { type: 'tripTalks', posts: data.posts })
      } else if (data.action === 'recommend_city' || data.action === 'show_talks') {
        add('ai', { type: 'text', text: '아직 해당 도시 트립톡이 없어요. 직접 작성해보시겠어요?' })
        add('ai', { type: 'options', options: ['트립톡 작성하기', '다른 여행지 보기'] })
      }

      if (data.options && data.options.length > 0) {
        add('ai', { type: 'options', options: data.options })
      }
    } catch {
      setMessages((prev) => prev.filter((m) => m.type !== 'loading'))
      add('ai', { type: 'text', text: '네트워크 오류가 생겼어요. 다시 시도해주세요.' })
    } finally {
      setIsLoading(false)
    }
  }

  const handleOption = (opt: string) => {
    if (opt === '트립톡 작성하기') {
      onWritePost?.()
      onClose()
      return
    }
    add('user', { type: 'text', text: opt })
    callChatAPI(opt)
  }

  const handleSend = () => {
    const msg = input.trim()
    if (!msg || isLoading) return
    setInput('')
    add('user', { type: 'text', text: msg })
    callChatAPI(msg)
  }

  return (
    <div className={styles.overlay}>
      <div className={styles.sheet}>
        <div className={styles.header}>
          <button className={styles.closeBtn} onClick={onClose} aria-label="close">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M18 6L6 18M6 6l12 12" stroke="var(--color-gray-900)" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
          <span className={styles.headerTitle}>{'AI 여행 추천'}</span>
          <div style={{ width: 24 }} />
        </div>
        <div className={styles.chatArea}>
          {messages.map((m) => (
            <div key={m.id}>
              {m.type === 'loading' && (
                <div className={styles.msgRow} data-role="ai">
                  <div className={styles.aiAvatar}>{'✨'}</div>
                  <div className={styles.msgBubble} data-role="ai">
                    <span className={styles.loadingDots}>
                      <span>·</span><span>·</span><span>·</span>
                    </span>
                  </div>
                </div>
              )}
              {m.type === 'text' && (
                <div className={styles.msgRow} data-role={m.role}>
                  {m.role === 'ai' && <div className={styles.aiAvatar}>{'✨'}</div>}
                  <div className={styles.msgBubble} data-role={m.role}>{m.text}</div>
                </div>
              )}
              {m.type === 'options' && (
                <div className={styles.optionsWrap}>
                  {m.text && <div className={styles.optionsLabel}>{m.text}</div>}
                  <div className={styles.optionsList}>
                    {m.options?.map((o) => (
                      <button key={o} className={styles.optionBtn} onClick={() => handleOption(o)}>{o}</button>
                    ))}
                  </div>
                </div>
              )}
              {m.type === 'tripTalks' && m.posts && (
                <div className={styles.tripTalkCards}>
                  {m.posts.map((p) => (
                    <button key={p.id} className={styles.tripTalkCard} onClick={() => { onViewPost?.(p); onClose() }}>
                      {p.thumbnailUrl && <img className={styles.tripTalkThumb} src={p.thumbnailUrl} alt="" />}
                      <div className={styles.tripTalkInfo}>
                        <div className={styles.tripTalkTitle}>{p.title}</div>
                        <div className={styles.tripTalkMeta}>{p.category} {'·'} {'좋아요'} {p.likeCount}</div>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
          <div ref={bottomRef} />
        </div>
        <div className={styles.inputBar}>
          <input
            className={styles.input}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onCompositionStart={() => { composing.current = true }}
            onCompositionEnd={() => { composing.current = false }}
            onKeyDown={(e) => { if (e.key === 'Enter' && !composing.current) handleSend() }}
            placeholder={'여행지나 원하는 스타일을 입력해보세요'}
            autoFocus
            disabled={isLoading}
          />
          <button className={styles.sendBtn} onClick={handleSend} disabled={isLoading}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M3 10l14-7-7 14v-7H3z" fill="var(--color-primary-500)" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}
