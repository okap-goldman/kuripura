import React, { memo } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface PostActionsProps {
  postId: string;
  isLiked?: boolean;
  onLike?: () => void;
  onComment?: () => void;
  onShare?: () => void;
  onSave?: () => void;
  testID?: string;
}

export const PostActions = memo(function PostActions({
  postId,
  isLiked = false,
  onLike,
  onComment,
  onShare,
  onSave,
  testID,
}: PostActionsProps) {
  return (
    <View style={styles.container} testID={testID}>
      <TouchableOpacity
        style={[styles.actionButton, isLiked && styles.actionButtonActive]}
        onPress={onLike}
        testID={isLiked ? `${testID}-like-button-active` : `${testID}-like-button`}
        accessibilityLabel={isLiked ? 'いいねを取り消す' : 'いいねする'}
        accessibilityRole="button"
      >
        <Text>{isLiked ? '❤️' : '🤍'}</Text>
        <Text style={[styles.actionText, isLiked && styles.actionTextActive]}>
          いいね
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.actionButton}
        onPress={onComment}
        testID={`${testID}-comment-button`}
        accessibilityLabel="コメントを追加"
        accessibilityRole="button"
      >
        <Text>💭</Text>
        <Text style={styles.actionText}>コメント</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.actionButton}
        onPress={onShare}
        testID={`${testID}-share-button`}
        accessibilityLabel="投稿をシェア"
        accessibilityRole="button"
      >
        <Text>🔄</Text>
        <Text style={styles.actionText}>シェア</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.actionButton}
        onPress={onSave}
        testID={`${testID}-save-button`}
        accessibilityLabel="投稿を保存"
        accessibilityRole="button"
      >
        <Text>🔖</Text>
        <Text style={styles.actionText}>保存</Text>
      </TouchableOpacity>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 8,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    padding: 8,
    borderRadius: 8,
  },
  actionButtonActive: {
    backgroundColor: '#fee2e2',
  },
  actionText: {
    fontSize: 14,
    color: '#64748b',
  },
  actionTextActive: {
    color: '#ef4444',
  },
});