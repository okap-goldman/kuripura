import { router } from "expo-router";
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from "react-native";
import { Avatar } from "@/components/ui/native/avatar";
import { FooterNav } from "@/components/FooterNav";

type Message = {
  id: string;
  user: {
    name: string;
    age: number;
    location: string;
    avatarUrl?: string;
  };
  lastMessage: string;
  isAdvice?: boolean;
  unreadCount?: number;
  weeksAgo: number;
  isUndelivered?: boolean;
};

const mockMessages: Message[] = [
  {
    id: "1",
    user: {
      name: "田中",
      age: 25,
      location: "千葉",
      avatarUrl: "/avatars/user1.jpg",
    },
    lastMessage: "withからあなたへのアドバイスが届きました。",
    isAdvice: true,
    unreadCount: 1,
    weeksAgo: 34,
  },
  {
    id: "2",
    user: {
      name: "佐藤",
      age: 22,
      location: "千葉",
      avatarUrl: "/avatars/user2.jpg",
    },
    lastMessage: "メッセージを送信しました",
    weeksAgo: 43,
  },
  {
    id: "3",
    user: {
      name: "鈴木",
      age: 25,
      location: "埼玉",
      avatarUrl: "/avatars/user3.jpg",
    },
    lastMessage: "withからあなたへのアドバイスが届きました。",
    isAdvice: true,
    unreadCount: 3,
    weeksAgo: 57,
  },
  {
    id: "4",
    user: {
      name: "高橋",
      age: 23,
      location: "東京",
      avatarUrl: "/avatars/user4.jpg",
    },
    lastMessage: "メッセージを送信しました",
    weeksAgo: 58,
  },
  {
    id: "5",
    user: {
      name: "山田",
      age: 23,
      location: "神奈川",
      avatarUrl: "/avatars/user5.jpg",
    },
    lastMessage: "withからあなたへのアドバイスが届きました。",
    isAdvice: true,
    unreadCount: 2,
    weeksAgo: 58,
  },
  {
    id: "6",
    user: {
      name: "渡辺",
      age: 28,
      location: "千葉",
      avatarUrl: "/avatars/user6.jpg",
    },
    lastMessage: "withからあなたへのアドバイスが届きました。",
    isAdvice: true,
    unreadCount: 2,
    weeksAgo: 59,
  },
  {
    id: "7",
    user: {
      name: "伊藤",
      age: 21,
      location: "神奈川",
      avatarUrl: "/avatars/user7.jpg",
    },
    lastMessage: "メッセージを送信しました",
    isUndelivered: true,
    weeksAgo: 59,
  },
  {
    id: "8",
    user: {
      name: "中村",
      age: 24,
      location: "東京",
      avatarUrl: "/avatars/user8.jpg",
    },
    lastMessage: "メッセージを送信しました",
    weeksAgo: 59,
  },
  {
    id: "9",
    user: {
      name: "小林",
      age: 24,
      location: "東京",
      avatarUrl: "/avatars/user9.jpg",
    },
    lastMessage: "メッセージを送信しました",
    weeksAgo: 60,
  },
];

export const MessagesPage = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}><Text>トーク</Text></Text>
        <View style={styles.headerRight}>
          <Text style={styles.count}>9</Text>
        </View>
      </View>
      <ScrollView style={styles.messageList}>
        {mockMessages.map((message) => (
          <TouchableOpacity
            key={message.id}
            onPress={() => router.push(`/(app)/chat/${message.id}` as any)}
            style={styles.messageItem}
          >
            <Avatar 
              style={styles.avatar}
              source={{ uri: message.user.avatarUrl }}
              fallback={message.user.name[0]}
            />
            <View style={styles.messageContent}>
              <View style={styles.messageHeader}>
                <Text style={styles.userName}>
                  {message.user.name}
                </Text>
                <Text style={styles.userInfo}>
                  {message.user.age}歳 {message.user.location}
                </Text>
                {message.isUndelivered && (
                  <View style={styles.undeliveredBadge}>
                    <Text style={styles.undeliveredText}><Text>未返信</Text></Text>
                  </View>
                )}
                <Text style={styles.timeAgo}>
                  {message.weeksAgo}週間前
                </Text>
              </View>
              <View style={styles.messageFooter}>
                <Text style={styles.lastMessage} numberOfLines={1}>
                  {message.lastMessage}
                </Text>
                {message.unreadCount && (
                  <View style={[styles.unreadBadge, { backgroundColor: '#ef4444' }]}>
                    <Text style={{ color: '#fff' }}>{message.unreadCount}</Text>
                  </View>
                )}
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <FooterNav />
    </View>
  );
};

const styles = StyleSheet.create({
  avatar: {
    height: 48,
    marginRight: 12,
    width: 48,
  },
  container: {
    backgroundColor: '#fff',
    flex: 1,
  },
  count: {
    color: '#6b7280',
    fontSize: 14,
  },
  header: {
    alignItems: 'center',
    borderBottomColor: '#e5e7eb',
    borderBottomWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
  },
  headerRight: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  lastMessage: {
    color: '#6b7280',
    flex: 1,
    fontSize: 14,
  },
  messageContent: {
    flex: 1,
  },
  messageFooter: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  messageHeader: {
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 4,
  },
  messageItem: {
    borderBottomColor: '#e5e7eb',
    borderBottomWidth: 1,
    flexDirection: 'row',
    padding: 16,
  },
  messageList: {
    flex: 1,
  },
  timeAgo: {
    color: '#6b7280',
    fontSize: 12,
    marginLeft: 'auto',
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
  },
  undeliveredBadge: {
    backgroundColor: '#f3f4f6',
    borderRadius: 12,
    marginRight: 8,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  undeliveredText: {
    color: '#6b7280',
    fontSize: 12,
  },
  unreadBadge: {
    alignItems: 'center',
    borderRadius: 10,
    height: 20,
    justifyContent: 'center',
    marginLeft: 8,
    width: 20,
  },
  userInfo: {
    color: '#ef4444',
    fontSize: 14,
    marginRight: 8,
  },
  userName: {
    color: '#ef4444',
    fontSize: 16,
    fontWeight: '600',
    marginRight: 8,
  },
});           