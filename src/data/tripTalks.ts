export interface TripTalk {
  id: number
  userName: string
  timeAgo: string
  category: string
  region: string
  title: string
  body: string
  fullBody: string
  thumbnailUrl: string
  imageUrl: string
  hotelName: string
  showBtozpick: boolean
  showRealbook: boolean
  likeCount: number
  commentCount: number
  bookmarkCount: number
  avatarUrl: string
  comments: Comment[]
}

export interface Comment {
  id: number
  userName: string
  timeAgo: string
  body: string
  likeCount: number
  isLiked: boolean
  isMine: boolean
  replies?: Comment[]
}

const AVATARS = [
  'https://i.pravatar.cc/80?img=5',
  'https://i.pravatar.cc/80?img=12',
  'https://i.pravatar.cc/80?img=23',
  'https://i.pravatar.cc/80?img=33',
  'https://i.pravatar.cc/80?img=47',
  'https://i.pravatar.cc/80?img=52',
]

export const tripTalks: TripTalk[] = [
  {
    id: 1,
    userName: 'travel_jisu',
    timeAgo: '1시간전',
    category: '숙소후기',
    region: '제주특별자치도',
    title: '제주신라호텔 오션뷰 최고였어요',
    body: '바닷가 전망이 훌륭한 가족 호텔. 근처 관광지와도 가까워 걸어다니며 주요 관광지를 돌아볼 수 있는 위치가 매력적이에요.',
    fullBody: '바닷가 전망이 훌륭한 가족 호텔. 근처 관광지와도 가까워 걸어다니며 주요 관광지를 돌아볼 수 있는 위치가 매력적이에요. 특히 아이들과 놀 수 있는 다양한 시설이 있어요! 조식 뷔페도 종류가 다양하고 맛있었습니다. 수영장은 인피니티풀이라 바다와 이어지는 느낌이 정말 좋았어요.',
    thumbnailUrl: 'https://picsum.photos/seed/jeju1/160/160',
    imageUrl: 'https://picsum.photos/seed/jeju1/375/343',
    hotelName: '제주신라호텔',
    showBtozpick: true,
    showRealbook: true,
    likeCount: 24,
    commentCount: 8,
    bookmarkCount: 12,
    avatarUrl: AVATARS[0],
    comments: [
      { id: 1, userName: 'ocean_lover', timeAgo: '30분전', body: '저도 지난달에 다녀왔는데 정말 좋았어요! 오션뷰 방 추천합니다.', likeCount: 2, isLiked: true, isMine: false },
      { id: 2, userName: 'jeju_mama', timeAgo: '45분전', body: '아이들이랑 가기 좋은 곳이군요. 참고할게요!', likeCount: 0, isLiked: false, isMine: false },
      { id: 3, userName: 'travel_jisu', timeAgo: '20분전', body: '네 정말 추천드려요~ 특히 키즈풀이 잘 되어있어요.', likeCount: 1, isLiked: false, isMine: true },
    ],
  },
  {
    id: 2,
    userName: 'osaka_holic',
    timeAgo: '3시간전',
    category: '숙소후기',
    region: '오사카',
    title: '오사카 신라 호텔 추천해요',
    body: '이번에 친구와 오사카 여행을 다녀왔어요~ 위치도 좋고 직원분들도 친절하셔서 너무 만족스러웠습니다.',
    fullBody: '이번에 친구와 오사카 여행을 다녀왔어요~ 위치도 좋고 직원분들도 친절하셔서 너무 만족스러웠습니다. 난바역에서 도보 5분 거리라 쇼핑하기도 편했고, 조식도 한식/양식/일식 다 있어서 좋았어요. 방도 깨끗하고 넓어서 짐 풀기 편했습니다.',
    thumbnailUrl: 'https://picsum.photos/seed/osaka1/160/160',
    imageUrl: 'https://picsum.photos/seed/osaka1/375/343',
    hotelName: '오사카 신라호텔',
    showBtozpick: true,
    showRealbook: true,
    likeCount: 15,
    commentCount: 3,
    bookmarkCount: 7,
    avatarUrl: AVATARS[1],
    comments: [
      { id: 4, userName: 'japan_trip', timeAgo: '2시간전', body: '오사카 갈 때 참고할게요! 가격대는 어느 정도인가요?', likeCount: 0, isLiked: false, isMine: false },
      { id: 5, userName: 'osaka_holic', timeAgo: '1시간전', body: '1박에 20만원대였어요. 시즌에 따라 다를 수 있어요!', likeCount: 1, isLiked: false, isMine: true },
    ],
  },
  {
    id: 3,
    userName: 'backpacker_kim',
    timeAgo: '5시간전',
    category: '궁금해요',
    region: '방콕',
    title: '방콕 카오산로드 근처 숙소 추천해주세요',
    body: '다음 주에 방콕 가는데 카오산로드 근처 가성비 좋은 숙소 있을까요? 혼자 여행이라 안전한 곳이면 좋겠어요.',
    fullBody: '다음 주에 방콕 가는데 카오산로드 근처 가성비 좋은 숙소 있을까요? 혼자 여행이라 안전한 곳이면 좋겠어요. 예산은 1박 5만원 이하로 생각하고 있고, 깨끗하고 와이파이 잘 되는 곳이면 좋겠습니다. 경험 있으신 분들 추천 부탁드려요!',
    thumbnailUrl: 'https://picsum.photos/seed/bangkok1/160/160',
    imageUrl: 'https://picsum.photos/seed/bangkok1/375/343',
    hotelName: '',
    showBtozpick: false,
    showRealbook: false,
    likeCount: 8,
    commentCount: 12,
    bookmarkCount: 3,
    avatarUrl: AVATARS[2],
    comments: [
      { id: 6, userName: 'thai_expert', timeAgo: '4시간전', body: '람부뜨리 빌리지 호텔 추천해요! 카오산로드 바로 옆인데 조용하고 깨끗해요.', likeCount: 5, isLiked: true, isMine: false },
      { id: 7, userName: 'solo_traveler', timeAgo: '3시간전', body: '저는 NapPark Hostel 갔었는데 시설 좋고 혼자 여행하기 좋았어요.', likeCount: 3, isLiked: false, isMine: false },
    ],
  },
  {
    id: 4,
    userName: 'couple_trip',
    timeAgo: '8시간전',
    category: '여행후기',
    region: '다낭',
    title: '다낭 바나힐 꼭 가보세요!',
    body: '골든브릿지 실물로 보니까 진짜 감동이었어요. 날씨가 좋으면 사진도 예쁘게 나와요. 케이블카 타는 것도 재밌었어요.',
    fullBody: '골든브릿지 실물로 보니까 진짜 감동이었어요. 날씨가 좋으면 사진도 예쁘게 나와요. 케이블카 타는 것도 재밌었어요. 바나힐 안에 놀이공원도 있어서 하루 종일 놀 수 있어요. 점심은 뷔페가 있는데 가격 대비 괜찮았습니다. 오전에 일찍 가는 걸 추천해요!',
    thumbnailUrl: 'https://picsum.photos/seed/danang1/160/160',
    imageUrl: 'https://picsum.photos/seed/danang1/375/343',
    hotelName: '인터컨티넨탈 다낭',
    showBtozpick: false,
    showRealbook: true,
    likeCount: 42,
    commentCount: 15,
    bookmarkCount: 28,
    avatarUrl: AVATARS[3],
    comments: [
      { id: 8, userName: 'vietnam_fan', timeAgo: '7시간전', body: '바나힐 입장료가 얼마인가요?', likeCount: 0, isLiked: false, isMine: false },
      { id: 9, userName: 'couple_trip', timeAgo: '6시간전', body: '성인 기준 약 3만원 정도였어요!', likeCount: 2, isLiked: false, isMine: true },
    ],
  },
  {
    id: 5,
    userName: 'foodie_yuna',
    timeAgo: '12시간전',
    category: '일상수다',
    region: '서울특별시',
    title: '여행 준비하면서 설레는 중',
    body: '다음 달 도쿄 여행 준비하고 있는데 벌써부터 설레요~ 맛집 리스트 만드는 중인데 추천 있으신 분?',
    fullBody: '다음 달 도쿄 여행 준비하고 있는데 벌써부터 설레요~ 맛집 리스트 만드는 중인데 추천 있으신 분? 시부야, 신주쿠, 아사쿠사 쪽으로 돌아볼 예정이에요. 라멘, 스시, 야키니쿠 다 좋아해요. 현지인 맛집 아시는 분 공유해주세요!',
    thumbnailUrl: 'https://picsum.photos/seed/tokyo1/160/160',
    imageUrl: 'https://picsum.photos/seed/tokyo1/375/343',
    hotelName: '',
    showBtozpick: false,
    showRealbook: false,
    likeCount: 19,
    commentCount: 22,
    bookmarkCount: 5,
    avatarUrl: AVATARS[4],
    comments: [
      { id: 10, userName: 'tokyo_master', timeAgo: '11시간전', body: '이치란 라멘은 꼭 가보세요! 시부야점 추천합니다.', likeCount: 4, isLiked: true, isMine: false },
    ],
  },
  {
    id: 7,
    userName: 'namba_walker',
    timeAgo: '2\uC2DC\uAC04\uC804',
    category: '\uC5EC\uD589\uD6C4\uAE30',
    region: '\uC624\uC0AC\uCE74',
    title: '\uC624\uC0AC\uCE74 \uB09C\uBC14 \uBA39\uBC29 \uCF54\uC2A4 \uCD94\uCC9C',
    body: '\uB09C\uBC14\uC5ED \uC8FC\uBCC0 \uBA39\uBC29 \uCF54\uC2A4 \uB2E4\uB140\uC654\uC5B4\uC694. \uD0C0\uCF54\uC57C\uD0A4 \u2192 \uC774\uCE58\uB780\uB77C\uBA58 \u2192 \uB9AC\uCFE0\uB85C \uC624\uC9C0\uC0B0 \uCF54\uC2A4\uB85C \uB3CC\uC558\uB294\uB370 \uB2E4 \uB9DB\uC788\uC5C8\uC5B4\uC694!',
    fullBody: '\uB09C\uBC14\uC5ED \uC8FC\uBCC0 \uBA39\uBC29 \uCF54\uC2A4 \uB2E4\uB140\uC654\uC5B4\uC694. \uD0C0\uCF54\uC57C\uD0A4 \u2192 \uC774\uCE58\uB780\uB77C\uBA58 \u2192 \uB9AC\uCFE0\uB85C \uC624\uC9C0\uC0B0 \uCF54\uC2A4\uB85C \uB3CC\uC558\uB294\uB370 \uB2E4 \uB9DB\uC788\uC5C8\uC5B4\uC694! \uD0C0\uCF54\uC57C\uD0A4\uB294 \uC904\uC774 \uAE38\uC5B4\uC11C 30\uBD84 \uAE30\uB2E4\uB838\uC9C0\uB9CC \uADF8\uB9CC\uD55C \uAC00\uCE58\uAC00 \uC788\uC5C8\uC5B4\uC694.',
    thumbnailUrl: 'https://picsum.photos/seed/osaka2/160/160',
    imageUrl: 'https://picsum.photos/seed/osaka2/375/343',
    hotelName: '\uC624\uC0AC\uCE74 \uC2E0\uB77C\uD638\uD154',
    showBtozpick: false,
    showRealbook: true,
    likeCount: 31,
    commentCount: 7,
    bookmarkCount: 18,
    avatarUrl: AVATARS[2],
    comments: [
      { id: 20, userName: 'foodie_99', timeAgo: '1\uC2DC\uAC04\uC804', body: '\uD0C0\uCF54\uC57C\uD0A4 \uC5B4\uB290 \uC9C0\uC810\uC774\uC5D0\uC694?', likeCount: 1, isLiked: false, isMine: false },
    ],
  },
  {
    id: 8,
    userName: 'osaka_mama',
    timeAgo: '4\uC2DC\uAC04\uC804',
    category: '\uAD81\uAE08\uD574\uC694',
    region: '\uC624\uC0AC\uCE74',
    title: '\uC624\uC0AC\uCE74 \uC720\uB2C8\uBC84\uC15C \uC2A4\uD29C\uB514\uC624 \uD301 \uC788\uC744\uAE4C\uC694?',
    body: '\uC544\uC774\uB791 \uAC19\uC774 \uAC00\uB294\uB370 \uD6A8\uC728\uC801\uC73C\uB85C \uB3CC \uC218 \uC788\uB294 \uBC29\uBC95\uC774 \uAD81\uAE08\uD574\uC694. \uC775\uC2A4\uD504\uB808\uC2A4 \uD328\uC2A4 \uC0AC\uC57C \uD558\uB098\uC694?',
    fullBody: '\uC544\uC774\uB791 \uAC19\uC774 \uAC00\uB294\uB370 \uD6A8\uC728\uC801\uC73C\uB85C \uB3CC \uC218 \uC788\uB294 \uBC29\uBC95\uC774 \uAD81\uAE08\uD574\uC694. \uC775\uC2A4\uD504\uB808\uC2A4 \uD328\uC2A4 \uC0AC\uC57C \uD558\uB098\uC694? \uC544\uC774\uAC00 5\uC0B4\uC778\uB370 \uD0C8 \uC218 \uC788\uB294 \uB180\uC774\uAE30\uAD6C\uAC00 \uB9CE\uC744\uC9C0 \uAC71\uC815\uC774\uC5D0\uC694.',
    thumbnailUrl: 'https://picsum.photos/seed/osaka3/160/160',
    imageUrl: 'https://picsum.photos/seed/osaka3/375/343',
    hotelName: '',
    showBtozpick: false,
    showRealbook: false,
    likeCount: 12,
    commentCount: 9,
    bookmarkCount: 4,
    avatarUrl: AVATARS[4],
    comments: [
      { id: 21, userName: 'usj_fan', timeAgo: '3\uC2DC\uAC04\uC804', body: '\uC775\uC2A4\uD504\uB808\uC2A4 \uD328\uC2A4 \uAF2D \uC0AC\uC138\uC694! \uB300\uAE30\uC2DC\uAC04 \uBC18\uC73C\uB85C \uC904\uC5B4\uC694.', likeCount: 3, isLiked: true, isMine: false },
    ],
  },
  {
    id: 9,
    userName: 'dotonbori_night',
    timeAgo: '6\uC2DC\uAC04\uC804',
    category: '\uC219\uC18C\uD6C4\uAE30',
    region: '\uC624\uC0AC\uCE74',
    title: '\uB3C4\uD1A4\uBCF4\uB9AC \uC55E \uD638\uD154 \uC704\uCE58 \uB300\uBC15',
    body: '\uB3C4\uD1A4\uBCF4\uB9AC \uBC14\uB85C \uC55E\uC774\uB77C \uBC24\uC5D0 \uB098\uAC00\uC11C \uAD6C\uACBD\uD558\uAE30 \uB108\uBB34 \uC88B\uC558\uC5B4\uC694. \uAE00\uB9AC\uCF54 \uAC04\uD310 \uBCF4\uBA74\uC11C \uD0C0\uCF54\uC57C\uD0A4 \uBA39\uC740 \uBC24!',
    fullBody: '\uB3C4\uD1A4\uBCF4\uB9AC \uBC14\uB85C \uC55E\uC774\uB77C \uBC24\uC5D0 \uB098\uAC00\uC11C \uAD6C\uACBD\uD558\uAE30 \uB108\uBB34 \uC88B\uC558\uC5B4\uC694. \uAE00\uB9AC\uCF54 \uAC04\uD310 \uBCF4\uBA74\uC11C \uD0C0\uCF54\uC57C\uD0A4 \uBA39\uC740 \uBC24! \uD638\uD154 \uC790\uCCB4\uB3C4 \uAE68\uB057\uD558\uACE0 \uC870\uC2DD\uC774 \uD2B9\uD788 \uB9DB\uC788\uC5C8\uC5B4\uC694. \uC77C\uBCF8\uC2DD \uC870\uC2DD \uAF2D \uB4DC\uC138\uC694.',
    thumbnailUrl: 'https://picsum.photos/seed/osaka4/160/160',
    imageUrl: 'https://picsum.photos/seed/osaka4/375/343',
    hotelName: '\uD638\uD154 \uBE44\uC2A4\uD0C0 \uB09C\uBC14',
    showBtozpick: true,
    showRealbook: true,
    likeCount: 28,
    commentCount: 5,
    bookmarkCount: 15,
    avatarUrl: AVATARS[0],
    comments: [
      { id: 22, userName: 'night_owl', timeAgo: '5\uC2DC\uAC04\uC804', body: '\uBC24 \uBD84\uC704\uAE30 \uC9C4\uC9DC \uC88B\uACA0\uB2E4!', likeCount: 2, isLiked: false, isMine: false },
    ],
  },
  {
    id: 10,
    userName: 'kansai_pro',
    timeAgo: '1\uC77C\uC804',
    category: '\uC5EC\uD589\uD6C4\uAE30',
    region: '\uC624\uC0AC\uCE74',
    title: '\uC624\uC0AC\uCE74 3\uBC15 4\uC77C \uC77C\uC815 \uACF5\uC720',
    body: '\uC624\uC0AC\uCE74 \uC5EC\uD589 \uC77C\uC815 \uACF5\uC720\uD569\uB2C8\uB2E4. 1\uC77C\uCC28 \uB09C\uBC14+\uC2E0\uC0AC\uC774\uBC14\uC2DC, 2\uC77C\uCC28 USJ, 3\uC77C\uCC28 \uAD50\uD1A0 \uB2F9\uC77C\uCE58\uAE30, 4\uC77C\uCC28 \uC2E0\uC0AC\uC774\uBC14\uC2DC+\uACF5\uD56D.',
    fullBody: '\uC624\uC0AC\uCE74 \uC5EC\uD589 \uC77C\uC815 \uACF5\uC720\uD569\uB2C8\uB2E4. 1\uC77C\uCC28 \uB09C\uBC14+\uC2E0\uC0AC\uC774\uBC14\uC2DC, 2\uC77C\uCC28 USJ, 3\uC77C\uCC28 \uAD50\uD1A0 \uB2F9\uC77C\uCE58\uAE30, 4\uC77C\uCC28 \uC2E0\uC0AC\uC774\uBC14\uC2DC+\uACF5\uD56D. \uAD50\uD1A0\uB294 \uD55C\uD050 \uD328\uC2A4\uB85C \uAC14\uB294\uB370 \uD3B8\uD558\uACE0 \uC88B\uC558\uC5B4\uC694.',
    thumbnailUrl: 'https://picsum.photos/seed/osaka5/160/160',
    imageUrl: 'https://picsum.photos/seed/osaka5/375/343',
    hotelName: '\uC624\uC0AC\uCE74 \uC2E0\uB77C\uD638\uD154',
    showBtozpick: false,
    showRealbook: false,
    likeCount: 45,
    commentCount: 11,
    bookmarkCount: 32,
    avatarUrl: AVATARS[3],
    comments: [
      { id: 23, userName: 'plan_lover', timeAgo: '20\uC2DC\uAC04\uC804', body: '\uAD50\uD1A0 \uB2F9\uC77C\uCE58\uAE30 \uC88B\uC740 \uC544\uC774\uB514\uC5B4\uB124\uC694!', likeCount: 4, isLiked: true, isMine: false },
    ],
  },
  {
    id: 6,
    userName: 'luxury_stay',
    timeAgo: '1일전',
    category: '숙소후기',
    region: '발리',
    title: '발리 풀빌라에서의 하루',
    body: '프라이빗 풀이 있는 빌라에서 하루 종일 쉬었어요. 석양 보면서 수영하는 건 정말 힐링 그 자체였습니다.',
    fullBody: '프라이빗 풀이 있는 빌라에서 하루 종일 쉬었어요. 석양 보면서 수영하는 건 정말 힐링 그 자체였습니다. 빌라 안에서 바베큐도 할 수 있고, 조식도 빌라로 가져다줘서 너무 편했어요. 우붓 쪽이라 자연 속에서 힐링하기 딱이에요.',
    thumbnailUrl: 'https://picsum.photos/seed/bali1/160/160',
    imageUrl: 'https://picsum.photos/seed/bali1/375/343',
    hotelName: '우붓 프라이빗 풀빌라',
    showBtozpick: true,
    showRealbook: false,
    likeCount: 56,
    commentCount: 9,
    bookmarkCount: 34,
    avatarUrl: AVATARS[5],
    comments: [
      { id: 11, userName: 'bali_dreamer', timeAgo: '20시간전', body: '가격이 궁금해요! 1박에 얼마 정도인가요?', likeCount: 1, isLiked: false, isMine: false },
      { id: 12, userName: 'luxury_stay', timeAgo: '18시간전', body: '1박 15만원 정도였어요. 성수기엔 좀 더 비쌀 수 있어요.', likeCount: 3, isLiked: false, isMine: true },
    ],
  },

  {
    id: 11,
    userName: 'shanghai_foodie',
    timeAgo: '2시간전',
    category: '숙소후기',
    region: '상하이',
    title: '와이탄 뷰 호텔 강력 추천',
    body: '와이탄 야경이 방에서 바로 보여요. 푸동 스카이라인이 한눈에 들어오는 뷰가 정말 압도적이었습니다.',
    fullBody: '와이탄 야경이 방에서 바로 보여요. 푸동 스카이라인이 한눈에 들어오는 뷰가 정말 압도적이었습니다. 조식도 중식/양식 다 있고, 직원분들 영어 소통도 잘 돼요. 난징동루까지 걸어서 10분이라 쇼핑하기도 편했어요.',
    thumbnailUrl: 'https://picsum.photos/seed/shanghai1/160/160',
    imageUrl: 'https://picsum.photos/seed/shanghai1/375/343',
    hotelName: '페어몬트 피스 호텔',
    showBtozpick: true,
    showRealbook: true,
    likeCount: 38,
    commentCount: 6,
    bookmarkCount: 22,
    avatarUrl: AVATARS[1],
    comments: [
      { id: 30, userName: 'china_lover', timeAgo: '1시간전', body: '와이탄 야경 진짜 최고죠! 가격대가 어떻게 되나요?', likeCount: 2, isLiked: false, isMine: false },
    ],
  },
  {
    id: 12,
    userName: 'dumpling_master',
    timeAgo: '5시간전',
    category: '여행후기',
    region: '상하이',
    title: '상하이 샤오롱바오 맛집 투어',
    body: '딘타이펑 본점부터 로컬 맛집까지 3곳 다녀왔어요. 가격도 저렴하고 맛은 서울에서 먹던 것과 차원이 달라요.',
    fullBody: '딘타이펑 본점부터 로컬 맛집까지 3곳 다녀왔어요. 가격도 저렴하고 맛은 서울에서 먹던 것과 차원이 달라요. 특히 난샹만터우뎬은 줄이 길지만 꼭 가볼 가치가 있어요. 위위안 근처라 관광도 같이 할 수 있어요.',
    thumbnailUrl: 'https://picsum.photos/seed/shanghai2/160/160',
    imageUrl: 'https://picsum.photos/seed/shanghai2/375/343',
    hotelName: '',
    showBtozpick: false,
    showRealbook: false,
    likeCount: 52,
    commentCount: 14,
    bookmarkCount: 30,
    avatarUrl: AVATARS[3],
    comments: [
      { id: 31, userName: 'food_trip', timeAgo: '4시간전', body: '난샹만터우뎬 대기시간이 얼마나 되나요?', likeCount: 1, isLiked: false, isMine: false },
    ],
  },
  {
    id: 13,
    userName: 'pudong_view',
    timeAgo: '8시간전',
    category: '궁금해요',
    region: '상하이',
    title: '상하이 디즈니랜드 팁 있나요?',
    body: '다음 주에 상하이 디즈니 가는데 효율적으로 도는 방법이 궁금해요. 프리미어 액세스 사야 하나요?',
    fullBody: '다음 주에 상하이 디즈니 가는데 효율적으로 도는 방법이 궁금해요. 프리미어 액세스 사야 하나요? 트론 라이트사이클 꼭 타고 싶은데 대기시간이 어느 정도인지도 알고 싶어요.',
    thumbnailUrl: 'https://picsum.photos/seed/shanghai3/160/160',
    imageUrl: 'https://picsum.photos/seed/shanghai3/375/343',
    hotelName: '',
    showBtozpick: false,
    showRealbook: false,
    likeCount: 15,
    commentCount: 8,
    bookmarkCount: 5,
    avatarUrl: AVATARS[5],
    comments: [
      { id: 32, userName: 'disney_fan', timeAgo: '7시간전', body: '프리미어 액세스 강추요! 트론은 2시간 넘게 기다려요.', likeCount: 3, isLiked: true, isMine: false },
    ],
  },
  {
    id: 14,
    userName: 'nanjinglu_walker',
    timeAgo: '1일전',
    category: '숙소후기',
    region: '상하이',
    title: '난징동루 근처 가성비 호텔',
    body: '1박 8만원대인데 위치가 너무 좋아요. 난징동루 보행거리 바로 옆이라 밤에 산책하기 딱이에요.',
    fullBody: '1박 8만원대인데 위치가 너무 좋아요. 난징동루 보행거리 바로 옆이라 밤에 산책하기 딱이에요. 방은 좀 작지만 깨끗하고, 지하철역도 도보 3분이라 이동이 편해요. 가성비 최고였습니다.',
    thumbnailUrl: 'https://picsum.photos/seed/shanghai4/160/160',
    imageUrl: 'https://picsum.photos/seed/shanghai4/375/343',
    hotelName: '홀리데이 인 상하이',
    showBtozpick: false,
    showRealbook: true,
    likeCount: 27,
    commentCount: 4,
    bookmarkCount: 16,
    avatarUrl: AVATARS[0],
    comments: [
      { id: 33, userName: 'budget_trip', timeAgo: '20시간전', body: '가성비 좋네요! 예약 사이트 어디 쓰셨어요?', likeCount: 1, isLiked: false, isMine: false },
    ],
  },
]

// ── 예약 데이터 (더미) ──

export type UserSegment = 'pre-checkin' | 'staying' | 'post-checkout'

export interface Reservation {
  id: string
  hotelName: string
  city: string        // 도시 단위 (트립톡 region과 매칭)
  country: string     // 국가 단위
  checkInDate: string // YYYY-MM-DD
  checkOutDate: string
  segment: UserSegment
  hasWrittenReview: boolean // 체크아웃 후 숙소후기 작성 여부
}

/** 현재 로그인 유저의 예약 목록 (더미) */
export const myReservations: Reservation[] = [
  {
    id: 'rsv-001',
    hotelName: '오사카 신라호텔',
    city: '오사카',
    country: '일본',
    checkInDate: '2026-04-06',
    checkOutDate: '2026-04-09',
    segment: 'pre-checkin',
    hasWrittenReview: false,
  },
  {
    id: 'rsv-002',
    hotelName: '제주신라호텔',
    city: '제주특별자치도',
    country: '대한민국',
    checkInDate: '2026-03-10',
    checkOutDate: '2026-03-12',
    segment: 'post-checkout',
    hasWrittenReview: true,
  },
]

/** 체크인까지 남은 일수 계산 */
export function getDday(checkInDate: string): number {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const checkin = new Date(checkInDate)
  checkin.setHours(0, 0, 0, 0)
  return Math.ceil((checkin.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))
}
