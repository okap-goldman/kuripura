import { useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { Button } from '@/components/ui/native/button';
import { ArrowLeft, Plus, X } from 'lucide-react-native';

const styles = StyleSheet.create({
  addButton: {
    alignItems: 'center',
    backgroundColor: '#f3f4f6',
    borderColor: '#e5e7eb',
    borderRadius: 8,
    borderStyle: 'dashed',
    borderWidth: 2,
    height: '100%',
    justifyContent: 'center',
    width: '100%',
  },
  addButtonContent: {
    alignItems: 'center',
    gap: 8,
  },
  addButtonText: {
    color: '#6b7280',
    fontSize: 14,
  },
  container: {
    backgroundColor: '#f9fafb',
    flex: 1,
  },
  content: {
    flex: 1,
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
  gridGrid: {
    justifyContent: 'space-between',
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
  imageWrapper: {
    height: '100%',
    width: '100%',
  },
  layoutButton: {
    flex: 1,
    minWidth: '23%',
  },
  layoutGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  layoutSection: {
    gap: 8,
  },
  quadGrid: {
    justifyContent: 'space-between',
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
  sectionTitle: {
    color: '#374151',
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 8,
  },
  singleGrid: {
    flexDirection: 'column',
  },
  singleImage: {
    maxHeight: 500,
    width: '100%',
  },
  title: {
    color: '#111827',
    fontSize: 18,
    fontWeight: '600',
  },
  tripleGrid: {
    justifyContent: 'space-between',
  },
});
import * as ImagePicker from 'expo-image-picker';

const LAYOUT_OPTIONS = [
  { id: 'single', label: '1枚', maxImages: 1 },
  { id: 'triple', label: '3枚', maxImages: 3 },
  { id: 'quad', label: '4枚', maxImages: 4 },
  { id: 'grid', label: '9枚', maxImages: 9 },
];

interface ImagePreview {
  uri: string;
}

export default function ImagePostPage() {
  const [selectedLayout, setSelectedLayout] = useState(LAYOUT_OPTIONS[0]);
  const [images, setImages] = useState<ImagePreview[]>([]);
  const [description, setDescription] = useState('');

  const handleSelectImage = async () => {
    const remainingSlots = selectedLayout.maxImages - images.length;
    if (remainingSlots <= 0) return;

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      quality: 1,
    });

    if (!result.canceled) {
      const newImages = result.assets
        .slice(0, remainingSlots)
        .map(asset => ({ uri: asset.uri }));
      setImages([...images, ...newImages]);
    }
  };

  const handleRemoveImage = (index: number) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);
  };

  const handleSubmit = async () => {
    if (images.length === 0) {
      // TODO: Replace with proper alert
      console.warn('画像を選択してください。');
      return;
    }

    // TODO: Implement image upload and post submission
    console.log({ images, description, layout: selectedLayout.id });
    router.replace('/(tabs)' as any);
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
        <Text style={styles.title}><Text>画像投稿</Text></Text>
        <Button
          onPress={handleSubmit}
          disabled={images.length === 0}
        >
          投稿する
        </Button>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.section}>
          {/* レイアウト選択 */}
          <View style={styles.layoutSection}>
            <Text style={styles.sectionTitle}><Text>レイアウト</Text></Text>
            <View style={styles.layoutGrid}>
              {LAYOUT_OPTIONS.map((layout) => (
                <Button
                  key={layout.id}
                  variant={selectedLayout.id === layout.id ? 'default' : 'outline'}
                  onPress={() => {
                    if (images.length > layout.maxImages) {
                      setImages(images.slice(0, layout.maxImages));
                    }
                    setSelectedLayout(layout);
                  }}
                  style={styles.layoutButton}
                >
                  {layout.label}
                </Button>
              ))}
            </View>
          </View>

          {/* 画像プレビュー */}
          <View style={[
            styles.imageGrid,
            selectedLayout.id === 'single' && styles.singleGrid,
            selectedLayout.id === 'triple' && styles.tripleGrid,
            selectedLayout.id === 'quad' && styles.quadGrid,
            selectedLayout.id === 'grid' && styles.gridGrid,
          ]}>
            {Array.from({ length: selectedLayout.maxImages }).map((_, index) => (
              <View
                key={index}
                style={[
                  styles.imageContainer,
                  selectedLayout.id === 'single' && styles.singleImage,
                ]}
              >
                {images[index] ? (
                  <View style={styles.imageWrapper}>
                    <Image
                      source={{ uri: images[index].uri }}
                      style={styles.image}
                    />
                    <TouchableOpacity
                      style={styles.removeButton}
                      onPress={() => handleRemoveImage(index)}
                    >
                      <X size={16} color="#fff" />
                    </TouchableOpacity>
                  </View>
                ) : (
                  <TouchableOpacity
                    style={styles.addButton}
                    onPress={handleSelectImage}
                  >
                    <View style={styles.addButtonContent}>
                      <Plus size={24} color="#6b7280" />
                      <Text style={styles.addButtonText}><Text>画像を追加</Text></Text>
                    </View>
                  </TouchableOpacity>
                )}
              </View>
            ))}
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
      </ScrollView>
    </View>
  );
}        