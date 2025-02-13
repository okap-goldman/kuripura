import { Link } from 'expo-router';
import { Video, Image, Mic, Type } from 'lucide-react-native';
import { Button } from '@/components/ui/native/button';
import { View, Text, StyleSheet } from 'react-native';

const POST_TYPES = [
  {
    id: 'video',
    label: '動画投稿',
    icon: Video,
    description: '動画を撮影または選択して投稿',
    path: '/(tabs)/post/video' as any,
  },
  {
    id: 'image',
    label: '画像投稿',
    icon: Image,
    description: '画像を選択して投稿',
    path: '/(tabs)/post/image' as any,
  },
  {
    id: 'audio',
    label: '音声投稿',
    icon: Mic,
    description: '音声を録音または選択して投稿',
    path: '/(tabs)/post/audio' as any,
  },
  {
    id: 'text',
    label: 'テキスト投稿',
    icon: Type,
    description: 'テキストを入力して投稿',
    path: '/(tabs)/post/text' as any,
  },
];

export default function PostTypePage() {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}><Text>新規投稿</Text></Text>
        
        <View style={styles.grid}>
          {POST_TYPES.map((type) => (
            <Link key={type.id} href={type.path} asChild>
              <Button
                variant="outline"
                onPress={() => {}}
              >
                <View style={styles.buttonContent}>
                  <View style={styles.iconContainer}>
                    <type.icon size={24} color="#3b82f6" />
                  </View>
                  <View style={styles.textContainer}>
                    <Text style={styles.label}>{type.label}</Text>
                    <Text style={styles.description}>{type.description}</Text>
                  </View>
                </View>
              </Button>
            </Link>
          ))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonContent: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 16,
    padding: 16,
  },
  container: {
    backgroundColor: '#f9fafb',
    flex: 1,
    paddingBottom: 64,
    paddingTop: 64,
  },
  content: {
    padding: 24,
  },
  description: {
    color: '#6b7280',
    fontSize: 14,
  },
  grid: {
    gap: 16,
  },
  iconContainer: {
    backgroundColor: 'rgba(59, 130, 246, 0.1)',
    borderRadius: 9999,
    padding: 12,
  },
  label: {
    fontWeight: '600',
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
  },
});     