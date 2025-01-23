import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { colors } from '../../styles/theme';
import { Post } from '../post/Post';

// サンプルデータ（実際のアプリでは適切なデータソースから取得）
const SAMPLE_POSTS = [
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

export function RecommendedPostsSection() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Feather name="thumbs-up" size={20} color={colors.text} />
        <Text style={styles.title}>おすすめ投稿</Text>
      </View>

      <View style={styles.content}>
        {SAMPLE_POSTS.map((post, index) => (
          <Post
            key={index}
            author={post.author}
            content={post.content}
            caption={post.caption}
            mediaType={post.mediaType}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
  },
  content: {
    gap: 16,
  },
}); 