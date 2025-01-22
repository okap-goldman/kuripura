import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  TouchableOpacityProps,
  View,
} from 'react-native';

interface ButtonProps extends TouchableOpacityProps {
  children: React.ReactNode;
  variant?: 'default' | 'outline' | 'ghost';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  fullWidth?: boolean;
}

export function Button({
  children,
  variant = 'default',
  size = 'default',
  fullWidth = false,
  style,
  ...props
}: ButtonProps) {
  const buttonStyles = [
    styles.base,
    styles[`variant_${variant}`],
    styles[`size_${size}`],
    fullWidth && styles.fullWidth,
    style,
  ];

  return (
    <TouchableOpacity style={buttonStyles} {...props}>
      <View style={styles.content}>{children}</View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  base: {
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  variant_default: {
    backgroundColor: '#2563eb',
  },
  variant_outline: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  variant_ghost: {
    backgroundColor: 'transparent',
  },
  size_default: {
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  size_sm: {
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  size_lg: {
    paddingVertical: 16,
    paddingHorizontal: 24,
  },
  size_icon: {
    width: 40,
    height: 40,
    padding: 0,
  },
  fullWidth: {
    width: '100%',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});