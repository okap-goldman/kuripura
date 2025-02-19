import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore, collection, addDoc } from 'firebase/firestore';

// 環境変数が正しく読み込まれているか確認
console.log('Environment Variables:', {
  VITE_FIREBASE_API_KEY: import.meta.env.VITE_FIREBASE_API_KEY,
  VITE_FIREBASE_AUTH_DOMAIN: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  VITE_FIREBASE_PROJECT_ID: import.meta.env.VITE_FIREBASE_PROJECT_ID
});

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
};

// Firebaseの初期化
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };

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
