import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Home, Search, PlusSquare, Compass, User, Calendar } from "lucide-react-native";
import { router, usePathname } from 'expo-router';
import { useState } from "react";
import { CreatePostDialog } from "./CreatePostDialog";

export function FooterNav() {
  const pathname = usePathname();
  const [isCreatePostOpen, setIsCreatePostOpen] = useState(false);

  const isActive = (path: string) => pathname === path;

  return (
    <>
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.tab}
          onPress={() => router.push('/' as any)}
        >
          <Home size={24} color={isActive('/') ? '#3b82f6' : '#6b7280'} />
        </TouchableOpacity>
        
        <TouchableOpacity
          style={styles.tab}
          onPress={() => router.push('/search' as any)}
        >
          <Search size={24} color={isActive('/search') ? '#3b82f6' : '#6b7280'} />
        </TouchableOpacity>
        
        <TouchableOpacity
          style={styles.tab}
          onPress={() => setIsCreatePostOpen(true)}
        >
          <PlusSquare size={24} color="#6b7280" />
        </TouchableOpacity>
        
        <TouchableOpacity
          style={styles.tab}
          onPress={() => router.push('/discover' as any)}
        >
          <Compass size={24} color={isActive('/discover') ? '#3b82f6' : '#6b7280'} />
        </TouchableOpacity>
        
        <TouchableOpacity
          style={styles.tab}
          onPress={() => router.push('/events' as any)}
        >
          <Calendar size={24} color={isActive('/events') ? '#3b82f6' : '#6b7280'} />
        </TouchableOpacity>
        
        <TouchableOpacity
          style={styles.tab}
          onPress={() => router.push('/profile' as any)}
        >
          <User size={24} color={isActive('/profile') ? '#3b82f6' : '#6b7280'} />
        </TouchableOpacity>
      </View>

      <CreatePostDialog 
        isOpen={isCreatePostOpen}
        onClose={() => setIsCreatePostOpen(false)}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#fff',
    borderTopColor: '#e5e7eb',
    borderTopWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  tab: {
    padding: 8,
  },
});
