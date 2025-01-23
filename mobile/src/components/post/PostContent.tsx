import React, { useRef, useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Video, Audio, AVPlaybackStatus } from 'expo-av';
import { Button } from '../ui/Button';

interface PostContentProps {
  content: string;
  caption?: string;
  mediaType: 'text' | 'image' | 'video' | 'audio';
  isExpanded: boolean;
  setIsExpanded: (value: boolean) => void;
  testID?: string;
}

export function PostContent({
  content,
  caption,
  mediaType,
  isExpanded,
  setIsExpanded,
  testID,
}: PostContentProps) {
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const videoRef = useRef<Video>(null);

  useEffect(() => {
    return () => {
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, [sound]);

  const toggleAudio = async () => {
    if (!sound) {
      try {
        const { sound: newSound } = await Audio.Sound.createAsync(
          { uri: content },
          { shouldPlay: true }
        );
        setSound(newSound);
        setIsAudioPlaying(true);
        
        newSound.setOnPlaybackStatusUpdate((status: AVPlaybackStatus) => {
          if (status.isLoaded && !status.isPlaying) {
            setIsAudioPlaying(false);
          }
        });
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

  const renderTruncatedText = (text: string) => {
    if (text.length <= 140 || isExpanded) {
      return <Text style={styles.text}>{text}</Text>;
    }
    return (
      <View>
        <Text style={styles.text}>{text.slice(0, 140)}...</Text>
        <TouchableOpacity onPress={() => setIsExpanded(true)}>
          <Text style={styles.moreText}>すべて表示</Text>
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
            <View style={styles.audioHeader}>
              <View>
                <Text style={styles.audioTitle}>使命</Text>
                <Text style={styles.audioSubtitle}>
                  1時間5分・165人がリスニング/リプレイ
                </Text>
              </View>
            </View>
            <Button
              onPress={toggleAudio}
              variant="outline"
              fullWidth
              style={styles.audioButton}
            >
              <Text>{isAudioPlaying ? '停止' : '再生'}</Text>
            </Button>
          </View>
        );
      case 'text':
      default:
        return renderTruncatedText(content);
    }
  };

  return (
    <View style={styles.container} testID={testID}>
      {mediaType === 'text' ? (
        <View testID={`${testID}-text`}>
          {renderMedia()}
        </View>
      ) : (
        <>
          <View testID={`${testID}-media`}>
            {renderMedia()}
          </View>
          {caption && (
            <View testID={`${testID}-caption`}>
              {renderTruncatedText(caption)}
            </View>
          )}
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
  },
  moreText: {
    fontSize: 14,
    color: '#64748b',
    marginTop: 4,
  },
  image: {
    width: '100%',
    height: 300,
    borderRadius: 8,
  },
  video: {
    width: '100%',
    height: 300,
    borderRadius: 8,
  },
  audioContainer: {
    width: '100%',
    backgroundColor: '#00ffff',
    padding: 24,
    borderRadius: 8,
  },
  audioHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  audioTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000080',
  },
  audioSubtitle: {
    fontSize: 14,
    color: 'rgba(0, 0, 128, 0.8)',
  },
  audioButton: {
    backgroundColor: '#ffffff',
  },
});