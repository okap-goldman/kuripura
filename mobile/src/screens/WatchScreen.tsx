import React from 'react';
import { View, FlatList, StyleSheet, SafeAreaView, ActivityIndicator } from 'react-native';
import { Post } from '../components/Post';
import { TimelineSelector } from '../components/TimelineSelector';
import { useNavigation } from '@react-navigation/native';

type PostType = {
  id: string;
  author: {
    name: string;
    image: string;
    id: string;
  };
  content: string;
  caption?: string;
  mediaType: 'image' | 'text' | 'audio' | 'video';
};

// ウォッチタイムライン用のサンプルデータ
const WATCH_POSTS: PostType[] = [
  {
    id: '1',
    author: {
      name: "内なる光",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=4",
      id: "@inner_light"
    },
    content: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    caption: "この動画から多くの気づきを得ました。皆さんにもシェアしたいと思います。",
    mediaType: "video"
  },
  // ... 他のウォッチ用サンプルポストも同様に追加
];

const PostItem = React.memo(({ post, index }: { post: PostType; index: number }) => (
  <View testID={`post-${index}-container`} collapsable={false}>
    <Post
      author={post.author}
      content={post.content}
      caption={post.caption}
      mediaType={post.mediaType}
      testID={`post-${index}`}
    />
  </View>
));

export function WatchScreen() {
  const [posts] = React.useState<PostType[]>(WATCH_POSTS);
  const [loading, setLoading] = React.useState(true);
  const navigation = useNavigation();

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <SafeAreaView style={styles.container} testID="watch-screen">
        <View style={styles.loadingContainer} testID="loading-indicator">
          <ActivityIndicator size="large" color="#0284c7" />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} testID="watch-screen">
      <TimelineSelector
        currentType="watch"
        onSelect={(type) => {
          if (type === 'family') {
            navigation.navigate('Family' as never);
          }
        }}
      />
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
        initialNumToRender={2}
        maxToRenderPerBatch={2}
        windowSize={3}
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