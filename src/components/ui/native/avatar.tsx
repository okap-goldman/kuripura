import React from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';

interface AvatarProps {
  source?: { uri: string };
  fallback?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const Avatar = ({ source, fallback, size = 'md' }: AvatarProps) => {
  return (
    <View style={[styles.container, styles[size]]}>
      {source ? (
        <Image source={source} style={[styles.image, styles[size]]} />
      ) : (
        <Text style={[styles.fallback, styles[`${size}Text`]]}>
          {fallback?.[0] || '?'}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 9999,
    overflow: 'hidden',
    backgroundColor: '#e5e7eb',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  sm: {
    width: 24,
    height: 24,
  },
  md: {
    width: 40,
    height: 40,
  },
  lg: {
    width: 64,
    height: 64,
  },
  fallback: {
    color: '#6b7280',
    fontWeight: '500',
  },
  smText: {
    fontSize: 12,
  },
  mdText: {
    fontSize: 16,
  },
  lgText: {
    fontSize: 24,
  },
});
