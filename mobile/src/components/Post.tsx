import React, { useState } from 'react';
import { View, StyleSheet, Modal } from 'react-native';
import { Card } from './ui/Card';
import { PostHeader } from './post/PostHeader';
import { PostContent } from './post/PostContent';
import { PostActions } from './post/PostActions';
import { PostComments } from './post/PostComments';

interface PostProps {
  author: {
    name: string;
    image: string;
    id: string;
  };
  content: string;
  caption?: string;
  mediaType: 'text' | 'image' | 'video' | 'audio';
  testID?: string;
}

export function Post({ author, content, caption, mediaType, testID }: PostProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [showFullPost, setShowFullPost] = useState(false);

  return (
    <Card>
      <View style={styles.container} testID={testID}>
        <PostHeader
          author={author}
          testID={`${testID}-header`}
        />
        
        <View
          onTouchEnd={() =>
            mediaType !== 'text' &&
            mediaType !== 'audio' &&
            setShowFullPost(true)
          }
          style={styles.contentContainer}
          testID={`${testID}-content-container`}
        >
          <PostContent
            content={content}
            caption={caption}
            mediaType={mediaType}
            isExpanded={isExpanded}
            setIsExpanded={setIsExpanded}
            testID={`${testID}-content`}
          />
        </View>

        <PostActions
          postId="1"
          onComment={() => setShowComments(true)}
          testID={`${testID}-actions`}
        />

        <Modal
          visible={showComments}
          animationType="slide"
          onRequestClose={() => setShowComments(false)}
        >
          <View style={styles.modalContent}>
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
          </View>
        </Modal>

        <Modal
          visible={showFullPost}
          animationType="fade"
          onRequestClose={() => setShowFullPost(false)}
        >
          <View style={styles.modalContent}>
            <View style={styles.fullPostContainer}>
              <PostContent
                content={content}
                mediaType={mediaType}
                isExpanded={true}
                setIsExpanded={setIsExpanded}
              />
              <View style={styles.fullPostDetails}>
                <PostHeader author={author} />
                {caption && (
                  <View style={styles.captionContainer}>
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
          </View>
        </Modal>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 16,
  },
  contentContainer: {
    width: '100%',
  },
  modalContent: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  fullPostContainer: {
    flex: 1,
    gap: 16,
  },
  fullPostDetails: {
    gap: 16,
  },
  captionContainer: {
    paddingHorizontal: 16,
  },
});