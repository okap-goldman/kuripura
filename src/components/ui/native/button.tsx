import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

interface ButtonProps {
  onPress?: () => void;
  children: React.ReactNode;
  variant?: 'default' | 'destructive' | 'outline';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  className?: string;
  disabled?: boolean;
}

export const Button = ({ 
  onPress, 
  children, 
  variant = 'default',
  size = 'default',
  disabled = false,
}: ButtonProps) => {
  return (
    <TouchableOpacity 
      style={[
        styles.button,
        styles[variant],
        styles[size],
        disabled && styles.disabled
      ]} 
      onPress={onPress}
      disabled={disabled}
    >
      <Text style={[
        styles.text,
        styles[`${variant}Text`],
        styles[`${size}Text`],
        disabled && styles.disabledText
      ]}>
        {children}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
  },
  default: {
    backgroundColor: '#3b82f6',
  },
  destructive: {
    backgroundColor: '#ef4444',
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#3b82f6',
  },
  sm: {
    padding: 8,
  },
  md: {
    padding: 12,
  },
  lg: {
    padding: 16,
  },
  icon: {
    padding: 8,
    width: 36,
    height: 36,
  },
  disabled: {
    opacity: 0.5,
  },
  text: {
    fontSize: 16,
    fontWeight: '600',
  },
  defaultText: {
    color: '#ffffff',
  },
  destructiveText: {
    color: '#ffffff',
  },
  outlineText: {
    color: '#3b82f6',
  },
  smText: {
    fontSize: 14,
  },
  lgText: {
    fontSize: 18,
  },
  iconText: {
    fontSize: 20,
  },
  disabledText: {
    color: '#9ca3af',
  },
});
