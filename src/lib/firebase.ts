import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore, collection, addDoc } from 'firebase/firestore';

// TODO: Replace with actual Firebase config
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

interface CreateTextPostData {
  userId: string;
  title: string;
  content: string;
  isPublic: boolean;
}

export const createTextPost = async (data: CreateTextPostData) => {
  const post = {
    userId: data.userId,
    title: data.title,
    text_content: data.content,
    post_type: 'text' as const,
    visibility: data.isPublic ? 'public' : 'private' as const,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };
  
  return await addDoc(collection(db, 'posts'), post);
};
