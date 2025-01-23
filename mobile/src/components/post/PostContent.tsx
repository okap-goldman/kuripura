import React, { useRef, useState, useEffect, useCallback, memo } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
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

export const PostContent = memo(function PostContent({
  content,
  caption,
  mediaType,
  isExpanded,
  setIsExpanded,
  testID,
}: PostContentProps) {
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const videoRef = useRef<Video>(null);

  useEffect(() => {
    return () => {
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, [sound]);

  const toggleAudio = useCallback(async () => {
    if (!sound) {
      setIsLoading(true);
      setError(null);
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
        setError('音声の読み込みに失敗しました');
      } finally {
        setIsLoading(false);
      }
    } else {
      try {
        if (isAudioPlaying) {
          await sound.pauseAsync();
        } else {
          await sound.playAsync();
        }
        setIsAudioPlaying(!isAudioPlaying);
      } catch (error) {
        console.error('Error playing/pausing audio:', error);
        setError('音声の再生に失敗しました');
      }
    }
  }, [sound, isAudioPlaying, content]);

  const handleExpandText = useCallback(() => {
    setIsExpanded(true);
  }, [setIsExpanded]);

  const renderTruncatedText = useCallback((text: string) => {
    if (text.length <= 140 || isExpanded) {
      return (
        <Text style={styles.text} testID={`${testID}-full-text`}>
          {text}
        </Text>
      );
    }
    return (
      <View testID={`${testID}-truncated-text`}>
        <Text style={styles.text}>{text.slice(0, 140)}...</Text>
        <TouchableOpacity
          onPress={handleExpandText}
          testID={`${testID}-expand-button`}
          accessibilityLabel="すべて表示"
          accessibilityRole="button"
        >
          <Text style={styles.moreText}>すべて表示</Text>
        </TouchableOpacity>
      </View>
    );
  }, [isExpanded, handleExpandText, testID]);

  const renderMedia = useCallback(() => {
    switch (mediaType) {
      case 'image':
        return (
          <View testID={`${testID}-image-container`}>
            <Image
              source={{ uri: content }}
              style={styles.image}
              resizeMode="cover"
              testID={`${testID}-image`}
              accessibilityLabel="投稿画像"
              accessibilityRole="image"
            />
          </View>
        );
      case 'video':
        return (
          <View testID={`${testID}-video-container`}>
            <Video
              ref={videoRef}
              source={{ uri: content }}
              style={styles.video}
              useNativeControls
              resizeMode="contain"
              isLooping
              testID={`${testID}-video`}
              accessibilityLabel="投稿動画"
            />
          </View>
        );
      case 'audio':
        return (
          <View
            style={styles.audioContainer}
            testID={`${testID}-audio-container`}
          >
            <View style={styles.audioHeader}>
              <View>
                <Text style={styles.audioTitle}>使命</Text>
                <Text style={styles.audioSubtitle}>
                  1時間5分・165人がリスニング/リプレイ
                </Text>
              </View>
            </View>
            {isLoading ? (
              <ActivityIndicator
                size="small"
                color="#0284c7"
                testID={`${testID}-audio-loading`}
              />
            ) : error ? (
              <View testID={`${testID}-audio-error`}>
                <Text style={styles.errorText}>{error}</Text>
                <Button
                  onPress={toggleAudio}
                  variant="outline"
                  fullWidth
                  style={styles.retryButton}
                  testID={`${testID}-audio-retry-button`}
                >
                  <Text>再試行</Text>
                </Button>
              </View>
            ) : (
              <Button
                onPress={toggleAudio}
                variant="outline"
                fullWidth
                style={styles.audioButton}
                testID={`${testID}-audio-${isAudioPlaying ? 'pause' : 'play'}-button`}
                accessibilityLabel={isAudioPlaying ? '停止' : '再生'}
                accessibilityRole="button"
              >
                <Text>{isAudioPlaying ? '停止' : '再生'}</Text>
              </Button>
            )}
          </View>
        );
      case 'text':
      default:
        return renderTruncatedText(content);
    }
  }, [mediaType, content, isAudioPlaying, isLoading, error, toggleAudio, renderTruncatedText, testID]);

  return (
    <View style={styles.container} testID={testID}>
      {mediaType === 'text' ? (
        <View testID={`${testID}-text-container`}>
          {renderMedia()}
        </View>
      ) : (
        <>
          <View testID={`${testID}-media-container`}>
            {renderMedia()}
          </View>
          {caption && (
            <View testID={`${testID}-caption-container`}>
              {renderTruncatedText(caption)}
            </View>
          )}
        </>
      )}
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    gap: 16,
  },
  text: {
    fontSize: 14,
    lineHeight: 20,
    color: '#0f172a',
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
    backgroundColor: '#f1f5f9',
  },
  video: {
    width: '100%',
    height: 300,
    borderRadius: 8,
    backgroundColor: '#f1f5f9',
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
  retryButton: {
    backgroundColor: '#ffffff',
    marginTop: 8,
  },
  errorText: {
    fontSize: 14,
    color: '#ef4444',
    textAlign: 'center',
  },
});