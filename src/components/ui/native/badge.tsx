import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'destructive' | 'outline';
}

export const Badge = ({ children, variant = 'default' }: BadgeProps) => {
  return (
    <View style={[styles.container, styles[variant]]}>
      <Text style={[styles.text, styles[`${variant}Text`]]}>
        {children}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  default: {
    backgroundColor: '#e5e7eb',
  },
  defaultText: {
    color: '#374151',
  },
  destructive: {
    backgroundColor: '#ef4444',
  },
  destructiveText: {
    color: '#ffffff',
  },
  outline: {
    backgroundColor: 'transparent',
    borderColor: '#e5e7eb',
    borderWidth: 1,
  },
  outlineText: {
    color: '#374151',
  },
  text: {
    fontSize: 12,
    fontWeight: '500',
  },
});
