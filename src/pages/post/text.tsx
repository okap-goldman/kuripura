import { useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { Button } from '@/components/ui/native/button';
import { Switch } from '@/components/ui/native/switch';
import { Label } from '@/components/ui/native/label';

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
  content: {
    flex: 1,
  },
  section: {
    padding: 16,
    gap: 24,
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  switchLabel: {
    fontSize: 14,
    color: '#6b7280',
  },
  editorContainer: {
    gap: 16,
  },
  imageUpload: {
    height: 128,
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: '#e5e7eb',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageUploadDisabled: {
    opacity: 0.5,
  },
  imageUploadContent: {
    alignItems: 'center',
    gap: 8,
  },
  imageUploadText: {
    fontSize: 14,
    color: '#6b7280',
  },
  imageGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  imageContainer: {
    width: '48%',
    aspectRatio: 1,
    borderRadius: 8,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  removeButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: '#ef4444',
    borderRadius: 16,
    padding: 4,
  },
});
import { ArrowLeft, ImagePlus, X } from 'lucide-react-native';
import { useToast } from '@/components/ui/use-toast';
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

  const { toast } = useToast();
  const { user } = useAuth();

  const handleImageUpload = async (file: Blob) => {
    if (images.length >= 4) {
      toast({
        title: 'エラー',
        description: '画像は最大4枚までです。',
        variant: 'destructive',
      });
      return;
    }

    setIsUploading(true);
    try {
      const url = await uploadImage(file, user!.uid);
      setImages([...images, url]);
    } catch (error) {
      console.error('Image upload error:', error);
      toast({
        title: 'エラー',
        description: '画像のアップロードに失敗しました。',
        variant: 'destructive',
      });
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast({
        title: 'エラー',
        description: 'ログインが必要です。',
        variant: 'destructive',
      });
      return;
    }

    if (!content.text.trim()) {
      toast({
        title: 'エラー',
        description: '本文を入力してください。',
        variant: 'destructive',
      });
      return;
    }

    if (content.text.length > 10000) {
      toast({
        title: 'エラー',
        description: '本文は10,000文字以内で入力してください。',
        variant: 'destructive',
      });
      return;
    }

    try {
      await createTextPost({
        userId: user.uid,
        content,
        images,
        isPublic,
      });
      
      toast({
        title: '投稿完了',
        description: '投稿が完了しました。',
      });
      
      router.push('/(tabs)/timeline');
    } catch (error) {
      console.error('Post creation error:', error);
      toast({
        title: 'エラー',
        description: '投稿に失敗しました。',
        variant: 'destructive',
      });
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Button
          variant="outline"
          onPress={() => router.push('/(tabs)/post')}
        >
          <ArrowLeft size={20} color="#6b7280" />
        </Button>
        <Text style={styles.title}>テキスト投稿</Text>
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
            <Label>公開設定</Label>
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
                  handleImageUpload(blob);
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
                {images.map((url, index) => (
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