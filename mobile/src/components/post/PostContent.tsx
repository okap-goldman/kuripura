import React, { useRef, useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Video } from 'expo-av';
import { Feather } from '@expo/vector-icons';
import { colors } from '../../styles/theme';

interface PostContentProps {
  content: string;
  caption?: string;
  mediaType: 'text' | 'image' | 'video' | 'audio';
  isExpanded: boolean;
  setIsExpanded: (value: boolean) => void;
}

export function PostContent({ content, caption, mediaType, isExpanded, setIsExpanded }: PostContentProps) {
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const videoRef = useRef<Video>(null);

  const renderTruncatedText = (text: string) => {
    if (text.length <= 140 || isExpanded) {
      return <Text style={styles.text}>{text}</Text>;
    }
    return (
      <View>
        <Text style={styles.text}>{text.slice(0, 140)}...</Text>
        <TouchableOpacity onPress={() => setIsExpanded(true)}>
          <Text style={styles.showMoreText}>すべて表示</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const renderMedia = () => {
    switch (mediaType) {
      case 'image':
        return (
          <Image
            source={{ uri: content }}
            style={styles.image}
            resizeMode="cover"
          />
        );
      case 'video':
        return (
          <Video
            ref={videoRef}
            source={{ uri: content }}
            style={styles.video}
            useNativeControls
            resizeMode="contain"
            isLooping
          />
        );
      case 'audio':
        return (
          <View style={styles.audioContainer}>
            <View style={styles.audioInfo}>
              <Text style={styles.audioTitle}>使命</Text>
              <Text style={styles.audioSubtitle}>1時間5分・165人がリスニング/リプレイ</Text>
            </View>
            <TouchableOpacity
              style={styles.audioButton}
              onPress={() => setIsAudioPlaying(!isAudioPlaying)}
            >
              <Feather
                name={isAudioPlaying ? 'pause' : 'play'}
                size={24}
                color={colors.primary}
              />
            </TouchableOpacity>
          </View>
        );
      case 'text':
      default:
        return renderTruncatedText(content);
    }
  };

  return (
    <View style={styles.container}>
      {mediaType === 'text' ? (
        renderMedia()
      ) : (
        <>
          {renderMedia()}
          {caption && renderTruncatedText(caption)}
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 16,
  },
  text: {
    fontSize: 14,
    color: colors.text,
  },
  showMoreText: {
    fontSize: 14,
    color: colors.textMuted,
    marginTop: 4,
  },
  image: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: 8,
  },
  video: {
    width: '100%',
    aspectRatio: 16 / 9,
    borderRadius: 8,
  },
  audioContainer: {
    backgroundColor: colors.backgroundLight,
    padding: 16,
    borderRadius: 8,
  },
  audioInfo: {
    marginBottom: 16,
  },
  audioTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
  },
  audioSubtitle: {
    fontSize: 14,
    color: colors.textMuted,
    marginTop: 4,
  },
  audioButton: {
    backgroundColor: colors.background,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
});