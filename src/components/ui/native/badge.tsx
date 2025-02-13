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
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 16,
  },
  default: {
    backgroundColor: '#e5e7eb',
  },
  destructive: {
    backgroundColor: '#ef4444',
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  text: {
    fontSize: 12,
    fontWeight: '500',
  },
  defaultText: {
    color: '#374151',
  },
  destructiveText: {
    color: '#ffffff',
  },
  outlineText: {
    color: '#374151',
  },
});
