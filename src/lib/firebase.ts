import { initializeApp } from 'firebase/app';
import Constants from 'expo-constants';
import { getAuth } from 'firebase/auth';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

// TODO: Replace with actual Firebase config
const firebaseConfig = {
  apiKey: Constants.expoConfig?.extra?.firebaseApiKey,
  authDomain: Constants.expoConfig?.extra?.firebaseAuthDomain,
  projectId: Constants.expoConfig?.extra?.firebaseProjectId,
  storageBucket: Constants.expoConfig?.extra?.firebaseStorageBucket,
  messagingSenderId: Constants.expoConfig?.extra?.firebaseMessagingSenderId,
  appId: Constants.expoConfig?.extra?.firebaseAppId,
  measurementId: Constants.expoConfig?.extra?.firebaseMeasurementId
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

import * as ImagePicker from 'expo-image-picker';

export const uploadImage = async (userId: string): Promise<string> => {
  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: true,
    quality: 1,
  });

  if (!result.canceled) {
    const { uri } = result.assets[0];
    const response = await fetch(uri);
    const blob = await response.blob();
    
    const storageRef = ref(storage, `posts/${userId}/${Date.now()}`);
    await uploadBytes(storageRef, blob);
    return getDownloadURL(storageRef);
  }
  
  throw new Error('画像の選択がキャンセルされました');
};

interface CreateTextPostData {
  userId: string;
  content: {
    text: string;
    html: string;
  };
  images?: string[];
  isPublic: boolean;
}

export const createTextPost = async (data: CreateTextPostData) => {
  if (data.images && data.images.length > 4) {
    throw new Error('画像は最大4枚までです。');
  }

  const post = {
    userId: data.userId,
    text_content: data.content.text,
    html_content: data.content.html,
    images: data.images || [],
    post_type: 'text' as const,
    visibility: data.isPublic ? 'public' : 'private' as const,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };
  
  return await addDoc(collection(db, 'posts'), post);
};
