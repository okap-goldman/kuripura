import React from 'react';
import { View, FlatList, StyleSheet, SafeAreaView, ActivityIndicator, Text } from 'react-native';
import { Post } from '../components/Post';

type PostType = {
  id: string;
  author: {
    name: string;
    image: string;
    id: string;
  };
  content: string;
  caption?: string;
  mediaType: 'image' | 'text';
};

const mockPosts: PostType[] = [
  {
    id: '1',
    author: {
      name: 'テストユーザー1',
      image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=test1',
      id: 'user1',
    },
    content: 'https://example.com/sample-image.jpg',
    caption: '美しい景色を撮影しました！',
    mediaType: 'image',
  },
  {
    id: '2',
    author: {
      name: 'テストユーザー2',
      image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=test2',
      id: 'user2',
    },
    content: '今日は素晴らしい一日でした！たくさんの新しい発見があり、とても充実していました。みなさんの一日はどうでしたか？',
    mediaType: 'text',
  },
];

const PostItem = React.memo(({ post, index }: { post: PostType; index: number }) => (
  <View 
    testID={`post-${index}-container`}
    collapsable={false}
  >
    <Post
      author={post.author}
      content={post.content}
      caption={post.caption}
      mediaType={post.mediaType}
      testID={`post-${index}`}
    />
  </View>
));

export function HomeScreen() {
  const [posts] = React.useState<PostType[]>(mockPosts);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <SafeAreaView style={styles.container} testID="home-screen">
        <View style={styles.loadingContainer} testID="loading-indicator">
          <ActivityIndicator size="large" color="#0284c7" />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} testID="home-screen">
      <FlatList
        data={posts}
        keyExtractor={item => item.id}
        renderItem={({ item, index }) => (
          <PostItem post={item} index={index} />
        )}
        style={styles.list}
        contentContainerStyle={styles.contentContainer}
        testID="posts-list"
        removeClippedSubviews={true}
        initialNumToRender={1}
        maxToRenderPerBatch={1}
        windowSize={2}
        updateCellsBatchingPeriod={50}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  list: {
    flex: 1,
  },
  contentContainer: {
    paddingBottom: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});