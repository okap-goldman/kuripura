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
          return React.cloneElement(child, { currentValue: value, onValueChange });
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
  list: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  trigger: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
  },
  triggerSelected: {
    borderBottomWidth: 2,
    borderBottomColor: '#3b82f6',
  },
  triggerText: {
    fontSize: 14,
    color: '#6b7280',
  },
  triggerTextSelected: {
    color: '#3b82f6',
    fontWeight: '600',
  },
  content: {
    padding: 16,
  },
});
