import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Textarea } from '@/components/ui/native/textarea';

interface RichTextEditorProps {
  content: {
    text: string;
    html: string;
  };
  onChange: (content: { text: string; html: string }) => void;
}

export const RichTextEditor = ({ content, onChange }: RichTextEditorProps) => {
  return (
    <View style={styles.container}>
      <Textarea
        value={content.text}
        onChangeText={(text) => onChange({ text, html: text })}
        placeholder="投稿内容を入力"
        multiline
        numberOfLines={10}
        style={styles.textarea}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  textarea: {
    minHeight: 200,
  },
});
