import { Link } from 'expo-router';
import { useState } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // TODO: Implement login logic
    console.log('Login:', { email, password });
  };

  return (
    <View className="flex-1 items-center justify-center bg-white dark:bg-black p-4">
      <Text className="text-2xl font-bold mb-8 text-black dark:text-white">
        Login
      </Text>
      
      <TextInput
        className="w-full bg-gray-100 dark:bg-gray-800 rounded-lg p-4 mb-4 text-black dark:text-white"
        placeholder="Email"
        placeholderTextColor="#666"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      
      <TextInput
        className="w-full bg-gray-100 dark:bg-gray-800 rounded-lg p-4 mb-6 text-black dark:text-white"
        placeholder="Password"
        placeholderTextColor="#666"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      
      <TouchableOpacity
        className="w-full bg-blue-500 rounded-lg p-4 mb-4"
        onPress={handleLogin}
      >
        <Text className="text-white text-center font-bold">
          Login
        </Text>
      </TouchableOpacity>
      
      <Link href="/auth/register">
        <Text className="text-blue-500">
          Don't have an account? Register
        </Text>
      </Link>
    </View>
  );
} 