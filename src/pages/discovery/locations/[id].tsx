import { useRouter } from 'next/router';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { ArrowLeft, Users, Calendar, MapPin } from 'lucide-react';
import EventCard from '@/pages/events/event-card';
import PostCard from '@/components/post/post-card';

// モックデータ
const MOCK_LOCATION_DETAIL = {
  id: '1',
  name: '東京',
  description: '東京での瞑想とマインドフルネスの実践コミュニティです。都会の喧騒の中で、心の平安を見つけましょう。',
  image: 'https://source.unsplash.com/random/1200x600?tokyo',
  stats: {
    activeUsers: 1500,
    events: 25,
    communities: 12,
  },
  upcomingEvents: [
    {
      id: '1',
      title: '朝活瞑想会',
      description: '早朝の静かな時間に、心と体を整えます。初心者歓迎！',
      date: '2024-02-15T07:00:00',
      location: '東京都渋谷区',
      price: 1000,
      capacity: 15,
      currentParticipants: 8,
      interestedCount: 20,
      image: 'https://source.unsplash.com/random/800x600?morning-meditation',
      organizer: {
        name: '山田太郎',
        image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=1',
      },
    },
    {
      id: '2',
      title: '夕暮れヨガ',
      description: '1日の終わりに、心と体をリラックスさせましょう。',
      date: '2024-02-16T18:00:00',
      location: '東京都新宿区',
      price: 2000,
      capacity: 20,
      currentParticipants: 15,
      interestedCount: 30,
      image: 'https://source.unsplash.com/random/800x600?sunset-yoga',
      organizer: {
        name: '佐藤花子',
        image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=2',
      },
    },
  ],
  recentPosts: [
    {
      id: '1',
      author: {
        name: '山田太郎',
        image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=1',
      },
      content: {
        type: 'text',
        text: '今朝の瞑想会では、新しい参加者の方々と素晴らしい時間を共有できました。',
      },
      createdAt: '2024-01-31 12:00',
      likes: 15,
      comments: 3,
      highlights: 2,
    },
  ],
  popularLocations: [
    {
      name: '代々木公園',
      address: '東京都渋谷区代々木神園町2-1',
      activities: ['瞑想会', 'ヨガ', '野外マインドフルネス'],
      image: 'https://source.unsplash.com/random/400x300?yoyogi-park',
    },
    {
      name: '明治神宮',
      address: '東京都渋谷区代々木神園町1-1',
      activities: ['森林浴瞑想', '朝活'],
      image: 'https://source.unsplash.com/random/400x300?meiji-shrine',
    },
  ],
};

export default function LocationDetailPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-50 pt-16 pb-16">
      <div className="container mx-auto px-4">
        {/* ヘッダー */}
        <div className="mb-6">
          <Button
            variant="ghost"
            className="mb-4"
            onClick={() => router.back()}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            戻る
          </Button>
          <h1 className="text-3xl font-bold">{MOCK_LOCATION_DETAIL.name}</h1>
        </div>

        {/* メインコンテンツ */}
        <div className="space-y-6">
          {/* メイン画像 */}
          <div className="aspect-[2/1] rounded-lg overflow-hidden">
            <img
              src={MOCK_LOCATION_DETAIL.image}
              alt={MOCK_LOCATION_DETAIL.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* 概要 */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">概要</h2>
              <p className="text-gray-600">
                {MOCK_LOCATION_DETAIL.description}
              </p>
            </CardContent>
          </Card>

          {/* 主要指標 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center space-x-2 text-gray-500 mb-2">
                  <Users className="h-5 w-5" />
                  <span>アクティブユーザー</span>
                </div>
                <p className="text-3xl font-bold">
                  {MOCK_LOCATION_DETAIL.stats.activeUsers}
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center space-x-2 text-gray-500 mb-2">
                  <Calendar className="h-5 w-5" />
                  <span>イベント数</span>
                </div>
                <p className="text-3xl font-bold">
                  {MOCK_LOCATION_DETAIL.stats.events}
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center space-x-2 text-gray-500 mb-2">
                  <Users className="h-5 w-5" />
                  <span>コミュニティ数</span>
                </div>
                <p className="text-3xl font-bold">
                  {MOCK_LOCATION_DETAIL.stats.communities}
                </p>
              </CardContent>
            </Card>
          </div>

          {/* タブ付きコンテンツ */}
          <Tabs defaultValue="events" className="space-y-6">
            <TabsList className="w-full">
              <TabsTrigger value="events" className="flex-1">
                イベント
              </TabsTrigger>
              <TabsTrigger value="posts" className="flex-1">
                投稿
              </TabsTrigger>
              <TabsTrigger value="locations" className="flex-1">
                人気スポット
              </TabsTrigger>
            </TabsList>

            {/* イベントタブ */}
            <TabsContent value="events">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {MOCK_LOCATION_DETAIL.upcomingEvents.map((event) => (
                  <EventCard
                    key={event.id}
                    event={event}
                    onClick={() => console.log('イベント詳細へ遷移')}
                  />
                ))}
              </div>
            </TabsContent>

            {/* 投稿タブ */}
            <TabsContent value="posts">
              <div className="space-y-4">
                {MOCK_LOCATION_DETAIL.recentPosts.map((post) => (
                  <PostCard key={post.id} post={post} />
                ))}
              </div>
            </TabsContent>

            {/* 人気スポットタブ */}
            <TabsContent value="locations">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {MOCK_LOCATION_DETAIL.popularLocations.map((location, index) => (
                  <Card key={index}>
                    <CardContent className="p-4">
                      <div className="aspect-video rounded-lg overflow-hidden mb-4">
                        <img
                          src={location.image}
                          alt={location.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <h3 className="font-semibold mb-2">{location.name}</h3>
                      <div className="flex items-start space-x-2 text-gray-600 mb-2">
                        <MapPin className="h-4 w-4 mt-1 flex-shrink-0" />
                        <p className="text-sm">{location.address}</p>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {location.activities.map((activity, activityIndex) => (
                          <span
                            key={activityIndex}
                            className="text-sm bg-gray-100 px-2 py-1 rounded-full"
                          >
                            {activity}
                          </span>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
} 