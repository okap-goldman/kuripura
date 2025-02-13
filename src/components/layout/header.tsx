import { Bell, MessageCircle, Settings, LogOut } from 'lucide-react-native';
import { Button } from '@/components/ui/native/button';
import { router } from 'expo-router';
import { useAuth } from '@/contexts/AuthContext';
import { Alert, View, Text, StyleSheet } from 'react-native';

export default function Header() {
  const { user, logout } = useAuth();

  if (!user) {
    return null;
  }

  const handleLogout = async () => {
    try {
      await logout();
      Alert.alert(
        "ログアウトしました",
        "ご利用ありがとうございました"
      );
      router.replace('/auth/login' as any);
    } catch (error) {
      Alert.alert(
        "ログアウトに失敗しました",
        "もう一度お試しください"
      );
    }
  };

  return (
    <View style={styles.header}>
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}><Text>目醒め人</Text></Text>
        </View>
        
        <View style={styles.actions}>
          <Button
            variant="outline"
            onPress={() => router.push('/notifications' as any)}
          >
            <View style={styles.iconContainer}>
              <Bell size={20} color="#000" />
              <View style={styles.badge} />
            </View>
          </Button>
          
          <Button variant="outline">
            <View style={styles.iconContainer}>
              <MessageCircle size={20} color="#000" />
              <View style={styles.badge} />
            </View>
          </Button>
          
          <Button variant="outline">
            <Settings size={20} color="#000" />
          </Button>

          <Button
            variant="outline"
            onPress={handleLogout}
          >
            <LogOut size={20} color="#ef4444" />
          </Button>
        </View>
      </View>
    </View>
  );
}
