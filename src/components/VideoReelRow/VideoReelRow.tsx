import { useState, useEffect, useRef, useCallback } from 'react'
import styles from './VideoReelRow.module.css'

interface VideoItem {
  id: number
  caption: string
  hotelName: string
  videoUrl: string
  thumbnailUrl: string
}

interface VideoReelRowProps {
  city: string
  label?: string
}

export default function VideoReelRow({ city, label }: VideoReelRowProps) {
  const [videos, setVideos] = useState<VideoItem[]>([])
  const [activeIdx, setActiveIdx] = useState<number | null>(null)
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([])
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])
  const scrollRef = useRef<HTMLDivElement>(null)
  const wrapRef = useRef<HTMLDivElement>(null)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const autoRef = useRef(false) // 자동재생 진행 중 여부

  useEffect(() => {
    fetch(`/api/videos?city=${encodeURIComponent(city)}&limit=5`)
      .then((r) => r.json())
      .then((json) => { if (json.success) setVideos(json.data) })
  }, [city])

  const stopAll = useCallback(() => {
    videoRefs.current.forEach((el) => { if (el) { el.pause(); el.currentTime = 0 } })
    setActiveIdx(null)
    if (timerRef.current) clearTimeout(timerRef.current)
    autoRef.current = false
  }, [])

  const playAt = useCallback((idx: number, vidList: VideoItem[]) => {
    if (vidList.length === 0) return
    const nextIdx = idx % vidList.length
    // 모든 영상 정지
    videoRefs.current.forEach((el, i) => {
      if (i !== nextIdx && el) { el.pause(); el.currentTime = 0 }
    })
    // 해당 카드로 스크롤
    cardRefs.current[nextIdx]?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' })

    const el = videoRefs.current[nextIdx]
    if (el) {
      el.currentTime = 0
      el.play().catch(() => {})
    }
    setActiveIdx(nextIdx)

    // 3초 후 다음 (마지막이면 0으로 돌아감)
    timerRef.current = setTimeout(() => {
      if (autoRef.current) playAt(nextIdx + 1, vidList)
    }, 3000)
  }, [stopAll])

  const startAutoPlay = useCallback((vidList: VideoItem[]) => {
    if (autoRef.current || vidList.length === 0) return
    autoRef.current = true
    playAt(0, vidList)
  }, [playAt])

  // IntersectionObserver: 화면에 들어오면 자동재생 시작, 나가면 정지
  useEffect(() => {
    if (videos.length === 0) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          startAutoPlay(videos)
        } else {
          stopAll()
        }
      },
      { threshold: 0.5 }
    )
    if (wrapRef.current) observer.observe(wrapRef.current)
    return () => { observer.disconnect(); stopAll() }
  }, [videos, startAutoPlay, stopAll])

  const handleCardClick = (idx: number) => {
    const el = videoRefs.current[idx]
    if (!el) return
    if (el.paused) {
      // 수동 재생: 자동재생 중단하고 해당 영상만 재생
      stopAll()
      el.play().catch(() => {})
      setActiveIdx(idx)
    } else {
      el.pause()
      setActiveIdx(null)
    }
  }

  if (videos.length === 0) return null

  return (
    <div ref={wrapRef} className={styles.wrap}>
      <div className={styles.labelRow}>
        <span className={styles.labelIcon}>{'▶'}</span>
        <span className={styles.labelText}>{label || `${city} 추천 영상`}</span>
      </div>
      <div ref={scrollRef} className={styles.inner}>
        <div className={styles.scroll}>
        {videos.map((v, i) => (
          <div
            key={v.id}
            ref={(el) => { cardRefs.current[i] = el }}
            className={styles.card}
            onClick={() => handleCardClick(i)}
          >
            <div className={styles.videoWrap}>
              <video
                ref={(el) => { videoRefs.current[i] = el }}
                className={styles.video}
                src={v.videoUrl}
                poster={v.thumbnailUrl}
                playsInline
                muted
              />
              {activeIdx !== i && (
                <div className={styles.playOverlay}>
                  <div className={styles.playBtn}>
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                      <path d="M5 3l11 6-11 6V3z" fill="white" />
                    </svg>
                  </div>
                </div>
              )}
              {activeIdx === i && (
                <div className={styles.progressBar}>
                  <div className={styles.progressFill} />
                </div>
              )}
            </div>
            <div className={styles.info}>
              {v.hotelName && <div className={styles.hotel}>{v.hotelName}</div>}
              {v.caption && <div className={styles.caption}>{v.caption}</div>}
            </div>
          </div>
        ))}
        </div>
      </div>
    </div>
  )
}
