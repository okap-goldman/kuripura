import { useState } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { Tabs } from '@/components/ui/native/tabs';
import PostCard from '@/components/post/post-card';

// モックデータ（後でAPIから取得するように変更）
const MOCK_POSTS = [
  {
    id: '1',
    author: {
      name: '山田太郎',
      image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=1',
    },
    content: {
      type: 'text' as const,
      text: '今日は「目醒め」について深く考えさせられる一日でした。私たちは日々、様々な気づきや発見を通じて少しずつ目醒めていくのかもしれません。',
    },
    createdAt: '2024-01-31 12:00',
    likes: 15,
    comments: 3,
    highlights: 2,
  },
  {
    id: '2',
    author: {
      name: '佐藤花子',
      image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=2',
    },
    content: {
      type: 'image' as const,
      text: '自然の中で見つけた小さな気づき',
      mediaUrl: 'https://source.unsplash.com/random/800x600?nature',
    },
    createdAt: '2024-01-31 11:30',
    likes: 24,
    comments: 5,
    highlights: 4,
  },
];

export default function TimelinePage() {
  const [timelineType, setTimelineType] = useState('family');

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <Tabs
            value={timelineType}
            onValueChange={setTimelineType}
            items={[
              { value: 'family', label: 'ファミリー' },
              { value: 'watch', label: 'ウォッチ' }
            ]}
          />
        </View>

        <View style={styles.content}>
          {/* ストーリーズ（後で実装） */}
          <View style={styles.storiesPlaceholder}>
            <Text style={styles.placeholderText}><Text>ストーリーズ（実装予定）</Text></Text>
          </View>

          {/* 投稿一覧 */}
          <View style={styles.postList}>
            {MOCK_POSTS.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f9fafb',
    flex: 1,
  },
  content: {
    padding: 16,
  },
  header: {
    backgroundColor: '#f9fafb',
    borderBottomColor: '#e5e7eb',
    borderBottomWidth: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  placeholderText: {
    color: '#9ca3af',
  },
  postList: {
    gap: 16,
  },
  scrollView: {
    flex: 1,
  },
  storiesPlaceholder: {
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    height: 96,
    justifyContent: 'center',
    marginBottom: 16,
  },
});  