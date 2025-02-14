import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet, ScrollView } from 'react-native';

interface SelectProps {
  value?: string;
  onValueChange?: (value: string) => void;
  placeholder?: string;
  children: React.ReactNode;
}

interface SelectItemProps {
  value: string;
  children: React.ReactNode;
}

export const Select = ({ value, onValueChange, placeholder, children }: SelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const options = React.Children.toArray(children) as React.ReactElement<SelectItemProps>[];
  const selectedOption = options.find(option => option.props.value === value);

  return (
    <>
      <TouchableOpacity
        style={styles.trigger}
        onPress={() => setIsOpen(true)}
      >
        <Text style={styles.triggerText}>
          {selectedOption?.props.children || placeholder || '選択してください'}
        </Text>
      </TouchableOpacity>

      <Modal
        visible={isOpen}
        transparent
        animationType="slide"
        onRequestClose={() => setIsOpen(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}><Text>選択してください</Text></Text>
              <TouchableOpacity onPress={() => setIsOpen(false)}>
                <Text style={styles.closeButton}><Text>閉じる</Text></Text>
              </TouchableOpacity>
            </View>
            <ScrollView>
              {options.map((option, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.option}
                  onPress={() => {
                    onValueChange?.(option.props.value);
                    setIsOpen(false);
                  }}
                >
                  <Text style={[
                    styles.optionText,
                    option.props.value === value && styles.selectedOption
                  ]}>
                    {option.props.children}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal>
    </>
  );
};

export const SelectItem = ({ value, children }: SelectItemProps) => {
  return null; // This is just a data container
};

const styles = StyleSheet.create({
  closeButton: {
    color: '#3b82f6',
    fontSize: 16,
  },
  modalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    maxHeight: '80%',
  },
  modalHeader: {
    alignItems: 'center',
    borderBottomColor: '#e5e7eb',
    borderBottomWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
  },
  modalOverlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    flex: 1,
    justifyContent: 'flex-end',
  },
  modalTitle: {
    color: '#1f2937',
    fontSize: 18,
    fontWeight: '600',
  },
  option: {
    borderBottomColor: '#e5e7eb',
    borderBottomWidth: 1,
    padding: 16,
  },
  optionText: {
    color: '#1f2937',
    fontSize: 16,
  },
  selectedOption: {
    color: '#3b82f6',
    fontWeight: '600',
  },
  trigger: {
    backgroundColor: '#fff',
    borderColor: '#e5e7eb',
    borderRadius: 8,
    borderWidth: 1,
    padding: 12,
  },
  triggerText: {
    color: '#1f2937',
    fontSize: 16,
  },
});
