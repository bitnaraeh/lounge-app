import { useState, useCallback, useRef } from 'react'
import styles from '../LoungePage/LoungePage.module.css'
import myStyles from './LoungePageV2.module.css'
import StatusBar from '../StatusBar/StatusBar'
import NavigationBarV2 from '../NavigationBarV2/NavigationBarV2'
import CategoryTabBar from '../CategoryTabBar/CategoryTabBar'
import Notice from '../Notice/Notice'
import RealbookFilter from '../RealbookFilter/RealbookFilter'
import PostCard from '../PostCard/PostCard'
import TripTalkDetailV2 from '../TripTalkDetailV2/TripTalkDetailV2'
import VideoReelRow from '../VideoReelRow/VideoReelRow'
import FAB from '../FAB/FAB'
import UploadSheet from '../BottomSheet/UploadSheet'
import TripTalkEditor from '../TripTalkEditor/TripTalkEditor'
import SearchPage from '../SearchPage/SearchPage'
import { myReservations, getDday, type TripTalk } from '../../data/tripTalks'
import { useTripTalks } from '../../hooks/useTripTalks'

const REGION_MAP: Record<string, string> = {
  '\u{C81C}\u{C8FC}\u{D2B9}\u{BCC4}\u{C790}\u{CE58}\u{B3C4}': '\u{B300}\u{D55C}\u{BBFC}\u{AD6D}',
  '\u{C11C}\u{C6B8}\u{D2B9}\u{BCC4}\u{C2DC}': '\u{B300}\u{D55C}\u{BBFC}\u{AD6D}',
  '\u{BD80}\u{C0B0}\u{AD11}\u{C5ED}\u{C2DC}': '\u{B300}\u{D55C}\u{BBFC}\u{AD6D}',
  '\u{C624}\u{C0AC}\u{CE74}': '\u{C77C}\u{BCF8}',
  '\u{B3C4}\u{CFC4}': '\u{C77C}\u{BCF8}',
  '\u{D6C4}\u{CFE0}\u{C624}\u{CE74}': '\u{C77C}\u{BCF8}',
  '\u{BC29}\u{CF55}': '\u{D0DC}\u{AD6D}',
  '\u{B2E4}\u{B0AD}': '\u{BCA0}\u{D2B8}\u{B0A8}',
  '\u{BC1C}\u{B9AC}': '\u{ADF8}\u{C678} \u{AD6D}\u{AC00}',
  '\u{C0C1}\u{D558}\u{C774}': '\u{C911}\u{AD6D}',
}

const HOT_CITY = '\u{C0C1}\u{D558}\u{C774}'

interface LoungePageV2Props {
  simulateNoReservation?: boolean
}

export default function LoungePageV2({ simulateNoReservation = false }: LoungePageV2Props) {
  const reservations = simulateNoReservation ? [] : myReservations

  const upcomingReservation = [...reservations]
    .filter((r) => r.segment === 'pre-checkin')
    .sort((a, b) => getDday(a.checkInDate) - getDday(b.checkInDate))[0] || null

  const hasReservation = !!upcomingReservation
  const defaultTab = hasReservation ? 'myTrip' as const : 'lounge' as const

  const [mainTab, setMainTab] = useState<'lounge' | 'myTrip'>(defaultTab)
  const [activeCategory, setActiveCategory] = useState('\u{C219}\u{C18C}\u{D6C4}\u{AE30}')
  const [activeRegion, setActiveRegion] = useState('\u{C804}\u{CCB4}')
  const [realbookOnly, setRealbookOnly] = useState(false)
  const [selectedPost, setSelectedPost] = useState<TripTalk | null>(null)
  const [showUploadSheet, setShowUploadSheet] = useState(false)
  const [showEditor, setShowEditor] = useState(false)
  const [showSearch, setShowSearch] = useState(false)
  const [navHidden, setNavHidden] = useState(false)
  const lastScrollY = useRef(0)

  const isMyTrip = mainTab === 'myTrip'
  const showRealbookCheckbox = !isMyTrip && activeCategory === '\u{C219}\u{C18C}\u{D6C4}\u{AE30}'
  const myTripCity = hasReservation ? upcomingReservation!.city : HOT_CITY

  const { talks, loading } = useTripTalks(
    undefined,
    isMyTrip ? myTripCity : undefined
  )

  const filteredPosts = talks.filter((post) => {
    if (isMyTrip) return true
    if (activeCategory === '\u{BE44}\u{D1A0}\u{C988}\u{D53D}') {
      if (!post.showBtozpick) return false
    } else if (post.category !== activeCategory) return false
    if (activeRegion !== '\u{C804}\u{CCB4}' && activeCategory !== '\u{C77C}\u{C0C1}\u{C218}\u{B2E4}') {
      const postCountry = REGION_MAP[post.region] || post.region
      if (postCountry !== activeRegion) return false
    }
    if (realbookOnly && showRealbookCheckbox && !post.showRealbook) return false
    return true
  })

  const handleScroll = useCallback((e: React.UIEvent<HTMLDivElement>) => {
    const y = e.currentTarget.scrollTop
    setNavHidden(y > lastScrollY.current && y > 48)
    lastScrollY.current = y
  }, [])

  const handleMainTabChange = useCallback((tab: 'lounge' | 'myTrip') => {
    setMainTab(tab)
    setActiveRegion('\u{C804}\u{CCB4}')
  }, [])

  const handleCategoryChange = useCallback((cat: string) => {
    setActiveCategory(cat)
    setActiveRegion('\u{C804}\u{CCB4}')
  }, [])

  if (showSearch) return <SearchPage onBack={() => setShowSearch(false)} />
  if (showEditor) return <TripTalkEditor onClose={() => setShowEditor(false)} />
  if (selectedPost) return <TripTalkDetailV2 post={selectedPost} onBack={() => setSelectedPost(null)} />

  return (
    <div className={styles.page}>
      <StatusBar />
      <NavigationBarV2
        onSearch={() => setShowSearch(true)}
        activeMainTab={mainTab}
        onMainTabChange={handleMainTabChange}
        hasReservation={hasReservation}
        hidden={navHidden}
      />
      <div className={styles.scrollArea} onScroll={handleScroll}>
        {isMyTrip ? (
          <>
            <div className={myStyles.ddayHeader}>
              <span className={myStyles.ddayEmoji}>{hasReservation ? '\u{D83E}\u{DDF3}' : '\u{2708}\u{FE0F}'}</span>
              <div className={myStyles.ddayTextWrap}>
                {hasReservation ? (
                  <span className={myStyles.ddayTitle}>
                    {upcomingReservation!.city} {'\u{C5EC}\u{D589}'} <span className={myStyles.ddayBadge}>D-{getDday(upcomingReservation!.checkInDate)}</span>
                  </span>
                ) : (
                  <span className={myStyles.ddayTitle}>
                    {'\u{C694}\u{C998} \u{D56B}\u{D55C}'} {HOT_CITY} {'\u{C5EC}\u{D589} \u{ACC4}\u{D68D}\u{C744} \u{C138}\u{C6CC}\u{BCF4}\u{B294} \u{AC74} \u{C5B4}\u{B54C}\u{C694}?'}
                  </span>
                )}
                {hasReservation && (
                  <span className={myStyles.ddaySub}>{upcomingReservation!.hotelName}</span>
                )}
              </div>
            </div>
            <div className={styles.feed}>
              {loading ? (
                <div style={{ padding: '40px 16px', textAlign: 'center', color: '#999', fontSize: 14 }}>불러오는 중...</div>
              ) : filteredPosts.flatMap((post, i) => {
                const cards = [<PostCard key={post.id} userName={post.userName} timeAgo={post.timeAgo} category={post.category} region={post.region} title={post.title} body={post.body} thumbnailUrl={post.thumbnailUrl} hotelName={post.hotelName} showBtozpick={post.showBtozpick} showRealbook={post.showRealbook} likeCount={post.likeCount} commentCount={post.commentCount} bookmarkCount={post.bookmarkCount} avatarUrl={post.avatarUrl} onClick={() => setSelectedPost(post)} />]
                if ((i + 1) % 3 === 0) cards.push(<VideoReelRow key={`vr-${i}`} city={myTripCity} />)
                return cards
              })}
            </div>
          </>
        ) : (
          <>
            <CategoryTabBar activeCategory={activeCategory} onCategoryChange={handleCategoryChange} activeRegion={activeRegion} onRegionChange={setActiveRegion} showRegionBar={activeCategory !== '\u{C77C}\u{C0C1}\u{C218}\u{B2E4}'} />
            <Notice />
            {showRealbookCheckbox && <RealbookFilter checked={realbookOnly} onChange={setRealbookOnly} />}
            <div className={styles.feed}>
              {loading ? (
                <div style={{ padding: '40px 16px', textAlign: 'center', color: '#999', fontSize: 14 }}>불러오는 중...</div>
              ) : filteredPosts.flatMap((post, i) => {
                const videoCity = activeRegion !== '전체' ? activeRegion : null
                const cards = [<PostCard key={post.id} userName={post.userName} timeAgo={post.timeAgo} category={post.category} region={post.region} title={post.title} body={post.body} thumbnailUrl={post.thumbnailUrl} hotelName={post.hotelName} showBtozpick={post.showBtozpick} showRealbook={post.showRealbook} likeCount={post.likeCount} commentCount={post.commentCount} bookmarkCount={post.bookmarkCount} avatarUrl={post.avatarUrl} onClick={() => setSelectedPost(post)} />]
                if ((i + 1) % 3 === 0 && videoCity) cards.push(<VideoReelRow key={`vr-${i}`} city={videoCity} />)
                return cards
              })}
            </div>
          </>
        )}
      </div>
      {!isMyTrip && <FAB onClick={() => setShowUploadSheet(true)} />}
      {showUploadSheet && (
        <UploadSheet onClose={() => setShowUploadSheet(false)} onTripTalk={() => { setShowUploadSheet(false); setShowEditor(true) }} />
      )}
    </div>
  )
}
