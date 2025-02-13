import { Button } from "@/components/ui/native/button";
import { ArrowLeft } from "lucide-react-native";
import { router } from "expo-router";
import { View, Text, StyleSheet, ScrollView } from "react-native";

export default function NotificationsPage() {
  // モックのお知らせデータ
  const notifications = [
    {
      id: "1",
      message: "あなたの投稿に新しいコメントが付きました。",
      isRead: false,
      createdAt: "2024-02-01T10:00:00",
    },
    {
      id: "2",
      message: "誰かがあなたをフォローしました。",
      isRead: true,
      createdAt: "2024-01-31T15:30:00",
    },
    {
      id: "3",
      message: "新しいイベントが作成されました。",
      isRead: false,
      createdAt: "2024-01-30T09:45:00",
    },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Button variant="outline" size="icon" onPress={() => router.back()}>
          <ArrowLeft size={20} color="#000" />
        </Button>
        <Text style={styles.title}><Text>お知らせ</Text></Text>
      </View>
      <ScrollView style={styles.content}>
        {notifications.map((notification) => (
          <View key={notification.id} style={styles.card}>
            <View style={styles.cardContent}>
              <Text style={styles.message}>{notification.message}</Text>
              <Text style={styles.timestamp}>
                {new Date(notification.createdAt).toLocaleString()}
              </Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    elevation: 2,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardContent: {
    padding: 16,
  },
  container: {
    backgroundColor: '#fff',
    flex: 1,
  },
  content: {
    padding: 16,
  },
  header: {
    alignItems: 'center',
    borderBottomColor: '#e5e7eb',
    borderBottomWidth: 1,
    flexDirection: 'row',
    padding: 16,
  },
  message: {
    fontSize: 14,
  },
  timestamp: {
    color: '#666',
    fontSize: 12,
    marginTop: 4,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 16,
  },
});
