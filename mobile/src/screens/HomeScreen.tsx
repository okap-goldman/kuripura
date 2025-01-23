import React from 'react';
import { View, ScrollView, StyleSheet, SafeAreaView } from 'react-native';
import { Post } from '../components/Post';

export function HomeScreen() {
  // テスト用のデータ
  const posts = [
    {
      id: '1',
      author: {
        name: 'テストユーザー1',
        image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=test1',
        id: 'user1',
      },
      content: 'https://example.com/sample-image.jpg',
      caption: '美しい景色を撮影しました！',
      mediaType: 'image' as const,
    },
    {
      id: '2',
      author: {
        name: 'テストユーザー2',
        image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=test2',
        id: 'user2',
      },
      content: '今日は素晴らしい一日でした！たくさんの新しい発見があり、とても充実していました。みなさんの一日はどうでしたか？',
      mediaType: 'text' as const,
    },
  ];

  return (
    <SafeAreaView style={styles.container} testID="home-screen">
      <ScrollView testID="posts-list">
        {posts.map((post, index) => (
          <Post
            key={post.id}
            author={post.author}
            content={post.content}
            caption={post.caption}
            mediaType={post.mediaType}
            testID={`post-${index}`}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
});