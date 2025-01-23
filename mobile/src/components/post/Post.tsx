import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { colors } from '../../styles/theme';
import { PostHeader } from './PostHeader';
import { PostContent } from './PostContent';
import { PostActions } from './PostActions';
import { Dialog } from '../ui/dialog';
import { PostComments } from './PostComments';

interface PostProps {
  author: {
    name: string;
    image: string;
    id: string;
  };
  content: string;
  caption?: string;
  mediaType: 'text' | 'image' | 'video' | 'audio';
}

export function Post({ author, content, caption, mediaType }: PostProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [showFullPost, setShowFullPost] = useState(false);

  return (
    <View style={styles.container}>
      <PostHeader author={author} />
      
      <View
        onTouchEnd={() => mediaType !== 'text' && mediaType !== 'audio' && setShowFullPost(true)}
        style={mediaType !== 'text' && mediaType !== 'audio' ? styles.touchable : undefined}
      >
        <PostContent
          content={content}
          caption={caption}
          mediaType={mediaType}
          isExpanded={isExpanded}
          setIsExpanded={setIsExpanded}
        />
      </View>

      <PostActions
        postId="1"
        onComment={() => setShowComments(true)}
      />

      <Dialog
        visible={showComments}
        onDismiss={() => setShowComments(false)}
        title="コメント"
        content={
          <PostComments
            postId="1"
            comments={[
              {
                id: '1',
                author: {
                  name: 'テストユーザー',
                  image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=test',
                },
                content: '素晴らしい投稿ですね！',
                createdAt: new Date().toISOString(),
              },
            ]}
          />
        }
      />

      <Dialog
        visible={showFullPost}
        onDismiss={() => setShowFullPost(false)}
        content={
          <View style={styles.fullPost}>
            <PostContent
              content={content}
              mediaType={mediaType}
              isExpanded={true}
              setIsExpanded={setIsExpanded}
            />
            <View style={styles.fullPostInfo}>
              <PostHeader author={author} />
              {caption && (
                <View style={styles.caption}>
                  <PostContent
                    content={caption}
                    mediaType="text"
                    isExpanded={true}
                    setIsExpanded={setIsExpanded}
                  />
                </View>
              )}
              <PostActions
                postId="1"
                onComment={() => setShowComments(true)}
              />
            </View>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    borderRadius: 12,
    padding: 16,
    gap: 16,
    borderWidth: 1,
    borderColor: colors.border,
  },
  touchable: {
    cursor: 'pointer',
  },
  fullPost: {
    gap: 16,
  },
  fullPostInfo: {
    gap: 16,
  },
  caption: {
    paddingHorizontal: 16,
  },
}); 