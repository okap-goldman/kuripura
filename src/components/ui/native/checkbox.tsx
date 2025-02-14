import React from 'react';
import { TouchableOpacity, View, StyleSheet } from 'react-native';
import { Check } from 'lucide-react-native';

interface CheckboxProps {
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  disabled?: boolean;
}

export const Checkbox = ({ checked = false, onCheckedChange, disabled }: CheckboxProps) => {
  return (
    <TouchableOpacity
      onPress={() => onCheckedChange?.(!checked)}
      disabled={disabled}
      style={styles.container}
    >
      <View style={[styles.checkbox, checked && styles.checked]}>
        {checked && <Check size={16} color="#fff" />}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  checkbox: {
    alignItems: 'center',
    borderColor: '#d1d5db',
    borderRadius: 4,
    borderWidth: 2,
    height: 20,
    justifyContent: 'center',
    width: 20,
  },
  checked: {
    backgroundColor: '#3b82f6',
    borderColor: '#3b82f6',
  },
  container: {
    padding: 2,
  },
});
