import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface TooltipProviderProps {
  children: React.ReactNode;
}

export const TooltipProvider = ({ children }: TooltipProviderProps) => {
  return <>{children}</>;
};

export const Tooltip = ({ children }: { children: React.ReactNode }) => {
  return (
    <View style={styles.tooltip}>
      <Text style={styles.text}>{children}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  tooltip: {
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    padding: 8,
    borderRadius: 4,
    position: 'absolute',
  },
  text: {
    color: '#fff',
    fontSize: 12,
  },
});
