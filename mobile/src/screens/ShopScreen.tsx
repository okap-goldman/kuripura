import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../styles/theme';

export function ShopScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>ショップ画面</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.background,
  },
  text: {
    fontSize: 24,
    color: colors.text,
  },
}); 