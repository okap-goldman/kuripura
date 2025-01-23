import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Avatar } from '../../components/ui/avatar';
import { colors } from '../../styles/theme';

interface PostHeaderProps {
  author: {
    name: string;
    image: string;
    id?: string;
  };
}

export function PostHeader({ author }: PostHeaderProps) {
  return (
    <View style={styles.container}>
      <Avatar source={{ uri: author.image }} size={40} />
      <View style={styles.info}>
        <Text style={styles.name}>{author.name}</Text>
        <Text style={styles.id}>
          {author.id || `@${author.name.toLowerCase().replace(/\s+/g, '')}`}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  info: {
    flex: 1,
  },
  name: {
    fontWeight: '600',
    fontSize: 16,
    color: colors.text,
  },
  id: {
    fontSize: 14,
    color: colors.textMuted,
  },
});