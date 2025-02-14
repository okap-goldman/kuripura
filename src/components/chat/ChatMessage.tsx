import { View, Text, StyleSheet } from 'react-native';
import { Avatar } from "@/components/ui/native/avatar";

interface ChatMessageProps {
  isAi?: boolean;
  message: string;
}

export function ChatMessage({ isAi = false, message }: ChatMessageProps) {
  return (
    <View style={[styles.container, isAi ? styles.aiBackground : styles.userBackground]}>
      <Avatar
        style={styles.avatar}
        source={{ uri: isAi ? "/ai-avatar.png" : "/user-avatar.png" }}
        fallback={isAi ? "AI" : "Me"}
      />
      <View style={styles.content}>
        <Text style={styles.name}><Text>{isAi ? "アシスタント" : "あなた"}</Text></Text>
        <Text style={styles.message}>
          {message}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  aiBackground: {
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
  },
  avatar: {
    height: 32,
    width: 32,
  },
  container: {
    flexDirection: 'row',
    gap: 16,
    padding: 24,
  },
  content: {
    flex: 1,
    gap: 8,
  },
  message: {
    color: '#666',
    fontSize: 14,
  },
  name: {
    fontSize: 14,
    fontWeight: '500',
  },
  userBackground: {
    backgroundColor: '#fff',
  },
});
