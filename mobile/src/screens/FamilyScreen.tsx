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

const SAMPLE_POSTS: PostType[] = [
  {
    id: '1',
    author: {
      name: "Shota | 宇宙くん",
      image: "https://cdn.peraichi.com/userData/5e92b452-dcb8-4abc-a728-72d20a0000fe/img/660caeff26c50/original.jpg",
      id: "@uchu_kun__shota"
    },
    content: `僕の朝のルーティーン\n\n朝起きて、まずは自分の部屋にご挨拶します✨\n\n部屋を神殿として扱っているので♪\n\n家はもちろんですが、特に自分の部屋のエネルギーは、自分の心の深いところと繋がってるので、扱い方を丁寧にするのがお勧めです🏠\n\n部屋の状態と、心の裏側はとても似た姿をしています❤️`,
    mediaType: "text"
  },
  // ... 他のサンプルポストも同様に追加
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

export function FamilyScreen() {
  const [posts] = React.useState<PostType[]>(SAMPLE_POSTS);
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
      <SafeAreaView style={styles.container} testID="family-screen">
        <View style={styles.loadingContainer} testID="loading-indicator">
          <ActivityIndicator size="large" color="#0284c7" />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} testID="family-screen">
      <TimelineSelector
        currentType="family"
        onSelect={(type) => {
          if (type === 'watch') {
            navigation.navigate('Watch' as never);
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