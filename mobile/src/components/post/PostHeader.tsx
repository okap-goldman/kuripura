import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Avatar } from '../ui/Avatar';

interface PostHeaderProps {
  author: {
    name: string;
    image: string;
    id?: string;
  };
}

export function PostHeader({ author }: PostHeaderProps) {
  const userId = author.id || `@${author.name.toLowerCase().replace(/\s+/g, '')}`;

  return (
    <View style={styles.container}>
      <Avatar source={author.image} fallback={author.name[0]} />
      <View style={styles.textContainer}>
        <Text style={styles.name}>{author.name}</Text>
        <Text style={styles.userId}>{userId}</Text>
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
  textContainer: {
    justifyContent: 'center',
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
  },
  userId: {
    fontSize: 14,
    color: '#64748b',
  },
});