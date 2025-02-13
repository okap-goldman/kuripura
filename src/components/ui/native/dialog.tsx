import React from 'react';
import { Modal, View, StyleSheet, TouchableOpacity, Text } from 'react-native';

interface DialogProps {
  visible: boolean;
  onDismiss: () => void;
  children: React.ReactNode;
}

export const Dialog: React.FC<DialogProps> = ({ visible, onDismiss, children }) => {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onDismiss}
    >
      <TouchableOpacity
        style={styles.overlay}
        activeOpacity={1}
        onPress={onDismiss}
      >
        <View style={styles.content} onStartShouldSetResponder={() => true}>
          {children}
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  content: {
    backgroundColor: '#fff',
    borderRadius: 8,
    maxWidth: 500,
    padding: 16,
    width: '100%',
  },
  overlay: {
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
});
