import { Alert } from 'react-native';

interface ToastOptions {
  title: string;
  description?: string;
}

export function useToast() {
  const toast = ({ title, description }: ToastOptions) => {
    Alert.alert(title, description);
  };

  return { toast };
} 