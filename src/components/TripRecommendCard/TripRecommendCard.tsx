import styles from './TripRecommendCard.module.css'
import { tripTalks, type TripTalk, type Reservation, getDday } from '../../data/tripTalks'

const MIN_POSTS = 1

interface TripRecommendCardProps {
  reservation: Reservation
  onDismiss: (id: string) => void
  onHideToday: (id: string) => void
  onMore: (city: string) => void
  onPostClick: (post: TripTalk) => void
}

export default function TripRecommendCard({ reservation, onDismiss, onHideToday, onMore, onPostClick }: TripRecommendCardProps) {
  const { segment, city, hasWrittenReview } = reservation

  // 해당 지역 트립톡 필터 (댓글+좋아요 가중치 정렬)
  const cityPosts = tripTalks
    .filter((p) => p.region === city)
    .sort((a, b) => (b.commentCount + b.likeCount) - (a.commentCount + a.likeCount))

  // 궁금해요 글 (답변 유도용)
  const questionPosts = tripTalks
    .filter((p) => p.region === city && p.category === '궁금해요')

  // ── 답변 유도 카드 (체크아웃 후 + 후기 작성 완료 + 궁금해요 1건 이상) ──
  if (segment === 'post-checkout' && hasWrittenReview && questionPosts.length >= 1) {
    return (
      <div className={styles.answerCard}>
        <div className={styles.header}>
          <div className={styles.titleRow}>
            <span className={styles.answerBadge}>💬 답변 요청</span>
            <span className={styles.title}>
              {city}에 대해 궁금한 분이 있어요
            </span>
          </div>
          <button className={styles.closeBtn} onClick={() => onDismiss(reservation.id)} aria-label="닫기">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
        </div>
        <div className={styles.questionCount}>미답변 질문 {questionPosts.length}건</div>
        <div className={styles.footer}>
          <button className={styles.moreBtn} onClick={() => onMore(city)}>
            궁금해요 글 보러가기 →
          </button>
        </div>
        <button className={styles.hideTodayBtn} onClick={() => onHideToday(reservation.id)}>
          오늘 하루 보지 않기
        </button>
      </div>
    )
  }

  // ── 여행 준비 카드 (체크인 전 / 투숙 중) ──
  if ((segment === 'pre-checkin' || segment === 'staying') && cityPosts.length >= MIN_POSTS) {
    const dday = getDday(reservation.checkInDate)
    const ddayLabel = segment === 'staying' ? '투숙 중' : `D-${dday}`
    const top3 = cityPosts.slice(0, 3)

    return (
      <div className={styles.card}>
        <div className={styles.header}>
          <div className={styles.titleRow}>
            <span className={styles.emoji}>{segment === 'staying' ? '🏨' : '🧳'}</span>
            <span className={styles.title}>{city} 여행</span>
            <span className={styles.dday}>{ddayLabel}</span>
          </div>
          <button className={styles.closeBtn} onClick={() => onDismiss(reservation.id)} aria-label="닫기">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
        </div>
        <div className={styles.subtitle}>
          {reservation.hotelName} · {city} 관련 트립톡 {cityPosts.length}건
        </div>
        <div className={styles.miniCards}>
          {top3.map((post) => (
            <button key={post.id} className={styles.miniCard} onClick={() => onPostClick(post)}>
              <img className={styles.miniThumb} src={post.thumbnailUrl} alt="" />
              <div className={styles.miniInfo}>
                <div className={styles.miniTitle}>{post.title}</div>
                <div className={styles.miniMeta}>{post.category} · {post.commentCount} comments</div>
              </div>
            </button>
          ))}
        </div>
        <div className={styles.footer}>
          <button className={styles.moreBtn} onClick={() => onMore(city)}>
            {city} 트립톡 더보기 →
          </button>
        </div>
        <button className={styles.hideTodayBtn} onClick={() => onHideToday(reservation.id)}>
          오늘 하루 보지 않기
        </button>
      </div>
    )
  }

  return null
}
