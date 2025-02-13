import { View, Text, StyleSheet } from 'react-native';
import { Avatar } from '@/components/ui/native/avatar';

interface ChatMessageProps {
  message: {
    id: string;
    role: 'user' | 'assistant';
    content: string;
  };
}

export default function ChatMessage({ message }: ChatMessageProps) {
  const isAssistant = message.role === 'assistant';

  return (
    <View style={[
      styles.container,
      isAssistant ? styles.assistantContainer : styles.userContainer
    ]}>
      <Avatar
        style={styles.avatar}
        source={{ 
          uri: isAssistant 
            ? '/ai-avatar.png'
            : 'https://api.dicebear.com/7.x/avataaars/svg?seed=user'
        }}
        fallback={isAssistant ? 'AI' : 'Me'}
      />

      <View style={[
        styles.messageContainer,
        isAssistant ? styles.assistantMessage : styles.userMessage
      ]}>
        <Text style={[
          styles.messageText,
          isAssistant ? styles.assistantText : styles.userText
        ]}>
          {message.content}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  assistantContainer: {
    flexDirection: 'row',
  },
  assistantMessage: {
    backgroundColor: '#f3f4f6',
  },
  assistantText: {
    color: '#111827',
  },
  avatar: {
    height: 32,
    width: 32,
  },
  container: {
    flexDirection: 'row',
    gap: 12,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  messageContainer: {
    borderRadius: 8,
    maxWidth: '80%',
    padding: 16,
  },
  messageText: {
    fontSize: 14,
  },
  userContainer: {
    flexDirection: 'row-reverse',
  },
  userMessage: {
    backgroundColor: '#3b82f6',
  },
  userText: {
    color: '#ffffff',
  },
}); 