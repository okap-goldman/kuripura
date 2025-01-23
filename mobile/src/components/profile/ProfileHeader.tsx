import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Audio } from 'expo-av';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { colors } from '../../styles/theme';
import { Avatar } from '../../components/ui/avatar';

interface ProfileHeaderProps {
  isPlaying: boolean;
  handlePlayVoice: () => void;
}

export function ProfileHeader({ isPlaying, handlePlayVoice }: ProfileHeaderProps) {
  const navigation = useNavigation();
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [sound, setSound] = useState<Audio.Sound | null>(null);

  const toggleAudio = async () => {
    if (!sound) {
      try {
        const { sound: newSound } = await Audio.Sound.createAsync(
          { uri: 'https://s328.podbean.com/pb/4b3e15298687315db3070972aaa50fee/676f0aab/data1/fs91/20007750/uploads/6b592.m4a' }
        );
        setSound(newSound);
        await newSound.playAsync();
        setIsAudioPlaying(true);
      } catch (error) {
        console.error('Error loading audio:', error);
      }
    } else {
      if (isAudioPlaying) {
        await sound.pauseAsync();
      } else {
        await sound.playAsync();
      }
      setIsAudioPlaying(!isAudioPlaying);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.iconButton}
          onPress={toggleAudio}
        >
          <Feather
            name={isAudioPlaying ? 'pause' : 'play'}
            size={24}
            color={colors.text}
          />
        </TouchableOpacity>

        <Avatar
          source={{ uri: 'https://api.dicebear.com/7.x/avataaars/svg?seed=1' }}
          size={96}
        />

        <TouchableOpacity
          style={styles.iconButton}
          onPress={() => navigation.navigate('Shop')}
        >
          <Feather name="shopping-bag" size={24} color={colors.text} />
        </TouchableOpacity>
      </View>

      <View style={styles.info}>
        <Text style={styles.name}>心の探求者</Text>
        <Text style={styles.username}>@seeker_of_heart</Text>
        <Text style={styles.userId}>ID: 123456789</Text>
        <Text style={styles.bio}>
          地球での使命：人々の心に光を灯し、内なる平安への道を示すこと
        </Text>
      </View>

      <View style={styles.stats}>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>1.2k</Text>
          <Text style={styles.statLabel}>ファミリー</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>890</Text>
          <Text style={styles.statLabel}>ウォッチ</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>3.4k</Text>
          <Text style={styles.statLabel}>フォロー</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>2.1k</Text>
          <Text style={styles.statLabel}>フォロワー</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 24,
    alignItems: 'center',
    gap: 24,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 32,
  },
  iconButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  info: {
    alignItems: 'center',
    gap: 8,
  },
  name: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.text,
  },
  username: {
    fontSize: 14,
    color: colors.textMuted,
  },
  userId: {
    fontSize: 14,
    color: colors.textMuted,
  },
  bio: {
    fontSize: 14,
    color: colors.textMuted,
    textAlign: 'center',
    paddingHorizontal: 32,
  },
  stats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    width: '90%',
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
  },
  statLabel: {
    fontSize: 12,
    color: colors.textMuted,
  },
}); 