import React, { useState } from 'react';
import { Link } from 'expo-router';
import { Text, View, StyleSheet } from 'react-native';
import { Input } from '@/components/ui/native/input';
import { Button } from '@/components/ui/native/button';
import { colors } from '@/lib/colors';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // TODO: Implement login logic
    console.log('Login:', { email, password });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>ログイン</Text>
      
      <Input
        style={styles.input}
        placeholder="メールアドレス"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      
      <Input
        style={styles.input}
        placeholder="パスワード"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      
      <Button
        onPress={handleLogin}
        style={styles.button}
      >
        <Text>ログイン</Text>
      </Button>
      
      <Link href="/auth/register" asChild>
        <Text style={styles.linkText}>アカウントをお持ちでない方はこちら</Text>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    marginBottom: 16,
    width: '100%'
  },
  container: {
    alignItems: 'center',
    backgroundColor: colors.background,
    flex: 1,
    justifyContent: 'center',
    padding: 16
  },
  input: {
    marginBottom: 16,
    width: '100%'
  },
  linkText: {
    color: colors.primary,
    marginTop: 8
  },
  title: {
    color: colors.text,
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 32
  }
});
