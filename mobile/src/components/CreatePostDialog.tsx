import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { colors } from '../styles/theme';
import { Dialog } from './ui/dialog';

interface CreatePostDialogProps {
  visible: boolean;
  onDismiss: () => void;
}

export function CreatePostDialog({ visible, onDismiss }: CreatePostDialogProps) {
  const postTypes = [
    { icon: 'video', label: '動画・画像', value: 'media' },
    { icon: 'mic', label: '音声', value: 'audio' },
    { icon: 'book', label: 'テキスト', value: 'text' },
    { icon: 'clock', label: 'ストーリーズ', value: 'story' },
  ];

  const handlePostTypeSelect = (type: string) => {
    console.log('Selected post type:', type);
    // TODO: 投稿作成ロジックを実装
    onDismiss();
  };

  return (
    <Dialog
      visible={visible}
      onDismiss={onDismiss}
      title="新規投稿を作成"
      content={
        <View style={styles.grid}>
          {postTypes.map(({ icon, label, value }) => (
            <TouchableOpacity
              key={value}
              style={styles.button}
              onPress={() => handlePostTypeSelect(value)}
            >
              <Feather name={icon} size={32} color={colors.text} />
              <Text style={styles.label}>{label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      }
    />
  );
}

const styles = StyleSheet.create({
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  button: {
    width: '47%',
    aspectRatio: 1,
    backgroundColor: colors.backgroundLight,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  label: {
    fontSize: 14,
    color: colors.text,
    textAlign: 'center',
  },
}); 