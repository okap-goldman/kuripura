import React from 'react';
import { Text, StyleSheet } from 'react-native';

interface LabelProps {
  children: React.ReactNode;
  style?: any;
}

export const Label = ({ children, style }: LabelProps) => {
  return (
    <Text style={[styles.label, style]}>
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  label: {
    color: '#374151',
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 4,
  },
});
