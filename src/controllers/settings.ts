import { db } from '../lib/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import type { NotificationSettings } from '../types/user';

export const getNotificationSettings = async (userId: string) => {
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
    // エラー時はデフォルト設定を返す
    return {
      comments: true,
      highlights: true,
      new_followers: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
  }
};

export const updateNotificationSettings = async (
  userId: string,
  settings: Partial<NotificationSettings>
) => {
  const docRef = doc(db, 'users', userId, 'settings', 'notifications');
  await setDoc(docRef, {
    ...settings,
    updated_at: new Date().toISOString()
  }, { merge: true });
};
