import React from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';

interface AvatarProps {
  source?: string;
  fallback?: string;
  size?: number;
}

export function Avatar({ source, fallback, size = 40 }: AvatarProps) {
  const styles = StyleSheet.create({
    container: {
      width: size,
      height: size,
      borderRadius: size / 2,
      backgroundColor: '#e2e8f0',
      overflow: 'hidden',
      justifyContent: 'center',
      alignItems: 'center',
    },
    image: {
      width: size,
      height: size,
    },
    fallback: {
      fontSize: size / 2,
      color: '#64748b',
      fontWeight: '600',
    },
  });

  if (source) {
    return (
      <View style={styles.container}>
        <Image
          source={{ uri: source }}
          style={styles.image}
          resizeMode="cover"
        />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.fallback}>{fallback}</Text>
    </View>
  );
}