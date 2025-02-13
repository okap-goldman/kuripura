import React from 'react';
import { Link } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

export default function Page() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Welcome to Kuripura
      </Text>
      <Link href="/auth/login">
        <Text style={styles.linkText}>Login</Text>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#fff',
    flex: 1,
    justifyContent: 'center',
    padding: 16
  },
  linkText: {
    color: '#3b82f6',
    fontSize: 16
  },
  title: {
    color: '#000',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 32
  }
});