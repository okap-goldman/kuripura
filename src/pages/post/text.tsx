import { useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { Button } from '@/components/ui/native/button';
import { Switch } from '@/components/ui/native/switch';
import { Label } from '@/components/ui/native/label';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f9fafb',
    flex: 1,
  },
  content: {
    flex: 1,
  },
  editorContainer: {
    gap: 16,
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
  image: {
    height: '100%',
    resizeMode: 'cover',
    width: '100%',
  },
  imageContainer: {
    aspectRatio: 1,
    borderRadius: 8,
    overflow: 'hidden',
    width: '48%',
  },
  imageGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  imageUpload: {
    alignItems: 'center',
    borderColor: '#e5e7eb',
    borderRadius: 8,
    borderStyle: 'dashed',
    borderWidth: 2,
    height: 128,
    justifyContent: 'center',
  },
  imageUploadContent: {
    alignItems: 'center',
    gap: 8,
  },
  imageUploadDisabled: {
    opacity: 0.5,
  },
  imageUploadText: {
    color: '#6b7280',
    fontSize: 14,
  },
  removeButton: {
    backgroundColor: '#ef4444',
    borderRadius: 16,
    padding: 4,
    position: 'absolute',
    right: 8,
    top: 8,
  },
  section: {
    gap: 24,
    padding: 16,
  },
  settingRow: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  switchContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 8,
  },
  switchLabel: {
    color: '#6b7280',
    fontSize: 14,
  },
  title: {
    color: '#111827',
    fontSize: 18,
    fontWeight: '600',
  },
});
import { ArrowLeft, ImagePlus, X } from 'lucide-react-native';
import { Alert } from 'react-native';
import { createTextPost, uploadImage } from '@/lib/firebase';
import { useAuth } from '@/contexts/AuthContext';
import { RichTextEditor } from '@/components/RichTextEditor';
import * as ImagePicker from 'expo-image-picker';

export default function TextPostPage() {
  // Removed useNavigate in favor of expo-router
  const [content, setContent] = useState({ text: '', html: '' });
  const [images, setImages] = useState<string[]>([]);
  const [isPublic, setIsPublic] = useState(true);
  const [isUploading, setIsUploading] = useState(false);


  const { user } = useAuth();

  const handleImageUpload = async (file: File) => {
    if (images.length >= 4) {
      Alert.alert('エラー', '画像は最大4枚までです。');
      return;
    }

    setIsUploading(true);
    try {
      const url = await uploadImage(file, user!.uid);
      setImages([...images, url]);
    } catch (error) {
      console.error('Image upload error:', error);
      Alert.alert('エラー', '画像のアップロードに失敗しました。');
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = async () => {
    
    if (!user) {
      Alert.alert('エラー', 'ログインが必要です。');
      return;
    }

    if (!content.text.trim()) {
      Alert.alert('エラー', '本文を入力してください。');
      return;
    }

    if (content.text.length > 10000) {
      Alert.alert('エラー', '本文は10,000文字以内で入力してください。');
      return;
    }

    try {
      await createTextPost({
        userId: user.uid,
        content,
        images,
        isPublic,
      });
      
      Alert.alert('投稿完了', '投稿が完了しました。');
      
      router.replace('/(tabs)/timeline' as any);
    } catch (error) {
      console.error('Post creation error:', error);
      Alert.alert('エラー', '投稿に失敗しました。');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Button
          variant="outline"
          onPress={() => router.replace('/(tabs)/post' as any)}
        >
          <ArrowLeft size={20} color="#6b7280" />
        </Button>
        <Text style={styles.title}><Text>テキスト投稿</Text></Text>
        <Button
          onPress={handleSubmit}
          disabled={!content.text.trim() || isUploading}
        >
          投稿する
        </Button>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.section}>
          <View style={styles.settingRow}>
            <Label><Text>公開設定</Text></Label>
            <View style={styles.switchContainer}>
              <Text style={styles.switchLabel}>
                {isPublic ? '公開' : '下書き'}
              </Text>
              <Switch
                value={isPublic}
                onValueChange={setIsPublic}
              />
            </View>
          </View>

          <View style={styles.editorContainer}>
            <RichTextEditor
              content={content}
              onChange={setContent}
            />

            <TouchableOpacity
              style={[
                styles.imageUpload,
                images.length >= 4 && styles.imageUploadDisabled
              ]}
              onPress={async () => {
                if (images.length >= 4) return;
                
                const result = await ImagePicker.launchImageLibraryAsync({
                  mediaTypes: ImagePicker.MediaTypeOptions.Images,
                  allowsEditing: true,
                  quality: 1,
                });

                if (!result.canceled && result.assets[0]) {
                  const response = await fetch(result.assets[0].uri);
                  const blob = await response.blob();
                  const file = new File([blob], 'image.jpg', { type: 'image/jpeg' });
                  handleImageUpload(file);
                }
              }}
              disabled={images.length >= 4 || isUploading}
            >
              <View style={styles.imageUploadContent}>
                <ImagePlus size={32} color="#9ca3af" />
                <Text style={styles.imageUploadText}>
                  {isUploading ? '画像をアップロード中...' : '画像を追加（最大4枚）'}
                </Text>
              </View>
            </TouchableOpacity>

            {images.length > 0 && (
              <View style={styles.imageGrid}>
                {images.map((url) => (
                  <View key={url} style={styles.imageContainer}>
                    <Image
                      source={{ uri: url }}
                      style={styles.image}
                    />
                    <TouchableOpacity
                      style={styles.removeButton}
                      onPress={() => setImages(images.filter(i => i !== url))}
                    >
                      <X size={16} color="#fff" />
                    </TouchableOpacity>
                  </View>
                ))}
              </View>
            )}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}                                                                        