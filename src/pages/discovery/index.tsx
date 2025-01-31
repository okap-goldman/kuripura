import { useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ChevronRight, TrendingUp, MapPin, Sparkles } from 'lucide-react';

// モックデータ
const MOCK_ANALYTICS = [
  {
    id: '1',
    title: '瞑想の効果',
    description: '瞑想を継続することで、ストレス軽減や集中力向上などの効果が期待できます。',
    image: 'https://source.unsplash.com/random/800x600?meditation',
    stats: {
      participants: 1200,
      avgDuration: 15,
      satisfaction: 4.8,
    },
  },
  {
    id: '2',
    title: 'マインドフルネスの実践',
    description: '日常生活の中で、マインドフルネスを取り入れることで、より豊かな生活を送ることができます。',
    image: 'https://source.unsplash.com/random/800x600?mindfulness',
    stats: {
      participants: 850,
      avgDuration: 20,
      satisfaction: 4.6,
    },
  },
];

const MOCK_LOCATIONS = [
  {
    id: '1',
    name: '東京',
    image: 'https://source.unsplash.com/random/800x600?tokyo',
    activeUsers: 1500,
    events: 25,
  },
  {
    id: '2',
    name: '大阪',
    image: 'https://source.unsplash.com/random/800x600?osaka',
    activeUsers: 800,
    events: 15,
  },
];

const MOCK_RECOMMENDATIONS = [
  {
    id: '1',
    title: '初心者向け瞑想グループ',
    description: '瞑想を始めたい方向けのコミュニティです。',
    image: 'https://source.unsplash.com/random/800x600?group-meditation',
    members: 120,
    category: 'コミュニティ',
  },
  {
    id: '2',
    title: 'マインドフルネス・ヨガ',
    description: 'ヨガを通じて、心と体の調和を目指します。',
    image: 'https://source.unsplash.com/random/800x600?yoga',
    members: 80,
    category: 'アクティビティ',
  },
];

export default function DiscoveryPage() {
  return (
    <div className="min-h-screen bg-gray-50 pt-16 pb-16">
      <div className="container mx-auto px-4">
        <h1 className="text-2xl font-bold mb-6">発見</h1>

        <Tabs defaultValue="analytics" className="space-y-6">
          <TabsList className="w-full">
            <TabsTrigger value="analytics" className="flex-1">
              <TrendingUp className="h-4 w-4 mr-2" />
              分析
            </TabsTrigger>
            <TabsTrigger value="locations" className="flex-1">
              <MapPin className="h-4 w-4 mr-2" />
              地域
            </TabsTrigger>
            <TabsTrigger value="recommendations" className="flex-1">
              <Sparkles className="h-4 w-4 mr-2" />
              おすすめ
            </TabsTrigger>
          </TabsList>

          {/* 分析タブ */}
          <TabsContent value="analytics">
            <div className="space-y-4">
              {MOCK_ANALYTICS.map((item) => (
                <Card key={item.id} className="overflow-hidden">
                  <CardContent className="p-0">
                    <div className="grid grid-cols-1 md:grid-cols-3">
                      <div className="aspect-[4/3] md:aspect-auto">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="col-span-2 p-6 space-y-4">
                        <div>
                          <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                          <p className="text-gray-600">{item.description}</p>
                        </div>
                        <div className="grid grid-cols-3 gap-4">
                          <div>
                            <p className="text-2xl font-bold">{item.stats.participants}</p>
                            <p className="text-sm text-gray-500">参加者数</p>
                          </div>
                          <div>
                            <p className="text-2xl font-bold">{item.stats.avgDuration}分</p>
                            <p className="text-sm text-gray-500">平均実践時間</p>
                          </div>
                          <div>
                            <p className="text-2xl font-bold">{item.stats.satisfaction}</p>
                            <p className="text-sm text-gray-500">満足度</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* 地域タブ */}
          <TabsContent value="locations">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {MOCK_LOCATIONS.map((location) => (
                <Card key={location.id} className="overflow-hidden">
                  <CardContent className="p-0">
                    <div className="relative aspect-video">
                      <img
                        src={location.image}
                        alt={location.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <div className="absolute bottom-0 left-0 p-6 text-white">
                        <h3 className="text-2xl font-bold mb-2">{location.name}</h3>
                        <div className="flex space-x-4">
                          <p>{location.activeUsers}人が活動中</p>
                          <p>•</p>
                          <p>イベント{location.events}件</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* おすすめタブ */}
          <TabsContent value="recommendations">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {MOCK_RECOMMENDATIONS.map((item) => (
                <Card key={item.id}>
                  <CardContent className="p-4">
                    <div className="flex space-x-4">
                      <div className="w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2 mb-1">
                          <span className="text-sm text-gray-500">{item.category}</span>
                        </div>
                        <h3 className="font-semibold mb-1 truncate">{item.title}</h3>
                        <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                          {item.description}
                        </p>
                        <p className="text-sm text-gray-500">
                          メンバー {item.members}人
                        </p>
                      </div>
                      <Button variant="ghost" size="icon">
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
} 