import { View, Text, Image, ScrollView, StyleSheet } from 'react-native';
import { Avatar } from "@/components/ui/native/avatar";

type Message = {
  id: string;
  content: string;
  imageUrl?: string;
  imageType?: "story" | "normal";
  sender: {
    id: string;
    name: string;
    avatarUrl?: string;
  };
  createdAt: string;
  isRead: boolean;
};

type MessageListProps = {
  messages: Message[];
  currentUserId: string;
  onMessageSelect: (messageId: string) => void;
};

export const MessageList = ({ messages, currentUserId, onMessageSelect }: MessageListProps) => {
  const getTimeAgo = (date: string) => {
    const minutes = Math.floor((new Date().getTime() - new Date(date).getTime()) / (1000 * 60));
    if (minutes < 1) return "たった今";
    if (minutes < 60) return `${minutes}分前`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}時間前`;
    const days = Math.floor(hours / 24);
    if (days < 7) return `${days}日前`;
    const weeks = Math.floor(days / 7);
    return `${weeks}週間前`;
  };

  return (
    <ScrollView style={styles.container}>
      {messages.map((message) => {
        const isCurrentUser = message.sender.id === currentUserId;
        return (
          <View
            key={message.id}
            style={[
              styles.messageRow,
              isCurrentUser ? styles.currentUserRow : styles.otherUserRow
            ]}
          >
            {!isCurrentUser && (
              <Avatar
                size="sm"
                source={{ uri: message.sender.avatarUrl }}
                fallback={message.sender.name[0]}
              />
            )}
            <View
              style={[
                styles.messageContent,
                isCurrentUser ? styles.currentUserContent : styles.otherUserContent
              ]}
            >
              {message.imageUrl && (
                <View>
                  <Image
                    source={{ uri: message.imageUrl }}
                    style={[
                      styles.messageImage,
                      message.imageType === "story" ? styles.storyImage : styles.normalImage
                    ]}
                  />
                </View>
              )}
              <View style={styles.textContainer}>
                <Text style={styles.messageText}>{message.content}</Text>
              </View>
            </View>
            <Text style={styles.timestamp}>
              {getTimeAgo(message.createdAt)}
            </Text>
          </View>
        );
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  currentUserContent: {
    backgroundColor: '#3b82f6',
  },
  currentUserRow: {
    flexDirection: 'row-reverse',
  },
  messageContent: {
    borderRadius: 16,
    maxWidth: '70%',
    overflow: 'hidden',
  },
  messageImage: {
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    width: '100%',
  },
  messageRow: {
    alignItems: 'flex-end',
    flexDirection: 'row',
    gap: 8,
    marginBottom: 16,
  },
  messageText: {
    color: '#000',
    fontSize: 14,
  },
  normalImage: {
    height: 200,
  },
  otherUserContent: {
    backgroundColor: '#f3f4f6',
  },
  otherUserRow: {
    flexDirection: 'row',
  },
  storyImage: {
    height: 400,
  },
  textContainer: {
    padding: 8,
  },
  timestamp: {
    color: '#6b7280',
    fontSize: 12,
  },
});   