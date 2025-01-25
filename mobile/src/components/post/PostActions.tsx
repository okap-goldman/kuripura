import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { colors } from '../../styles/theme';
import { Dialog } from '../ui/Dialog';

interface PostActionsProps {
  postId: string;
  onComment: () => void;
}

export function PostActions({ postId, onComment }: PostActionsProps) {
  const [liked, setLiked] = useState(false);
  const [kuratta, setKuratta] = useState(false);
  const [showKurattaDialog, setShowKurattaDialog] = useState(false);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => setLiked(!liked)}
      >
        <Feather
          name="heart"
          size={20}
          color={liked ? colors.error : colors.textMuted}
        />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={onComment}
      >
        <Feather
          name="message-square"
          size={20}
          color={colors.textMuted}
        />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => !kuratta && setShowKurattaDialog(true)}
        disabled={kuratta}
      >
        <Feather
          name="flame"
          size={20}
          color={kuratta ? colors.warning : colors.textMuted}
        />
      </TouchableOpacity>

      <Dialog
        visible={showKurattaDialog}
        onDismiss={() => setShowKurattaDialog(false)}
        title="どんなことが魂に響きましたか？"
        actions={[
          {
            label: '心に響いた',
            onPress: () => {
              setKuratta(true);
              setShowKurattaDialog(false);
            },
          },
          {
            label: '共感した',
            onPress: () => {
              setKuratta(true);
              setShowKurattaDialog(false);
            },
          },
          {
            label: '感動した',
            onPress: () => {
              setKuratta(true);
              setShowKurattaDialog(false);
            },
          },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  button: {
    padding: 8,
  },
});