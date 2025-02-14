import { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { Button } from '@/components/ui/native/button';
import { TextInput } from 'react-native';
import { ArrowLeft, Mic, Square, Play, Pause, Upload } from 'lucide-react-native';
import { Audio } from 'expo-av';
import * as ImagePicker from 'expo-image-picker';

const styles = StyleSheet.create({
  backButton: {
    padding: 8,
  },
  container: {
    backgroundColor: '#f9fafb',
    flex: 1,
  },
  content: {
    flex: 1,
    gap: 24,
    padding: 16,
  },
  controls: {
    alignItems: 'center',
    gap: 24,
  },
  defaultButton: {
    backgroundColor: '#3b82f6',
  },
  descriptionInput: {
    backgroundColor: '#fff',
    borderColor: '#e5e7eb',
    borderRadius: 8,
    borderWidth: 1,
    color: '#1f2937',
    fontSize: 16,
    minHeight: 100,
    padding: 12,
    textAlignVertical: 'top',
  },
  descriptionSection: {
    gap: 8,
  },
  header: {
    alignItems: 'center',
    backgroundColor: '#fff',
    borderBottomColor: '#e5e7eb',
    borderBottomWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
  },
  playButton: {
    backgroundColor: '#3b82f6',
  },
  recordButton: {
    alignItems: 'center',
  },
  recordingButton: {
    backgroundColor: '#ef4444',
  },
  roundButton: {
    alignItems: 'center',
    borderRadius: 32,
    height: 64,
    justifyContent: 'center',
    width: 64,
  },
  sectionTitle: {
    color: '#374151',
    fontSize: 14,
    fontWeight: '500',
  },
  selectButton: {
    alignItems: 'center',
    borderColor: '#e5e7eb',
    borderRadius: 8,
    borderWidth: 1,
    flexDirection: 'row',
    gap: 8,
    padding: 12,
  },
  selectButtonText: {
    color: '#6b7280',
    fontSize: 14,
  },
  title: {
    color: '#111827',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default function AudioPostPage() {
  // const navigate = useNavigate(); // Replaced with expo-router
  const [isRecording, setIsRecording] = useState(false);
  const [recording, setRecording] = useState<Audio.Recording | null>(null);
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [audioUri, setAudioUri] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [description, setDescription] = useState('');

  const startRecording = async () => {
    try {
      await Audio.requestPermissionsAsync();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      const { recording } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY
      );
      setRecording(recording);
      setIsRecording(true);
    } catch (error) {
      console.error('録音の開始に失敗しました:', error);
      alert('録音の開始に失敗しました。マイクへのアクセスを許可してください。');
    }
  };

  const stopRecording = async () => {
    if (!recording) return;

    try {
      await recording.stopAndUnloadAsync();
      const uri = recording.getURI();
      setAudioUri(uri);
      setRecording(null);
      setIsRecording(false);

      if (uri) {
        const { sound: newSound } = await Audio.Sound.createAsync({ uri });
        setSound(newSound);
      }
    } catch (error) {
      console.error('録音の停止に失敗しました:', error);
    }
  };

  const handleSelectAudio = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        quality: 1,
      });

      if (!result.canceled && result.assets[0]) {
        const uri = result.assets[0].uri;
        setAudioUri(uri);
        const { sound: newSound } = await Audio.Sound.createAsync({ uri });
        setSound(newSound);
      }
    } catch (error) {
      console.error('音声ファイルの選択に失敗しました:', error);
    }
  };

  const togglePlayback = async () => {
    if (!sound) return;

    try {
      if (isPlaying) {
        await sound.pauseAsync();
      } else {
        await sound.playAsync();
      }
      setIsPlaying(!isPlaying);
    } catch (error) {
      console.error('再生の切り替えに失敗しました:', error);
    }
  };

  const handleSubmit = async () => {
    if (!audioUri) {
      alert('音声を録音または選択してください。');
      return;
    }

    // TODO: Implement audio upload and post submission
    console.log({ audioUri, description });
    router.replace('/(tabs)' as any);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Button
          variant="outline"
          style={styles.backButton}
          onPress={() => router.replace('/(tabs)/post' as any)}
        >
          <ArrowLeft size={20} color="#6b7280" />
        </Button>
        <Text style={styles.title}><Text>音声投稿</Text></Text>
        <Button
          onPress={handleSubmit}
          disabled={!audioUri}
        >
          投稿する
        </Button>
      </View>

      <View style={styles.content}>
        {/* 録音/再生コントロール */}
        <View style={styles.controls}>
          <View style={styles.recordButton}>
            {!audioUri ? (
              <TouchableOpacity
                style={[
                  styles.roundButton,
                  isRecording ? styles.recordingButton : styles.defaultButton,
                ]}
                onPress={isRecording ? stopRecording : startRecording}
              >
                {isRecording ? (
                  <Square size={24} color="#fff" />
                ) : (
                  <Mic size={24} color="#fff" />
                )}
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={[styles.roundButton, styles.playButton]}
                onPress={togglePlayback}
              >
                {isPlaying ? (
                  <Pause size={24} color="#fff" />
                ) : (
                  <Play size={24} color="#fff" />
                )}
              </TouchableOpacity>
            )}
          </View>

          {/* 音声ファイル選択 */}
          <TouchableOpacity
            style={styles.selectButton}
            onPress={handleSelectAudio}
          >
            <Upload size={16} color="#6b7280" />
            <Text style={styles.selectButtonText}><Text>音声ファイルを選択</Text></Text>
          </TouchableOpacity>
        </View>

        {/* 説明文入力 */}
        <View style={styles.descriptionSection}>
          <Text style={styles.sectionTitle}><Text>説明文</Text></Text>
          <TextInput
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