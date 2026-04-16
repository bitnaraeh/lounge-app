import { useState, useEffect } from 'react'
import type { TripTalk } from '../data/tripTalks'

interface ApiTripTalk {
  id: number
  title: string
  body: string
  category: string
  region: string
  hotelName: string
  thumbnailUrl: string
  imageUrls: string[]
  likeCount: number
  commentCount: number
  bookmarkCount: number
  createdDate: string
}

function toRelativeTime(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime()
  const minutes = Math.floor(diff / 60000)
  if (minutes < 1) return '방금 전'
  if (minutes < 60) return `${minutes}분 전`
  const hours = Math.floor(minutes / 60)
  if (hours < 24) return `${hours}시간 전`
  const days = Math.floor(hours / 24)
  return `${days}일 전`
}

function toTripTalk(row: ApiTripTalk, index: number): TripTalk {
  return {
    id: row.id,
    userName: `user_${row.id}`,
    avatarUrl: `https://i.pravatar.cc/80?img=${(index % 70) + 1}`,
    timeAgo: toRelativeTime(row.createdDate),
    category: row.category,
    region: row.region,
    title: row.title,
    body: row.body,
    fullBody: row.body,
    thumbnailUrl: row.thumbnailUrl,
    imageUrl: row.imageUrls?.[0] || row.thumbnailUrl,
    hotelName: row.hotelName,
    showBtozpick: false,
    showRealbook: false,
    likeCount: row.likeCount,
    commentCount: row.commentCount,
    bookmarkCount: row.bookmarkCount,
    comments: [],
  }
}

export function useTripTalks(category?: string, city?: string) {
  const [talks, setTalks] = useState<TripTalk[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const params = new URLSearchParams({ limit: '30' })
    if (category) params.set('category', category)
    if (city) params.set('city', city)

    fetch(`/api/trip-talks?${params}`)
      .then((r) => r.json())
      .then((json) => {
        if (json.success) {
          setTalks(json.data.map(toTripTalk))
        } else {
          setError(json.error)
        }
      })
      .catch((e) => setError(String(e)))
      .finally(() => setLoading(false))
  }, [category, city])

  return { talks, loading, error }
}
