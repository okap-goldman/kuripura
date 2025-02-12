import { Link } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

export default function Page() {
  return (
    <View className="flex-1 items-center justify-center bg-white dark:bg-black">
      <Text className="text-xl font-bold text-black dark:text-white">
        Welcome to Kuripura
      </Text>
      <Link href="/auth/login" className="mt-4">
        <Text className="text-blue-500">Login</Text>
      </Link>
    </View>
  );
} 