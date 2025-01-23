import React from 'react';
import { View, Text, Modal, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { colors } from '../../styles/theme';

interface DialogAction {
  label: string;
  onPress: () => void;
  variant?: 'default' | 'destructive';
}

interface DialogProps {
  visible: boolean;
  onDismiss: () => void;
  title: string;
  content?: React.ReactNode;
  actions?: DialogAction[];
}

export function Dialog({ visible, onDismiss, title, content, actions }: DialogProps) {
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
        <View style={styles.container}>
          <View style={styles.content} onStartShouldSetResponder={() => true}>
            <Text style={styles.title}>{title}</Text>
            {content && (
              <ScrollView style={styles.scrollView}>
                {content}
              </ScrollView>
            )}
            {actions && (
              <View style={styles.actions}>
                {actions.map((action, index) => (
                  <TouchableOpacity
                    key={index}
                    style={[
                      styles.action,
                      action.variant === 'destructive' && styles.destructiveAction,
                    ]}
                    onPress={action.onPress}
                  >
                    <Text
                      style={[
                        styles.actionText,
                        action.variant === 'destructive' && styles.destructiveActionText,
                      ]}
                    >
                      {action.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>
        </View>
      </TouchableOpacity>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: colors.overlay,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width: '90%',
    maxWidth: 500,
  },
  content: {
    backgroundColor: colors.background,
    borderRadius: 12,
    padding: 24,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 16,
  },
  scrollView: {
    maxHeight: 400,
  },
  actions: {
    marginTop: 24,
    gap: 8,
  },
  action: {
    backgroundColor: colors.primary,
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  destructiveAction: {
    backgroundColor: colors.error,
  },
  actionText: {
    color: colors.background,
    fontSize: 16,
    fontWeight: '600',
  },
  destructiveActionText: {
    color: colors.background,
  },
}); 