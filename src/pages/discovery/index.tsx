import { useState } from 'react';
import { View, Text, Image, ScrollView, StyleSheet, Dimensions } from 'react-native';
import { Button } from '@/components/ui/native/button';
import { ChevronRight, TrendingUp, MapPin, Sparkles } from 'lucide-react-native';

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
  },
  tabList: {
    flexDirection: 'row',
    marginBottom: 24,
    gap: 8,
  },
  tabButton: {
    flex: 1,
  },
  tabContent: {
    flexDirection: 'column',
    gap: 16,
  },
  tabButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  tabText: {
    fontSize: 14,
    color: '#000',
  },
  tabTextActive: {
    color: '#fff',
  },
  card: {
    overflow: 'hidden',
  },
  cardContent: {
    flexDirection: 'row',
    height: 200,
  },
  imageContainer: {
    flex: 1,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  cardBody: {
    flex: 2,
    padding: 16,
    justifyContent: 'space-between',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  cardDescription: {
    color: '#6b7280',
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  statLabel: {
    fontSize: 12,
    color: '#6b7280',
  },
  locationContainer: {
    height: 200,
    position: 'relative',
  },
  locationImage: {
    width: '100%',
    height: '100%',
  },
  locationOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  locationContent: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
  },
  locationTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  locationStats: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  locationStatText: {
    color: '#fff',
  },
  locationStatDivider: {
    color: '#fff',
  },
  recommendationCard: {
    padding: 16,
  },
  recommendationContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  recommendationImageContainer: {
    width: 96,
    height: 96,
    borderRadius: 8,
    overflow: 'hidden',
  },
  recommendationImage: {
    width: '100%',
    height: '100%',
  },
  recommendationBody: {
    flex: 1,
  },
  recommendationCategory: {
    fontSize: 12,
    color: '#6b7280',
    marginBottom: 4,
  },
  recommendationTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  recommendationDescription: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 8,
  },
  recommendationMembers: {
    fontSize: 12,
    color: '#6b7280',
  },
});
export default function DiscoveryPage() {
  const [activeTab, setActiveTab] = useState('analytics');

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>発見</Text>

        <View style={styles.tabList}>
          <Button
            onPress={() => setActiveTab('analytics')}
            variant={activeTab === 'analytics' ? 'default' : 'ghost'}
            style={styles.tabButton}
          >
            <View style={styles.tabButtonContent}>
              <TrendingUp size={16} color={activeTab === 'analytics' ? '#fff' : '#000'} />
              <Text style={[
                styles.tabText,
                activeTab === 'analytics' && styles.tabTextActive
              ]}>分析</Text>
            </View>
          </Button>
          <Button
            onPress={() => setActiveTab('locations')}
            variant={activeTab === 'locations' ? 'default' : 'ghost'}
            style={styles.tabButton}
          >
            <View style={styles.tabButtonContent}>
              <MapPin size={16} color={activeTab === 'locations' ? '#fff' : '#000'} />
              <Text style={[
                styles.tabText,
                activeTab === 'locations' && styles.tabTextActive
              ]}>地域</Text>
            </View>
          </Button>
          <Button
            onPress={() => setActiveTab('recommendations')}
            variant={activeTab === 'recommendations' ? 'default' : 'ghost'}
            style={styles.tabButton}
          >
            <View style={styles.tabButtonContent}>
              <Sparkles size={16} color={activeTab === 'recommendations' ? '#fff' : '#000'} />
              <Text style={[
                styles.tabText,
                activeTab === 'recommendations' && styles.tabTextActive
              ]}>おすすめ</Text>
            </View>
          </Button>
        </View>

          {/* 分析タブ */}
          {activeTab === 'analytics' && (
            <View style={styles.tabContent}>
              {MOCK_ANALYTICS.map((item) => (
                <Card key={item.id} style={styles.card}>
                  <View style={styles.cardContent}>
                    <View style={styles.imageContainer}>
                      <Image
                        source={{ uri: item.image }}
                        style={styles.image}
                      />
                    </View>
                    <View style={styles.cardBody}>
                      <View>
                        <Text style={styles.cardTitle}>{item.title}</Text>
                        <Text style={styles.cardDescription}>{item.description}</Text>
                      </View>
                      <View style={styles.statsGrid}>
                        <View style={styles.statItem}>
                          <Text style={styles.statValue}>{item.stats.participants}</Text>
                          <Text style={styles.statLabel}>参加者数</Text>
                        </View>
                        <View style={styles.statItem}>
                          <Text style={styles.statValue}>{item.stats.avgDuration}分</Text>
                          <Text style={styles.statLabel}>平均実践時間</Text>
                        </View>
                        <View style={styles.statItem}>
                          <Text style={styles.statValue}>{item.stats.satisfaction}</Text>
                          <Text style={styles.statLabel}>満足度</Text>
                        </View>
                      </View>
                    </View>
                  </View>
                </Card>
              ))}
            </View>
          )}

          {/* 地域タブ */}
          {activeTab === 'locations' && (
            <View style={styles.tabContent}>
              {MOCK_LOCATIONS.map((location) => (
                <Card key={location.id} style={styles.card}>
                  <View style={styles.locationContainer}>
                    <Image
                      source={{ uri: location.image }}
                      style={styles.locationImage}
                    />
                    <View style={styles.locationOverlay} />
                    <View style={styles.locationContent}>
                      <Text style={styles.locationTitle}>{location.name}</Text>
                      <View style={styles.locationStats}>
                        <Text style={styles.locationStatText}>{location.activeUsers}人が活動中</Text>
                        <Text style={styles.locationStatDivider}>•</Text>
                        <Text style={styles.locationStatText}>イベント{location.events}件</Text>
                      </View>
                    </View>
                  </View>
                </Card>
              ))}
            </View>
          )}

          {/* おすすめタブ */}
          {activeTab === 'recommendations' && (
            <View style={styles.tabContent}>
              {MOCK_RECOMMENDATIONS.map((item) => (
                <Card key={item.id} style={styles.recommendationCard}>
                  <View style={styles.recommendationContent}>
                    <View style={styles.recommendationImageContainer}>
                      <Image
                        source={{ uri: item.image }}
                        style={styles.recommendationImage}
                      />
                    </View>
                    <View style={styles.recommendationBody}>
                      <Text style={styles.recommendationCategory}>{item.category}</Text>
                      <Text style={styles.recommendationTitle}>{item.title}</Text>
                      <Text style={styles.recommendationDescription} numberOfLines={2}>
                        {item.description}
                      </Text>
                      <Text style={styles.recommendationMembers}>
                        メンバー {item.members}人
                      </Text>
                    </View>
                    <Button
                      variant="ghost"
                      onPress={() => {}}
                    >
                      <ChevronRight size={16} color="#6b7280" />
                    </Button>
                  </View>
                </Card>
              ))}
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
}      