import React, { useState } from 'react';
import { Link } from 'expo-router';
import { Text, View, StyleSheet } from 'react-native';
import { Input } from '@/components/ui/native/input';
import { Button } from '@/components/ui/native/button';

export default function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleRegister = () => {
    // TODO: Implement register logic
    console.log('Register:', { email, password, confirmPassword });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        アカウント登録
      </Text>
      
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

      <Input
        style={styles.input}
        placeholder="パスワード（確認）"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
      />
      
      <Button
        style={styles.button}
        onPress={handleRegister}
      >
        登録する
      </Button>
      
      <Link href="/auth/login">
        <Text style={styles.linkText}>
          すでにアカウントをお持ちの方はこちら
        </Text>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    marginBottom: 16
  },
  container: {
    alignItems: 'center',
    backgroundColor: '#fff',
    flex: 1,
    justifyContent: 'center',
    padding: 16
  },
  input: {
    marginBottom: 16
  },
  linkText: {
    color: '#3b82f6',
    fontSize: 14,
    marginTop: 8,
    textAlign: 'center'
  },
  title: {
    color: '#000',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 32
  }
});
