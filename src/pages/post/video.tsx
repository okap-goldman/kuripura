import { useState, useRef } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { Button } from '@/components/ui/native/button';
import { Camera } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import { Video as ExpoVideo, ResizeMode, AVPlaybackStatus } from 'expo-av';
import { ArrowLeft, Video as VideoIcon, Upload, Play, Pause } from 'lucide-react-native';
import { Input } from '@/components/ui/native/input';

export default function VideoPostPage() {
  const [video, setVideo] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [description, setDescription] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  
  const cameraRef = useRef<any>(null);
  const videoRef = useRef<ExpoVideo | null>(null);

  const startRecording = async () => {
    try {
      const { status } = await Camera.requestCameraPermissionsAsync();
      if (status !== 'granted') {
        alert('カメラへのアクセスを許可してください。');
        return;
      }
      
      if (status === 'granted') {
        setIsRecording(true);
        if (cameraRef.current) {
          const video = await cameraRef.current.recordAsync();
          setVideo(video.uri);
        }
      } else {
        alert('カメラへのアクセスを許可してください。');
      }
    } catch (error) {
      console.error('録画の開始に失敗しました:', error);
      alert('録画の開始に失敗しました。');
    }
  };

  const stopRecording = () => {
    if (cameraRef.current && isRecording) {
      cameraRef.current.stopRecording();
      setIsRecording(false);
    }
  };

  const handleSelectVideo = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Videos,
      allowsEditing: true,
      quality: 1,
    });
    if (!result.canceled) {
      setVideo(result.assets[0].uri);
    }
  };

  const togglePlayback = async () => {
    if (videoRef.current) {
      const status = await videoRef.current.getStatusAsync() as AVPlaybackStatus;
      if (status.isLoaded && status.isPlaying) {
        await videoRef.current.pauseAsync();
        setIsPlaying(false);
      } else {
        await videoRef.current.playAsync();
        setIsPlaying(true);
      }
    }
  };

  const handleSubmit = async () => {
    if (!video) {
      alert('動画を録画または選択してください。');
      return;
    }

    // TODO: Implement video upload and post submission
    console.log({ video, description });
    router.replace('/(tabs)' as any);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Button
          variant="outline"
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <ArrowLeft size={20} color="#000" />
        </Button>
        <Text style={styles.title}><Text>動画投稿</Text></Text>
        <Button
          onPress={handleSubmit}
          disabled={!video}
        >
          投稿する
        </Button>
      </View>

      <View style={styles.content}>
        <View style={styles.videoContainer}>
          {isRecording && (
            <Camera
              ref={cameraRef}
              style={styles.video}
              type={Camera.Constants.Type.back}
            />
          )}
          
          {video && !isRecording && (
            <View style={styles.videoWrapper}>
              <ExpoVideo
                ref={videoRef}
                source={{ uri: video }}
                style={styles.video}
                shouldPlay={isPlaying}
                resizeMode={ResizeMode.CONTAIN}
              />
              <View style={styles.controlsContainer}>
                <Button
                  variant="outline"
                  style={styles.playButton}
                  onPress={togglePlayback}
                >
                  {isPlaying ? (
                    <Pause size={16} color="#fff" />
                  ) : (
                    <Play size={16} color="#fff" />
                  )}
                </Button>
              </View>
            </View>
          )}

          {!video && !isRecording && (
            <View style={styles.placeholderContainer}>
              <VideoIcon size={48} color="#9ca3af" />
              <View style={styles.buttonGroup}>
                <Button
                  variant="outline"
                  onPress={startRecording}
                >
                  録画を開始
                </Button>
                <Button
                  variant="outline"
                  onPress={handleSelectVideo}
                >
                  <Upload size={16} color="#000" />
                  <Text><Text>動画を選択</Text></Text>
                </Button>
              </View>
            </View>
          )}

          {isRecording && (
            <View style={styles.recordingControls}>
              <Button
                variant="destructive"
                onPress={stopRecording}
              >
                録画を停止
              </Button>
            </View>
          )}
        </View>

        <View style={styles.description}>
          <Text><Text>説明文</Text></Text>
          <Input
            value={description}
            onChangeText={setDescription}
            placeholder="説明文を入力（任意）"
            multiline
            style={styles.descriptionInput}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  backButton: {
    padding: 8,
  },
  buttonGroup: {
    flexDirection: 'row',
    gap: 16,
    marginTop: 16,
  },
  container: {
    backgroundColor: '#fff',
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  controlsContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    bottom: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    left: 0,
    padding: 16,
    position: 'absolute',
    right: 0,
  },
  description: {
    marginTop: 16,
  },
  descriptionInput: {
    backgroundColor: '#f3f4f6',
    borderRadius: 8,
    height: 100,
    marginTop: 8,
    padding: 12,
    textAlignVertical: 'top',
  },
  header: {
    alignItems: 'center',
    borderBottomColor: '#e5e7eb',
    borderBottomWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
  },
  placeholderContainer: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  playButton: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 20,
    padding: 8,
  },
  recordingControls: {
    alignItems: 'center',
    bottom: 16,
    left: 0,
    position: 'absolute',
    right: 0,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
  },
  video: {
    flex: 1,
  },
  videoContainer: {
    aspectRatio: 16 / 9,
    backgroundColor: '#f3f4f6',
    borderRadius: 8,
    marginBottom: 16,
    overflow: 'hidden',
  },
  videoWrapper: {
    flex: 1,
    position: 'relative',
  },
});                                                 