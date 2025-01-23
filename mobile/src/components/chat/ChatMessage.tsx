import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface ChatMessageProps {
  isAi: boolean;
  message: string;
}

export const ChatMessage = ({ isAi, message }: ChatMessageProps) => {
  return (
    <View style={[styles.container, isAi ? styles.aiContainer : styles.userContainer]}>
      {isAi && (
        <View style={styles.avatarContainer}>
          <Ionicons name="logo-github" size={24} color="#007AFF" />
        </View>
      )}
      <View style={[styles.messageContainer, isAi ? styles.aiMessage : styles.userMessage]}>
        <Text style={[styles.messageText, isAi ? styles.aiText : styles.userText]}>
          {message}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginVertical: 8,
    paddingHorizontal: 16,
  },
  aiContainer: {
    justifyContent: 'flex-start',
  },
  userContainer: {
    justifyContent: 'flex-end',
  },
  avatarContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  messageContainer: {
    maxWidth: '70%',
    borderRadius: 16,
    padding: 12,
  },
  aiMessage: {
    backgroundColor: '#f0f0f0',
  },
  userMessage: {
    backgroundColor: '#007AFF',
  },
  messageText: {
    fontSize: 14,
    lineHeight: 20,
  },
  aiText: {
    color: '#333',
  },
  userText: {
    color: '#fff',
  },
});

export default ChatMessage; 