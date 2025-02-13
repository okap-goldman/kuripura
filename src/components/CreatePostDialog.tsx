import { View, Text, Modal, StyleSheet, Dimensions } from 'react-native';
import { Button } from "@/components/ui/native/button";
import { Video, Mic, BookText, History } from "lucide-react-native";
import { router } from 'expo-router';

interface CreatePostDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CreatePostDialog({ isOpen, onClose }: CreatePostDialogProps) {
  const postTypes = [
    { icon: Video, label: "動画・画像", value: "media" },
    { icon: Mic, label: "音声", value: "audio" },
    { icon: BookText, label: "テキスト", value: "text" },
    { icon: History, label: "ストーリーズ", value: "story" },
  ];

  const handlePostTypeSelect = (type: string) => {
    if (type === 'text') {
      router.push('/(tabs)/post/text' as any);
    }
    onClose();
  };

  return (
    <Modal
      visible={isOpen}
      onRequestClose={onClose}
      transparent
      animationType="fade"
    >
      <View style={styles.overlay}>
        <View style={styles.content}>
          <Text style={styles.title}><Text>新規投稿を作成</Text></Text>
          <View style={styles.grid}>
            {postTypes.map(({ icon: Icon, label, value }) => (
              <Button
                key={value}
                variant="outline"
                style={styles.button}
                onPress={() => handlePostTypeSelect(value)}
              >
                <View style={styles.buttonContent}>
                  <Icon size={32} color="#6b7280" />
                  <Text style={styles.buttonText}>{label}</Text>
                </View>
              </Button>
            ))}
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#f3f4f6',
    borderRadius: 8,
    height: 96,
    width: (Dimensions.get('window').width - 64) / 2,
  },
  buttonContent: {
    alignItems: 'center',
    flex: 1,
    gap: 8,
    justifyContent: 'center',
  },
  buttonText: {
    color: '#6b7280',
    fontSize: 14,
  },
  content: {
    backgroundColor: '#fff',
    borderRadius: 8,
    maxWidth: 500,
    padding: 16,
    width: '100%',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  overlay: {
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 16,
    textAlign: 'center',
  },
});
