import { View, StyleSheet } from 'react-native';
import { Home, User, Compass, Calendar, Plus } from 'lucide-react-native';
import { Button } from '@/components/ui/native/button';
import { router } from 'expo-router';

export default function Footer() {
  return (
    <View style={styles.footer}>
      <View style={styles.container}>
        <View style={styles.nav}>
          <Button
            variant="outline"
            onPress={() => router.replace('/(tabs)/' as any)}
          >
            <Home size={20} color="#6b7280" />
          </Button>
          
          <Button
            variant="outline"
            onPress={() => router.replace('/(tabs)/profile' as any)}
          >
            <User size={20} color="#6b7280" />
          </Button>
          
          <Button
            variant="default"
            style={styles.postButton}
            onPress={() => router.replace('/(tabs)/post' as any)}
          >
            <Plus size={20} color="#fff" />
          </Button>
          
          <Button
            variant="outline"
            onPress={() => router.replace('/(tabs)/discover' as any)}
          >
            <Compass size={20} color="#6b7280" />
          </Button>
          
          <Button
            variant="outline"
            onPress={() => router.replace('/(tabs)/events' as any)}
          >
            <Calendar size={20} color="#6b7280" />
          </Button>
        </View>
      </View>
    </View>
  );
}  