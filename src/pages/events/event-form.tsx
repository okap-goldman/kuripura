import { useState, useRef } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Button } from '@/components/ui/native/button';
import { Input } from '@/components/ui/native/input';
import { Label } from '@/components/ui/native/label';
import { Textarea } from '@/components/ui/native/textarea';
import { Switch } from '@/components/ui/native/switch';
import * as ImagePicker from 'expo-image-picker';
import { Calendar, MapPin, Upload } from 'lucide-react-native';

interface EventFormProps {
  onSubmit: () => void;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    padding: 16,
    gap: 24,
  },
  section: {
    gap: 8,
  },
  imageUpload: {
    aspectRatio: 16 / 9,
    backgroundColor: '#f3f4f6',
    borderRadius: 8,
    overflow: 'hidden',
  },
  previewImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  uploadPlaceholder: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  uploadText: {
    fontSize: 14,
    color: '#6b7280',
  },
  row: {
    flexDirection: 'row',
    gap: 16,
  },
  column: {
    flex: 1,
    gap: 8,
  },
  inputWithIcon: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputIcon: {
    position: 'absolute',
    left: 12,
    zIndex: 1,
  },
  textarea: {
    minHeight: 120,
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  switchWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  switchLabel: {
    fontSize: 14,
    color: '#6b7280',
  },
  submitButton: {
    marginTop: 24,
  },
});

export default function EventForm({ onSubmit }: EventFormProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [location, setLocation] = useState('');
  const [price, setPrice] = useState('0');
  const [capacity, setCapacity] = useState('20');
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isPublic, setIsPublic] = useState(true);

  const handleImageSelect = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setImagePreview(result.assets[0].uri);
    }
  };

  const handleSubmit = async () => {
    
    if (!title.trim() || !description.trim() || !date || !time || !location.trim()) {
      alert('必須項目を入力してください。');
      return;
    }

    // TODO: Implement event creation
    console.log({
      title,
      description,
      date,
      time,
      location,
      price: parseInt(price),
      capacity: parseInt(capacity),
      imagePreview,
      isPublic,
    });
    onSubmit();
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        {/* イベント画像 */}
        <View style={styles.section}>
          <Label>イベント画像</Label>
          <TouchableOpacity
            style={styles.imageUpload}
            onPress={handleImageSelect}
          >
            {imagePreview ? (
              <Image
                source={{ uri: imagePreview }}
                style={styles.previewImage}
              />
            ) : (
              <View style={styles.uploadPlaceholder}>
                <Upload size={32} color="#9ca3af" />
                <Text style={styles.uploadText}>
                  タップして画像をアップロード
                </Text>
              </View>
            )}
          </TouchableOpacity>
        </View>

        {/* タイトル */}
        <View style={styles.section}>
          <Label>タイトル *</Label>
          <Input
            value={title}
            onChangeText={setTitle}
            maxLength={100}
            placeholder="イベントのタイトル"
          />
        </View>

        {/* 説明文 */}
        <View style={styles.section}>
          <Label>イベント詳細 *</Label>
          <Textarea
            value={description}
            onChangeText={setDescription}
            placeholder="イベントの詳細な説明"
            style={styles.textarea}
          />
        </View>

        {/* 日時 */}
        <View style={styles.row}>
          <View style={styles.column}>
            <Label>開催日 *</Label>
            <View style={styles.inputWithIcon}>
              <Calendar size={16} color="#6b7280" style={styles.inputIcon} />
              <Input
                value={date}
                onChangeText={setDate}
                placeholder="YYYY-MM-DD"
              />
            </View>
          </View>
          <View style={styles.column}>
            <Label>開始時間 *</Label>
            <Input
              value={time}
              onChangeText={setTime}
              placeholder="HH:MM"
            />
          </View>
        </View>

        {/* 開催場所 */}
        <View style={styles.section}>
          <Label>開催場所 *</Label>
          <View style={styles.inputWithIcon}>
            <MapPin size={16} color="#6b7280" style={styles.inputIcon} />
            <Input
              value={location}
              onChangeText={setLocation}
              placeholder="例: 東京都渋谷区"
            />
          </View>
        </View>

        {/* 参加費 */}
        <View style={styles.section}>
          <Label>参加費</Label>
          <Input
            value={price}
            onChangeText={setPrice}
            keyboardType="numeric"
            placeholder="0"
          />
        </View>

        {/* 定員 */}
        <View style={styles.section}>
          <Label>定員</Label>
          <Input
            value={capacity}
            onChangeText={setCapacity}
            keyboardType="numeric"
            placeholder="20"
          />
        </View>

        {/* 公開設定 */}
        <View style={styles.switchContainer}>
          <Label>公開設定</Label>
          <View style={styles.switchWrapper}>
            <Text style={styles.switchLabel}>
              {isPublic ? '公開' : '限定公開'}
            </Text>
            <Switch
              checked={isPublic}
              onCheckedChange={setIsPublic}
            />
          </View>
        </View>

        {/* 作成ボタン */}
        <Button
          onPress={handleSubmit}
          style={styles.submitButton}
        >
          イベントを作成
        </Button>
      </View>
    </ScrollView>
  );
}        