import React from 'react';
import { Modal, View, Text, StyleSheet, TouchableOpacity } from 'react-native';

interface AlertDialogProps {
  visible: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  action: string;
  onAction: () => void;
  variant?: 'default' | 'destructive';
}

export const AlertDialog: React.FC<AlertDialogProps> = ({
  visible,
  onClose,
  title,
  description,
  action,
  onAction,
  variant = 'default',
}) => {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <TouchableOpacity
        style={styles.overlay}
        activeOpacity={1}
        onPress={onClose}
      >
        <View style={styles.content} onStartShouldSetResponder={() => true}>
          <Text style={styles.title}>{title}</Text>
          {description && <Text style={styles.description}>{description}</Text>}
          
          <View style={styles.actions}>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={onClose}
            >
              <Text style={styles.cancelButtonText}><Text>キャンセル</Text></Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={[
                styles.actionButton,
                variant === 'destructive' && styles.destructiveButton,
              ]}
              onPress={() => {
                onAction();
                onClose();
              }}
            >
              <Text style={[
                styles.actionButtonText,
                variant === 'destructive' && styles.destructiveButtonText,
              ]}>
                {action}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  actionButton: {
    backgroundColor: '#3b82f6',
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  actionButtonText: {
    color: '#fff',
    fontSize: 14,
  },
  actions: {
    flexDirection: 'row',
    gap: 8,
    justifyContent: 'flex-end',
    marginTop: 16,
  },
  cancelButton: {
    backgroundColor: '#f3f4f6',
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  cancelButtonText: {
    color: '#374151',
    fontSize: 14,
  },
  content: {
    backgroundColor: '#fff',
    borderRadius: 8,
    maxWidth: 500,
    padding: 16,
    width: '100%',
  },
  description: {
    color: '#6b7280',
    fontSize: 14,
    marginBottom: 16,
  },
  destructiveButton: {
    backgroundColor: '#ef4444',
  },
  destructiveButtonText: {
    color: '#fff',
  },
  overlay: {
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
});
