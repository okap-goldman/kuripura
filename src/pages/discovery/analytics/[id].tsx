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

export default function AnalyticsDetailPage() {
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
        <View style={styles.content}>
          {/* メイン画像 */}
          <View style={styles.imageContainer}>
            <Image
              source={{ uri: MOCK_ANALYTICS_DETAIL.image }}
              style={styles.image}
            />
          </View>

          {/* 概要 */}
          <Card>
            <CardContent>
              <Text style={styles.sectionTitle}>概要</Text>
              <Text style={styles.description}>
                {MOCK_ANALYTICS_DETAIL.description}
              </Text>
            </CardContent>
          </Card>

          {/* 主要指標 */}
          <View style={styles.statsContainer}>
            <Card>
              <CardContent>
                <View style={styles.statHeader}>
                  <Users size={20} color="#6b7280" />
                  <Text style={styles.statLabel}>参加者数</Text>
                </View>
                <Text style={styles.statValue}>
                  {MOCK_ANALYTICS_DETAIL.stats.participants}
                </Text>
              </CardContent>
            </Card>
            <Card>
              <CardContent>
                <View style={styles.statHeader}>
                  <Clock size={20} color="#6b7280" />
                  <Text style={styles.statLabel}>平均実践時間</Text>
                </View>
                <Text style={styles.statValue}>
                  {MOCK_ANALYTICS_DETAIL.stats.avgDuration}分
                </Text>
              </CardContent>
            </Card>
            <Card>
              <CardContent>
                <View style={styles.statHeader}>
                  <Star size={20} color="#6b7280" />
                  <Text style={styles.statLabel}>満足度</Text>
                </View>
                <Text style={styles.statValue}>
                  {MOCK_ANALYTICS_DETAIL.stats.satisfaction}
                </Text>
              </CardContent>
            </Card>
          </View>

          {/* トレンド */}
          <Card>
            <CardContent>
              <Text style={styles.sectionTitle}>トレンド</Text>
              <View style={styles.trendsContainer}>
                {MOCK_ANALYTICS_DETAIL.trends.map((trend) => (
                  <View key={trend.label} style={styles.trendItem}>
                    <Text style={styles.trendLabel}>{trend.label}</Text>
                    <View style={styles.trendValues}>
                      <Text style={styles.trendValue}>{trend.value}</Text>
                      <Text style={[
                        styles.trendChange,
                        trend.isPositive ? styles.positiveChange : styles.negativeChange
                      ]}>
                        {trend.change}
                      </Text>
                    </View>
                  </View>
                ))}
              </View>
            </CardContent>
          </Card>

          {/* 週間データ */}
          <Card>
            <CardContent>
              <Text style={styles.sectionTitle}>週間データ</Text>
              <View style={styles.weeklyDataContainer}>
                {MOCK_ANALYTICS_DETAIL.weeklyData.map((data) => (
                  <View key={data.day} style={styles.weeklyDataItem}>
                    <View style={[styles.weeklyDataBar, { height: `${data.value}%` }]} />
                    <Text style={styles.weeklyDataLabel}>{data.day}</Text>
                  </View>
                ))}
              </View>
            </CardContent>
          </Card>

          {/* インサイト */}
          <Card>
            <CardContent>
              <Text style={styles.sectionTitle}>主なインサイト</Text>
              <View style={styles.insightsList}>
                {MOCK_ANALYTICS_DETAIL.insights.map((insight, index) => (
                  <View key={index} style={styles.insightItem}>
                    <TrendingUp size={20} color="#3b82f6" />
                    <Text style={styles.insightText}>{insight}</Text>
                  </View>
                ))}
              </View>
            </CardContent>
          </Card>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    padding: 16,
    gap: 16,
  },
  description: {
    color: '#6b7280',
    fontSize: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  image: {
    height: '100%',
    width: '100%',
  },
  imageContainer: {
    aspectRatio: 2,
    borderRadius: 8,
    overflow: 'hidden',
  },
  insightItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    marginBottom: 12,
  },
  insightsList: {
    gap: 12,
  },
  insightText: {
    flex: 1,
    fontSize: 14,
  },
  positiveChange: {
    color: '#10b981',
  },
  negativeChange: {
    color: '#ef4444',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  statHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  statLabel: {
    color: '#6b7280',
    fontSize: 14,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  statsContainer: {
    flexDirection: 'row',
    gap: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 16,
  },
  trendChange: {
    fontSize: 14,
  },
  trendItem: {
    flex: 1,
  },
  trendLabel: {
    color: '#6b7280',
    marginBottom: 4,
  },
  trendValue: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  trendValues: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 8,
  },
  trendsContainer: {
    flexDirection: 'row',
    gap: 24,
  },
  weeklyDataBar: {
    backgroundColor: '#3b82f6',
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
    width: 32,
  },
  weeklyDataContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    height: 192,
  },
  weeklyDataItem: {
    alignItems: 'center',
  },
  weeklyDataLabel: {
    color: '#6b7280',
    fontSize: 12,
    marginTop: 8,
  },
});     