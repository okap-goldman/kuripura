import * as ImagePicker from 'expo-image-picker';
import * as ImageManipulator from 'expo-image-manipulator';
import { useState } from 'react';
import Constants from 'expo-constants';
import { FileUploadResponse } from '@kuripura/shared';

interface UseProfileImageReturn {
  pickImage: () => Promise<void>;
  isLoading: boolean;
  error: string | null;
}
const API_URL = Constants.expoConfig?.extra?.apiUrl || 'http://localhost:3000';

export const useProfileImage = (): UseProfileImageReturn => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const pickImage = async () => {
    try {
      setIsLoading(true);
      setError(null);

      // 権限の確認
      const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (!permissionResult.granted) {
        setError('画像へのアクセス権限が必要です');
        return;
      }

      // 画像の選択
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      if (!result.canceled && result.assets[0]) {
        // 画像のリサイズ
        const manipulatedImage = await ImageManipulator.manipulateAsync(
          result.assets[0].uri,
          [{ resize: { width: 400, height: 400 } }],
          { compress: 0.8, format: ImageManipulator.SaveFormat.JPEG }
        );

        // 画像をFormDataに変換
        const formData = new FormData();
        formData.append('file', {
          uri: manipulatedImage.uri,
          type: 'image/jpeg',
          name: 'profile.jpg',
        } as any);

        // サーバーにアップロード
        const response = await fetch(`${API_URL}/users/profile/avatar`, {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'multipart/form-data',
          },
          body: formData,
        });

        if (!response.ok) {
          throw new Error('画像のアップロードに失敗しました');
        }
        const data: FileUploadResponse = await response.json();
      }
    } catch (err) {
      setError('画像の処理中にエラーが発生しました');
      console.error('Error picking image:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    pickImage,
    isLoading,
    error,
  };
};