import React from 'react';
import { TouchableOpacity, Text, StyleSheet, StyleProp, ViewStyle } from 'react-native';

interface ButtonProps {
  onPress?: () => void;
  children: React.ReactNode;
  variant?: 'default' | 'destructive' | 'outline';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  style?: StyleProp<ViewStyle>;
  containerStyle?: StyleProp<ViewStyle>;
  disabled?: boolean;
}

export const Button = ({ 
  onPress, 
  children, 
  variant = 'default',
  size = 'default',
  style,
  containerStyle,
  disabled = false,
}: ButtonProps) => {
  return (
    <TouchableOpacity 
      style={[
        styles.button,
        styles[variant],
        styles[size],
        disabled && styles.disabled,
        style,
        containerStyle
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
    borderRadius: 8,
    justifyContent: 'center',
  },
  default: {
    backgroundColor: '#3b82f6',
  },
  defaultText: {
    color: '#ffffff',
  },
  destructive: {
    backgroundColor: '#ef4444',
  },
  destructiveText: {
    color: '#ffffff',
  },
  disabled: {
    opacity: 0.5,
  },
  disabledText: {
    color: '#9ca3af',
  },
  icon: {
    height: 36,
    padding: 8,
    width: 36,
  },
  iconText: {
    fontSize: 20,
  },
  lg: {
    padding: 16,
  },
  lgText: {
    fontSize: 18,
  },
  md: {
    padding: 12,
  },
  outline: {
    backgroundColor: 'transparent',
    borderColor: '#3b82f6',
    borderWidth: 1,
  },
  outlineText: {
    color: '#3b82f6',
  },
  sm: {
    padding: 8,
  },
  smText: {
    fontSize: 14,
  },
  text: {
    fontSize: 16,
    fontWeight: '600',
  },
});
