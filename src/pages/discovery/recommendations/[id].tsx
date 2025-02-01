import { useRouter } from 'next/router';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { ArrowLeft, Users, Calendar, MessageCircle, Heart, Star } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import PostCard from '@/components/post/post-card';

// モックデータ
const MOCK_RECOMMENDATION_DETAIL = {
  id: '1',
  title: '初心者向け瞑想グループ',
  description: '瞑想を始めたい方向けのコミュニティです。経験豊富なメンバーがサポートし、一緒に成長していく環境です。',
  image: 'https://source.unsplash.com/random/1200x600?group-meditation',
  category: 'コミュニティ',
  members: 120,
  stats: {
    activeMembers: 85,
    monthlyEvents: 8,
    avgSatisfaction: 4.7,
  },
  schedule: [
    {
      day: '月曜日',
      time: '朝7:00-8:00',
      activity: '朝の瞑想会',
    },
    {
      day: '水曜日',
      time: '夜19:00-20:00',
      activity: 'オンライン瞑想',
    },
    {
      day: '土曜日',
      time: '朝9:00-10:30',
      activity: 'グループ瞑想＆シェアリング',
    },
  ],
  leaders: [
    {
      name: '山田太郎',
      role: 'グループリーダー',
      experience: '瞑想歴8年',
      image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=1',
    },
    {
      name: '佐藤花子',
      role: 'サブリーダー',
      experience: '瞑想歴5年',
      image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=2',
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
        text: '今日の瞑想会では、呼吸に意識を向けることの大切さについて話し合いました。',
      },
      createdAt: '2024-01-31 12:00',
      likes: 15,
      comments: 3,
      highlights: 2,
    },
  ],
  testimonials: [
    {
      id: '1',
      author: {
        name: '田中一郎',
        image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=3',
      },
      content: '初めは不安でしたが、優しい雰囲気で安心して参加できています。瞑想を通じて、日々の生活にも変化を感じています。',
      rating: 5,
    },
    {
      id: '2',
      author: {
        name: '鈴木美咲',
        image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=4',
      },
      content: 'オンライン瞑想も対面の瞑想会も、どちらも充実した内容です。仕事の後のリフレッシュになっています。',
      rating: 4,
    },
  ],
};

export default function RecommendationDetailPage() {
  const router = useRouter();
  const [isJoined, setIsJoined] = useState(false);

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
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold">{MOCK_RECOMMENDATION_DETAIL.title}</h1>
            <Button
              variant={isJoined ? 'outline' : 'default'}
              onClick={() => setIsJoined(!isJoined)}
            >
              {isJoined ? '参加中' : '参加する'}
            </Button>
          </div>
        </div>

        {/* メインコンテンツ */}
        <div className="space-y-6">
          {/* メイン画像 */}
          <div className="aspect-[2/1] rounded-lg overflow-hidden">
            <img
              src={MOCK_RECOMMENDATION_DETAIL.image}
              alt={MOCK_RECOMMENDATION_DETAIL.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* 概要 */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2 mb-4">
                <span className="text-sm bg-primary/10 text-primary px-2 py-1 rounded-full">
                  {MOCK_RECOMMENDATION_DETAIL.category}
                </span>
                <span className="text-sm text-gray-500">
                  メンバー {MOCK_RECOMMENDATION_DETAIL.members}人
                </span>
              </div>
              <p className="text-gray-600">
                {MOCK_RECOMMENDATION_DETAIL.description}
              </p>
            </CardContent>
          </Card>

          {/* 主要指標 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center space-x-2 text-gray-500 mb-2">
                  <Users className="h-5 w-5" />
                  <span>アクティブメンバー</span>
                </div>
                <p className="text-3xl font-bold">
                  {MOCK_RECOMMENDATION_DETAIL.stats.activeMembers}
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center space-x-2 text-gray-500 mb-2">
                  <Calendar className="h-5 w-5" />
                  <span>月間イベント数</span>
                </div>
                <p className="text-3xl font-bold">
                  {MOCK_RECOMMENDATION_DETAIL.stats.monthlyEvents}
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center space-x-2 text-gray-500 mb-2">
                  <Heart className="h-5 w-5" />
                  <span>満足度</span>
                </div>
                <p className="text-3xl font-bold">
                  {MOCK_RECOMMENDATION_DETAIL.stats.avgSatisfaction}
                </p>
              </CardContent>
            </Card>
          </div>

          {/* タブ付きコンテンツ */}
          <Tabs defaultValue="schedule" className="space-y-6">
            <TabsList className="w-full">
              <TabsTrigger value="schedule" className="flex-1">
                スケジュール
              </TabsTrigger>
              <TabsTrigger value="leaders" className="flex-1">
                リーダー
              </TabsTrigger>
              <TabsTrigger value="posts" className="flex-1">
                投稿
              </TabsTrigger>
              <TabsTrigger value="testimonials" className="flex-1">
                レビュー
              </TabsTrigger>
            </TabsList>

            {/* スケジュールタブ */}
            <TabsContent value="schedule">
              <Card>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    {MOCK_RECOMMENDATION_DETAIL.schedule.map((item, index) => (
                      <div
                        key={index}
                        className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg"
                      >
                        <Calendar className="h-5 w-5 text-gray-500 mt-1" />
                        <div>
                          <p className="font-semibold">{item.activity}</p>
                          <p className="text-sm text-gray-600">
                            {item.day} {item.time}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* リーダータブ */}
            <TabsContent value="leaders">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {MOCK_RECOMMENDATION_DETAIL.leaders.map((leader, index) => (
                  <Card key={index}>
                    <CardContent className="p-6">
                      <div className="flex items-center space-x-4">
                        <Avatar className="h-16 w-16">
                          <AvatarImage src={leader.image} />
                          <AvatarFallback>{leader.name[0]}</AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-semibold">{leader.name}</h3>
                          <p className="text-sm text-gray-500">{leader.role}</p>
                          <p className="text-sm text-gray-500">{leader.experience}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* 投稿タブ */}
            <TabsContent value="posts">
              <div className="space-y-4">
                {MOCK_RECOMMENDATION_DETAIL.recentPosts.map((post) => (
                  <PostCard key={post.id} post={post} />
                ))}
              </div>
            </TabsContent>

            {/* レビュータブ */}
            <TabsContent value="testimonials">
              <div className="space-y-4">
                {MOCK_RECOMMENDATION_DETAIL.testimonials.map((testimonial) => (
                  <Card key={testimonial.id}>
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <Avatar>
                          <AvatarImage src={testimonial.author.image} />
                          <AvatarFallback>{testimonial.author.name[0]}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="font-semibold">{testimonial.author.name}</h3>
                            <div className="flex items-center">
                              {Array.from({ length: testimonial.rating }).map((_, i) => (
                                <Star
                                  key={i}
                                  className="h-4 w-4 text-yellow-400 fill-current"
                                />
                              ))}
                            </div>
                          </div>
                          <p className="text-gray-600">{testimonial.content}</p>
                        </div>
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