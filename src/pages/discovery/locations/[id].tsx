import { router } from 'expo-router';
import { View, Text, Image, ScrollView, StyleSheet } from 'react-native';
import { Button } from '@/components/ui/native/button';
import { Card } from '@/components/ui/native/card';
import { Tabs } from '@/components/ui/native/tabs';
import { ArrowLeft, Users, Calendar, MapPin } from 'lucide-react-native';
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
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#f9fafb',
    },
    content: {
      padding: 16,
      paddingTop: 64,
      paddingBottom: 64,
    },
    header: {
      marginBottom: 24,
    },
    title: {
      fontSize: 28,
      fontWeight: 'bold',
    },
    buttonText: {
      marginLeft: 8,
    },
  });
  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        {/* ヘッダー */}
        <View style={styles.header}>
          <Button
            variant="ghost"
            onPress={() => router.back()}
          >
            <ArrowLeft size={16} color="#000" />
            <Text style={styles.buttonText}><Text>戻る</Text></Text>
          </Button>
          <Text style={styles.title}>{MOCK_LOCATION_DETAIL.name}</Text>
        </View>

        {/* メインコンテンツ */}
        <View style={styles.mainContent}>
          {/* メイン画像 */}
          <View style={styles.imageContainer}>
            <Image
              source={{ uri: MOCK_LOCATION_DETAIL.image }}
              style={styles.mainImage}
            />
          </View>

          {/* 概要 */}
          <Card style={styles.card}>
            <View style={styles.cardContent}>
              <Text style={styles.sectionTitle}><Text>概要</Text></Text>
              <Text style={styles.description}>
                {MOCK_LOCATION_DETAIL.description}
              </Text>
            </View>
          </Card>

          {/* 主要指標 */}
          <View style={styles.statsGrid}>
            <Card style={styles.statsCard}>
              <View style={styles.cardContent}>
                <View style={styles.statsHeader}>
                  <Users size={20} color="#6b7280" />
                  <Text style={styles.statsLabel}><Text>アクティブユーザー</Text></Text>
                </View>
                <Text style={styles.statsValue}>
                  {MOCK_LOCATION_DETAIL.stats.activeUsers}
                </Text>
              </View>
            </Card>
            <Card style={styles.statsCard}>
              <View style={styles.cardContent}>
                <View style={styles.statsHeader}>
                  <Calendar size={20} color="#6b7280" />
                  <Text style={styles.statsLabel}><Text>イベント数</Text></Text>
                </View>
                <Text style={styles.statsValue}>
                  {MOCK_LOCATION_DETAIL.stats.events}
                </Text>
              </View>
            </Card>
            <Card style={styles.statsCard}>
              <View style={styles.cardContent}>
                <View style={styles.statsHeader}>
                  <Users size={20} color="#6b7280" />
                  <Text style={styles.statsLabel}><Text>コミュニティ数</Text></Text>
                </View>
                <Text style={styles.statsValue}>
                  {MOCK_LOCATION_DETAIL.stats.communities}
                </Text>
              </View>
            </Card>
          </View>

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