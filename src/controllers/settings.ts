import { db } from '../lib/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import type { NotificationSettings } from '../types/user';

export const getNotificationSettings = async (userId: string) => {
  const isDevelopment = import.meta.env.VITE_MODE === 'development';
  
  if (isDevelopment) {
    // 開発環境ではモックデータを返す
    return {
      comments: true,
      highlights: true,
      new_followers: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
  }

  try {
    const docRef = doc(db, 'users', userId, 'settings', 'notifications');
    const docSnap = await getDoc(docRef);
    
    if (!docSnap.exists()) {
      // デフォルト設定
      const defaultSettings: NotificationSettings = {
        comments: true,
        highlights: true,
        new_followers: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
      await setDoc(docRef, defaultSettings, { merge: true });
      return defaultSettings;
    }
    
    return docSnap.data() as NotificationSettings;
  } catch (error) {
    console.error('Failed to get notification settings:', error);
    throw error;
  }
};

export const updateNotificationSettings = async (
  userId: string,
  settings: Partial<NotificationSettings>
) => {
  const isDevelopment = import.meta.env.VITE_MODE === 'development';
  
  if (isDevelopment) {
    // 開発環境では成功を模擬
    console.log('Development: Settings updated', settings);
    return;
  }

  try {
    const docRef = doc(db, 'users', userId, 'settings', 'notifications');
    await setDoc(docRef, {
      ...settings,
      updated_at: new Date().toISOString()
    }, { merge: true });
  } catch (error) {
    console.error('Failed to update settings:', error);
    throw error;
  }
};
