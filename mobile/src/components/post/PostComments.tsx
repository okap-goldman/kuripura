import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { colors } from '../../styles/theme';
import { Avatar } from '../../components/ui/avatar';

interface Comment {
  id: string;
  author: {
    name: string;
    image: string;
  };
  content: string;
  createdAt: string;
  likes?: number;
}

interface PostCommentsProps {
  postId: string;
  comments: Comment[];
}

export function PostComments({ postId, comments: initialComments }: PostCommentsProps) {
  const [comments, setComments] = useState<Comment[]>(initialComments);
  const [newComment, setNewComment] = useState('');

  const handleSubmitComment = () => {
    if (!newComment.trim()) return;

    const comment: Comment = {
      id: Date.now().toString(),
      author: {
        name: '現在のユーザー',
        image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=current',
      },
      content: newComment,
      createdAt: new Date().toISOString(),
      likes: 0,
    };

    setComments([...comments, comment]);
    setNewComment('');
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.commentsList}>
        {comments.map((comment) => (
          <View key={comment.id} style={styles.commentItem}>
            <Avatar source={{ uri: comment.author.image }} size={32} />
            <View style={styles.commentContent}>
              <View style={styles.commentHeader}>
                <Text style={styles.authorName}>{comment.author.name}</Text>
                <Text style={styles.timestamp}>
                  {new Date(comment.createdAt).toLocaleDateString()}
                </Text>
              </View>
              <Text style={styles.commentText}>{comment.content}</Text>
              {comment.likes !== undefined && (
                <Text style={styles.likesCount}>
                  {comment.likes.toLocaleString()} いいね
                </Text>
              )}
            </View>
          </View>
        ))}
      </ScrollView>

      <View style={styles.inputContainer}>
        <Avatar
          source={{ uri: 'https://api.dicebear.com/7.x/avataaars/svg?seed=current' }}
          size={32}
        />
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.input}
            value={newComment}
            onChangeText={setNewComment}
            placeholder="コメントを追加..."
            placeholderTextColor={colors.textMuted}
            multiline
          />
          <View style={styles.inputActions}>
            <TouchableOpacity>
              <Feather name="smile" size={20} color={colors.textMuted} />
            </TouchableOpacity>
            <TouchableOpacity>
              <Feather name="gift" size={20} color={colors.textMuted} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  commentsList: {
    maxHeight: '60%',
  },
  commentItem: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 16,
  },
  commentContent: {
    flex: 1,
  },
  commentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  authorName: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
  },
  timestamp: {
    fontSize: 12,
    color: colors.textMuted,
  },
  commentText: {
    fontSize: 14,
    color: colors.text,
    marginTop: 4,
  },
  likesCount: {
    fontSize: 12,
    color: colors.textMuted,
    marginTop: 4,
  },
  inputContainer: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  inputWrapper: {
    flex: 1,
    position: 'relative',
  },
  input: {
    backgroundColor: colors.backgroundLight,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    paddingRight: 80,
    fontSize: 14,
    color: colors.text,
    minHeight: 40,
  },
  inputActions: {
    position: 'absolute',
    right: 12,
    top: '50%',
    transform: [{ translateY: -10 }],
    flexDirection: 'row',
    gap: 8,
  },
});