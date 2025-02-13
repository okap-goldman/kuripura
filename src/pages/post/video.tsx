import { useState, useRef } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { Button } from '@/components/ui/native/button';
import { Camera as ExpoCamera, CameraType } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import { Video as ExpoVideo, ResizeMode, AVPlaybackStatus } from 'expo-av';
import { ArrowLeft, Video as VideoIcon, Upload, Play, Pause } from 'lucide-react-native';
import { Input } from '@/components/ui/native/input';

export default function VideoPostPage() {
  const [video, setVideo] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [description, setDescription] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  
  const cameraRef = useRef<ExpoCamera | null>(null);
  const videoRef = useRef<ExpoVideo | null>(null);

  const startRecording = async () => {
    try {
      const { status } = await ExpoCamera.requestCameraPermissionsAsync();
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
    router.push('/');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Button
          variant="outline"
          size="icon"
          onPress={() => router.back()}
        >
          <ArrowLeft size={20} color="#000" />
        </Button>
        <Text style={styles.title}>動画投稿</Text>
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
            <ExpoCamera
              ref={cameraRef}
              style={styles.video}
              type={ExpoCamera.Constants.Type.back}
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
                  size="icon"
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
                  <Text>動画を選択</Text>
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
          <Text>説明文</Text>
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
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  videoContainer: {
    aspectRatio: 16 / 9,
    backgroundColor: '#f3f4f6',
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: 16,
  },
  video: {
    flex: 1,
  },
  videoWrapper: {
    flex: 1,
    position: 'relative',
  },
  controlsContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  placeholderContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  buttonGroup: {
    flexDirection: 'row',
    gap: 16,
    marginTop: 16,
  },
  recordingControls: {
    position: 'absolute',
    bottom: 16,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  description: {
    marginTop: 16,
  },
  descriptionInput: {
    height: 100,
    backgroundColor: '#f3f4f6',
    borderRadius: 8,
    padding: 12,
    textAlignVertical: 'top',
    marginTop: 8,
  },
});                 