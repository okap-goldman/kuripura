import { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { Button } from '@/components/ui/native/button';
import { TextInput } from 'react-native';
import { ArrowLeft, Mic, Square, Play, Pause, Upload } from 'lucide-react-native';
import { Audio } from 'expo-av';
import * as DocumentPicker from 'expo-document-picker';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
  },
  backButton: {
    padding: 8,
  },
  content: {
    flex: 1,
    padding: 16,
    gap: 24,
  },
  controls: {
    alignItems: 'center',
    gap: 24,
  },
  recordButton: {
    alignItems: 'center',
  },
  roundButton: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  defaultButton: {
    backgroundColor: '#3b82f6',
  },
  recordingButton: {
    backgroundColor: '#ef4444',
  },
  playButton: {
    backgroundColor: '#3b82f6',
  },
  selectButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    padding: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 8,
  },
  selectButtonText: {
    fontSize: 14,
    color: '#6b7280',
  },
  descriptionSection: {
    gap: 8,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#374151',
  },
  descriptionInput: {
    minHeight: 100,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: '#1f2937',
    textAlignVertical: 'top',
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
        <Text style={styles.title}>音声投稿</Text>
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
            <Text style={styles.selectButtonText}>音声ファイルを選択</Text>
          </TouchableOpacity>
        </View>

        {/* 説明文入力 */}
        <View style={styles.descriptionSection}>
          <Text style={styles.sectionTitle}>説明文</Text>
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