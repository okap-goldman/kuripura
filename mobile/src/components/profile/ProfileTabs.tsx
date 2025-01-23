import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image, StyleSheet, Dimensions } from 'react-native';
import { colors } from '../../styles/theme';
import { Post } from '../post/Post';

interface ProfileTabsProps {
  selectedTab: string;
  setSelectedPost: (post: any) => void;
}

type PostType = {
  author: {
    name: string;
    image: string;
    id: string;
  };
  content: string;
  caption?: string;
  mediaType: 'text' | 'image' | 'video' | 'audio';
};

// サンプルデータ（実際のアプリでは適切なデータソースから取得）
const SAMPLE_POSTS: PostType[] = [
  {
    author: {
      name: '心の探求者',
      image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=1',
      id: 'seeker_of_heart',
    },
    content: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131',
    mediaType: 'image',
  },
  {
    author: {
      name: '心の探求者',
      image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=1',
      id: 'seeker_of_heart',
    },
    content: '内なる平安を見つけることは、外の世界の混沌に対する最強の防御となります。',
    mediaType: 'text',
  },
];

export function ProfileTabs({ selectedTab, setSelectedPost }: ProfileTabsProps) {
  const [activeTab, setActiveTab] = useState(selectedTab);
  const screenWidth = Dimensions.get('window').width;

  const tabs = [
    { value: 'media', label: 'メディア' },
    { value: 'audio', label: '音声' },
    { value: 'text', label: 'テキスト' },
    { value: 'highlights', label: 'ハイライト' },
    { value: 'events', label: 'イベント' },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'media':
        return (
          <View style={styles.mediaGrid}>
            {SAMPLE_POSTS.filter(post => post.mediaType === 'image').map((post, index) => (
              <TouchableOpacity
                key={index}
                style={[styles.mediaItem, { width: (screenWidth - 32 - 8) / 3 }]}
                onPress={() => setSelectedPost(post)}
              >
                <Image
                  source={{ uri: post.content }}
                  style={styles.mediaImage}
                />
              </TouchableOpacity>
            ))}
          </View>
        );

      case 'text':
        return (
          <View style={styles.textContent}>
            {SAMPLE_POSTS.filter(post => post.mediaType === 'text').map((post, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => setSelectedPost(post)}
              >
                <Post {...post} />
              </TouchableOpacity>
            ))}
          </View>
        );

      case 'events':
        return (
          <View style={styles.eventCard}>
            <Text style={styles.eventTitle}>瞑想ワークショップ</Text>
            <Text style={styles.eventDate}>2024年4月1日 14:00-16:00</Text>
            <Text style={styles.eventDescription}>
              心の平安を見つける瞑想の基礎を学びましょう。
            </Text>
          </View>
        );

      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.tabsScroll}
      >
        <View style={styles.tabsList}>
          {tabs.map(tab => (
            <TouchableOpacity
              key={tab.value}
              style={[
                styles.tab,
                activeTab === tab.value && styles.activeTab,
              ]}
              onPress={() => setActiveTab(tab.value)}
            >
              <Text
                style={[
                  styles.tabText,
                  activeTab === tab.value && styles.activeTabText,
                ]}
              >
                {tab.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      <ScrollView style={styles.content}>
        {renderTabContent()}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabsScroll: {
    maxHeight: 48,
  },
  tabsList: {
    flexDirection: 'row',
    paddingHorizontal: 16,
  },
  tab: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginRight: 8,
    borderRadius: 8,
    backgroundColor: colors.backgroundLight,
  },
  activeTab: {
    backgroundColor: colors.primary,
  },
  tabText: {
    fontSize: 14,
    color: colors.textMuted,
  },
  activeTabText: {
    color: colors.background,
    fontWeight: '600',
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  mediaGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 4,
  },
  mediaItem: {
    aspectRatio: 1,
    marginBottom: 4,
  },
  mediaImage: {
    width: '100%',
    height: '100%',
    borderRadius: 4,
  },
  textContent: {
    gap: 16,
  },
  eventCard: {
    backgroundColor: colors.background,
    borderRadius: 8,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.border,
  },
  eventTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
  },
  eventDate: {
    fontSize: 14,
    color: colors.textMuted,
    marginTop: 4,
  },
  eventDescription: {
    fontSize: 14,
    color: colors.text,
    marginTop: 8,
  },
}); 