import React, { useState, useCallback, memo } from 'react';
import { View, StyleSheet, Modal, Text, TouchableOpacity } from 'react-native';
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

export const Post = memo(function Post({ author, content, caption, mediaType, testID }: PostProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [showFullPost, setShowFullPost] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  const handleContentPress = useCallback(() => {
    if (mediaType !== 'text' && mediaType !== 'audio') {
      setShowFullPost(true);
    }
  }, [mediaType]);

  const handleCommentsPress = useCallback(() => {
    setShowComments(true);
  }, []);

  const handleLikePress = useCallback(() => {
    setIsLiked(prev => !prev);
  }, []);

  const handleCloseComments = useCallback(() => {
    setShowComments(false);
  }, []);

  const handleCloseFullPost = useCallback(() => {
    setShowFullPost(false);
  }, []);

  return (
    <Card testID={`${testID}-card`}>
      <View style={styles.container} testID={testID}>
        <PostHeader
          author={author}
          testID={`${testID}-header`}
        />
        
        <TouchableOpacity
          onPress={handleContentPress}
          activeOpacity={mediaType === 'text' || mediaType === 'audio' ? 1 : 0.7}
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
        </TouchableOpacity>

        <PostActions
          postId="1"
          isLiked={isLiked}
          onLike={handleLikePress}
          onComment={handleCommentsPress}
          testID={`${testID}-actions`}
        />

        <Modal
          visible={showComments}
          animationType="slide"
          onRequestClose={handleCloseComments}
          testID={`${testID}-comments-modal`}
        >
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>コメント</Text>
              <TouchableOpacity
                onPress={handleCloseComments}
                testID={`${testID}-close-comments-button`}
              >
                <Text style={styles.closeButton}>閉じる</Text>
              </TouchableOpacity>
            </View>
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
              testID={`${testID}-comments`}
            />
          </View>
        </Modal>

        <Modal
          visible={showFullPost}
          animationType="fade"
          onRequestClose={handleCloseFullPost}
          testID={`${testID}-full-post-modal`}
        >
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>投稿</Text>
              <TouchableOpacity
                onPress={handleCloseFullPost}
                testID={`${testID}-close-full-post-button`}
              >
                <Text style={styles.closeButton}>閉じる</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.fullPostContainer}>
              <PostContent
                content={content}
                mediaType={mediaType}
                isExpanded={true}
                setIsExpanded={setIsExpanded}
                testID={`${testID}-full-post-content`}
              />
              <View style={styles.fullPostDetails}>
                <PostHeader
                  author={author}
                  testID={`${testID}-full-post-header`}
                />
                {caption && (
                  <View style={styles.captionContainer}>
                    <PostContent
                      content={caption}
                      mediaType="text"
                      isExpanded={true}
                      setIsExpanded={setIsExpanded}
                      testID={`${testID}-full-post-caption`}
                    />
                  </View>
                )}
                <PostActions
                  postId="1"
                  isLiked={isLiked}
                  onLike={handleLikePress}
                  onComment={handleCommentsPress}
                  testID={`${testID}-full-post-actions`}
                />
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </Card>
  );
});

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
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#0f172a',
  },
  closeButton: {
    fontSize: 16,
    color: '#0284c7',
  },
  fullPostContainer: {
    flex: 1,
    gap: 16,
  },
  fullPostDetails: {
    gap: 16,
    padding: 16,
  },
  captionContainer: {
    paddingHorizontal: 16,
  },
});