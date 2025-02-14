import React from 'react';
import { Stack } from 'expo-router';
import { View } from 'react-native';

export const unstable_settings = {
  initialRouteName: 'login',
};

export default function AuthLayout() {
  return (
    <View style={{ flex: 1 }}>
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: 'white' }
        }}
      />
    </View>
  );
}