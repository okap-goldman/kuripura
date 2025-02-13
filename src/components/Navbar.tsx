import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Bell, MessageCircle, User } from "lucide-react-native";
import { Avatar } from "@/components/ui/native/avatar";
import { router } from 'expo-router';
import { useAuth } from '@/contexts/AuthContext';

export function Navbar() {
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      Alert.alert("ログアウトしました", "ご利用ありがとうございました");
      router.replace('/(auth)/login' as any);
    } catch (error) {
      Alert.alert("エラー", "ログアウトに失敗しました。もう一度お試しください。");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Kuripura</Text>
      
      <View style={styles.actions}>
        <TouchableOpacity
          style={styles.iconButton}
          onPress={() => router.push('/notifications' as any)}
        >
          <Bell size={20} color="#000" />
        </TouchableOpacity>
        
        <TouchableOpacity
          style={styles.iconButton}
          onPress={() => router.push('/messages' as any)}
        >
          <MessageCircle size={20} color="#000" />
        </TouchableOpacity>
        
        {user ? (
          <TouchableOpacity
            style={styles.iconButton}
            onPress={handleLogout}
          >
            <Avatar
              source={{ uri: user.email || undefined }}
              fallback={user.email?.[0] || 'U'}
              size={32}
            />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.loginButton}
            onPress={() => router.push('/auth/login' as any)}
          >
            <User size={16} color="#000" />
            <Text style={styles.loginText}>ログイン</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  iconButton: {
    padding: 8,
  },
  loginButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    padding: 8,
    borderRadius: 8,
    backgroundColor: '#f3f4f6',
  },
  loginText: {
    fontSize: 14,
    fontWeight: '500',
  },
});
