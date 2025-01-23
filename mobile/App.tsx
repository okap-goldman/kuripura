import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { HomeScreen } from './src/screens/HomeScreen';
import { ShopScreen } from './src/screens/ShopScreen';
import { SearchScreen } from './src/screens/SearchScreen';
import { DiscoverScreen } from './src/screens/DiscoverScreen';
import { ProfileScreen } from './src/screens/ProfileScreen';
import { Header } from './src/components/Header';
import { FooterNav } from './src/components/FooterNav';
import { RootStackParamList } from './src/types/navigation';
import { View, StyleSheet } from 'react-native';

const Stack = createNativeStackNavigator<RootStackParamList>();

const ScreenWrapper = ({ children }: { children: React.ReactNode }) => (
  <View style={styles.screenContainer}>
    {children}
    <FooterNav />
  </View>
);

const WrappedHomeScreen = () => (
  <ScreenWrapper>
    <HomeScreen />
  </ScreenWrapper>
);

const WrappedShopScreen = () => (
  <ScreenWrapper>
    <ShopScreen />
  </ScreenWrapper>
);

const WrappedSearchScreen = () => (
  <ScreenWrapper>
    <SearchScreen />
  </ScreenWrapper>
);

const WrappedDiscoverScreen = () => (
  <ScreenWrapper>
    <DiscoverScreen />
  </ScreenWrapper>
);

const WrappedProfileScreen = () => (
  <ScreenWrapper>
    <ProfileScreen />
  </ScreenWrapper>
);

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={WrappedHomeScreen}
          options={{
            header: () => <Header />,
          }}
        />
        <Stack.Screen
          name="Shop"
          component={WrappedShopScreen}
          options={{
            header: () => <Header />,
          }}
        />
        <Stack.Screen
          name="Search"
          component={WrappedSearchScreen}
          options={{
            header: () => <Header />,
          }}
        />
        <Stack.Screen
          name="Discover"
          component={WrappedDiscoverScreen}
          options={{
            header: () => <Header />,
          }}
        />
        <Stack.Screen
          name="Profile"
          component={WrappedProfileScreen}
          options={{
            header: () => <Header />,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
  },
});
