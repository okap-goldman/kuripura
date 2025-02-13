import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface TabsProps {
  value: string;
  onValueChange: (value: string) => void;
  children: React.ReactNode;
}

export const Tabs = ({ value, onValueChange, children }: TabsProps) => {
  return (
    <View style={styles.container}>
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child as React.ReactElement, { currentValue: value, onValueChange });
        }
        return child;
      })}
    </View>
  );
};

interface TabsListProps {
  children: React.ReactNode;
  value?: string;
  onValueChange?: (value: string) => void;
}

export const TabsList = ({ children }: TabsListProps) => {
  return (
    <View style={styles.list}>
      {children}
    </View>
  );
};

interface TabsTriggerProps {
  value: string;
  children: React.ReactNode;
  currentValue?: string;
  onValueChange?: (value: string) => void;
}

export const TabsTrigger = ({ value, children, currentValue, onValueChange }: TabsTriggerProps) => {
  const isSelected = value === currentValue;
  
  return (
    <TouchableOpacity
      style={[styles.trigger, isSelected && styles.triggerSelected]}
      onPress={() => onValueChange?.(value)}
    >
      <Text style={[styles.triggerText, isSelected && styles.triggerTextSelected]}>
        {children}
      </Text>
    </TouchableOpacity>
  );
};

interface TabsContentProps {
  value: string;
  children: React.ReactNode;
  currentValue?: string;
}

export const TabsContent = ({ value, children, currentValue }: TabsContentProps) => {
  if (value !== currentValue) return null;
  
  return (
    <View style={styles.content}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  content: {
    padding: 16,
  },
  list: {
    borderBottomColor: '#e5e7eb',
    borderBottomWidth: 1,
    flexDirection: 'row',
  },
  trigger: {
    alignItems: 'center',
    flex: 1,
    paddingVertical: 12,
  },
  triggerSelected: {
    borderBottomColor: '#3b82f6',
    borderBottomWidth: 2,
  },
  triggerText: {
    color: '#6b7280',
    fontSize: 14,
  },
  triggerTextSelected: {
    color: '#3b82f6',
    fontWeight: '600',
  },
});
