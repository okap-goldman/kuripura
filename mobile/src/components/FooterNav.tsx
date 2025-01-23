import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import { colors } from '../styles/theme';
import { CreatePostDialog } from './CreatePostDialog';

export function FooterNav() {
  const navigation = useNavigation();
  const route = useRoute();
  const [isCreatePostOpen, setIsCreatePostOpen] = useState(false);

  const isActive = (routeName: string) => route.name === routeName;

  return (
    <>
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.tab}
          onPress={() => navigation.navigate('Home')}
        >
          <Feather
            name="home"
            size={24}
            color={isActive('Home') ? colors.primary : colors.textMuted}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.tab}
          onPress={() => navigation.navigate('Search')}
        >
          <Feather
            name="search"
            size={24}
            color={isActive('Search') ? colors.primary : colors.textMuted}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.tab}
          onPress={() => setIsCreatePostOpen(true)}
        >
          <Feather
            name="plus-square"
            size={24}
            color={colors.textMuted}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.tab}
          onPress={() => navigation.navigate('Discover')}
        >
          <Feather
            name="compass"
            size={24}
            color={isActive('Discover') ? colors.primary : colors.textMuted}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.tab}
          onPress={() => navigation.navigate('Profile')}
        >
          <Feather
            name="user"
            size={24}
            color={isActive('Profile') ? colors.primary : colors.textMuted}
          />
        </TouchableOpacity>
      </View>

      <CreatePostDialog
        visible={isCreatePostOpen}
        onDismiss={() => setIsCreatePostOpen(false)}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: colors.background,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  tab: {
    padding: 8,
  },
});

export default FooterNav; 