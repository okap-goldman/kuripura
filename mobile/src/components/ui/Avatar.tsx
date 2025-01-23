import React from 'react';
import { Image, View, StyleSheet } from 'react-native';
import { colors } from '../../styles/theme';

interface AvatarProps {
  source: { uri: string };
  size?: number;
}

export function Avatar({ source, size = 40 }: AvatarProps) {
  return (
    <View style={[styles.container, { width: size, height: size }]}>
      <Image
        source={source}
        style={[styles.image, { width: size, height: size }]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 9999,
    overflow: 'hidden',
    backgroundColor: colors.border,
  },
  image: {
    borderRadius: 9999,
  },
});