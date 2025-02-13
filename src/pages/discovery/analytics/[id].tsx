import { router } from 'expo-router';
import { Button } from '@/components/ui/native/button';
import { View, Text, Image, ScrollView, StyleSheet } from 'react-native';
import { ArrowLeft, Users, Clock, Star, TrendingUp, BarChart } from 'lucide-react-native';

// モックデータ
const MOCK_ANALYTICS_DETAIL = {
  id: '1',
  title: '瞑想の効果',
  description: '瞑想を継続することで、ストレス軽減や集中力向上などの効果が期待できます。',
  image: 'https://source.unsplash.com/random/1200x600?meditation',
  stats: {
    participants: 1200,
    avgDuration: 15,
    satisfaction: 4.8,
  },
  trends: [
    {
      label: '継続率',
      value: '75%',
      change: '+5%',
      isPositive: true,
    },
    {
      label: 'ストレス軽減',
      value: '65%',
      change: '+8%',
      isPositive: true,
    },
    {
      label: '集中力向上',
      value: '70%',
      change: '+12%',
      isPositive: true,
    },
  ],
  weeklyData: [
    { day: '月', value: 85 },
    { day: '火', value: 78 },
    { day: '水', value: 90 },
    { day: '木', value: 85 },
    { day: '金', value: 92 },
    { day: '土', value: 95 },
    { day: '日', value: 88 },
  ],
  insights: [
    '毎日15分以上の瞑想を行うユーザーは、ストレス軽減効果が2倍に',
    '朝の瞑想実践者は、1日の集中力が30%向上',
    'グループ瞑想への参加者は、継続率が25%上昇',
  ],
};

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
            <Text><Text>戻る</Text></Text>
          </Button>
          <Text style={styles.title}>{MOCK_ANALYTICS_DETAIL.title}</Text>
        </View>

        {/* メインコンテンツ */}
        <div className="space-y-6">
          {/* メイン画像 */}
          <div className="aspect-[2/1] rounded-lg overflow-hidden">
            <img
              src={MOCK_ANALYTICS_DETAIL.image}
              alt={MOCK_ANALYTICS_DETAIL.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* 概要 */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4"><Text>概要</Text></h2>
              <p className="text-gray-600">
                {MOCK_ANALYTICS_DETAIL.description}
              </p>
            </CardContent>
          </Card>

          {/* 主要指標 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center space-x-2 text-gray-500 mb-2">
                  <Users className="h-5 w-5" />
                  <span><Text>参加者数</Text></span>
                </div>
                <p className="text-3xl font-bold">
                  {MOCK_ANALYTICS_DETAIL.stats.participants}
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center space-x-2 text-gray-500 mb-2">
                  <Clock className="h-5 w-5" />
                  <span><Text>平均実践時間</Text></span>
                </div>
                <p className="text-3xl font-bold">
                  {MOCK_ANALYTICS_DETAIL.stats.avgDuration}分
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center space-x-2 text-gray-500 mb-2">
                  <Star className="h-5 w-5" />
                  <span><Text>満足度</Text></span>
                </div>
                <p className="text-3xl font-bold">
                  {MOCK_ANALYTICS_DETAIL.stats.satisfaction}
                </p>
              </CardContent>
            </Card>
          </div>

          {/* トレンド */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4"><Text>トレンド</Text></h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {MOCK_ANALYTICS_DETAIL.trends.map((trend) => (
                  <div key={trend.label}>
                    <p className="text-gray-500 mb-1">{trend.label}</p>
                    <div className="flex items-end space-x-2">
                      <p className="text-2xl font-bold">{trend.value}</p>
                      <p className={`text-sm ${trend.isPositive ? 'text-green-500' : 'text-red-500'}`}>
                        {trend.change}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* 週間データ */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4"><Text>週間データ</Text></h2>
              <div className="h-48 flex items-end justify-between">
                {MOCK_ANALYTICS_DETAIL.weeklyData.map((data) => (
                  <div key={data.day} className="flex flex-col items-center">
                    <div
                      className="w-8 bg-primary rounded-t"
                      style={{ height: `${data.value}%` }}
                    />
                    <p className="mt-2 text-sm text-gray-500">{data.day}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* インサイト */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4"><Text>主なインサイト</Text></h2>
              <ul className="space-y-3">
                {MOCK_ANALYTICS_DETAIL.insights.map((insight, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <TrendingUp className="h-5 w-5 text-primary mt-0.5" />
                    <span>{insight}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}  