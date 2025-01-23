import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface PostActionsProps {
  postId: string;
  onComment: () => void;
  testID?: string;
}

export function PostActions({ postId, onComment, testID }: PostActionsProps) {
  return (
    <View style={styles.container} testID={testID}>
      <TouchableOpacity
        style={styles.actionButton}
        onPress={() => {/* いいね機能の実装 */}}
        testID={`${testID}-like-button`}
      >
        <Text>❤️</Text>
        <Text style={styles.actionText}>いいね</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.actionButton}
        onPress={onComment}
        testID={`${testID}-comment-button`}
      >
        <Text>💭</Text>
        <Text style={styles.actionText}>コメント</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.actionButton}
        onPress={() => {/* シェア機能の実装 */}}
        testID={`${testID}-share-button`}
      >
        <Text>🔄</Text>
        <Text style={styles.actionText}>シェア</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.actionButton}
        onPress={() => {/* ブックマーク機能の実装 */}}
        testID={`${testID}-save-button`}
      >
        <Text>🔖</Text>
        <Text style={styles.actionText}>保存</Text>
      </TouchableOpacity>
    </View>
  );
}

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
  },
  actionText: {
    fontSize: 14,
    color: '#64748b',
  },
});