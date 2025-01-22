import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Avatar } from '../ui/Avatar';

interface Comment {
  id: string;
  author: {
    name: string;
    image: string;
  };
  content: string;
  createdAt: string;
}

interface PostCommentsProps {
  postId: string;
  comments: Comment[];
}

export function PostComments({ postId, comments }: PostCommentsProps) {
  // コメント投稿からの経過時間を計算
  const getTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diffInSeconds < 60) {
      return `${diffInSeconds}秒前`;
    }
    if (diffInSeconds < 3600) {
      return `${Math.floor(diffInSeconds / 60)}分前`;
    }
    if (diffInSeconds < 86400) {
      return `${Math.floor(diffInSeconds / 3600)}時間前`;
    }
    return `${Math.floor(diffInSeconds / 86400)}日前`;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>コメント</Text>
      
      <ScrollView style={styles.commentsList}>
        {comments.map((comment) => (
          <View key={comment.id} style={styles.commentContainer}>
            <Avatar source={comment.author.image} size={32} />
            <View style={styles.commentContent}>
              <View style={styles.commentHeader}>
                <Text style={styles.authorName}>{comment.author.name}</Text>
                <Text style={styles.timestamp}>
                  {getTimeAgo(comment.createdAt)}
                </Text>
              </View>
              <Text style={styles.commentText}>{comment.content}</Text>
              <View style={styles.commentActions}>
                <TouchableOpacity>
                  <Text style={styles.actionText}>返信</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                  <Text style={styles.actionText}>いいね</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 16,
    paddingHorizontal: 16,
  },
  commentsList: {
    flex: 1,
  },
  commentContainer: {
    flexDirection: 'row',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
    gap: 12,
  },
  commentContent: {
    flex: 1,
  },
  commentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 4,
  },
  authorName: {
    fontWeight: '600',
    fontSize: 14,
  },
  timestamp: {
    fontSize: 12,
    color: '#64748b',
  },
  commentText: {
    fontSize: 14,
    lineHeight: 20,
  },
  commentActions: {
    flexDirection: 'row',
    gap: 16,
    marginTop: 8,
  },
  actionText: {
    fontSize: 12,
    color: '#64748b',
  },
});