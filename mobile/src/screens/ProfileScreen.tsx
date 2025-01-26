import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { ProfileHeader } from '../components/profile/ProfileHeader';
import { ProfileTabs } from '../components/profile/ProfileTabs';

export const ProfileScreen = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedTab, setSelectedTab] = useState('media');
  const [selectedPost, setSelectedPost] = useState(null);
  const navigation = useNavigation();

  const handlePlayVoice = () => {
    setIsPlaying(!isPlaying);
    // TODO: Implement voice playback logic
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <ProfileHeader
          isPlaying={isPlaying}
          handlePlayVoice={handlePlayVoice}
        />
        <ProfileTabs
          selectedTab={selectedTab}
          setSelectedPost={setSelectedPost}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollView: {
    flex: 1,
  },
});

export default ProfileScreen; 