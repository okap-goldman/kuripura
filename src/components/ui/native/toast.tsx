import { View, Text, StyleSheet, Animated } from 'react-native';
import { createContext, useContext, useState, useRef, useEffect } from 'react';

interface Toast {
  title?: string;
  description: string;
  variant?: 'default' | 'destructive';
}

interface ToastContextType {
  toast: (props: Toast) => void;
}

const ToastContext = createContext<ToastContextType | null>(null);

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  const [toast, setToast] = useState<Toast | null>(null);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (toast) {
      Animated.sequence([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.delay(3000),
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start(() => setToast(null));
    }
  }, [toast]);

  const showToast = (props: Toast) => {
    setToast(props);
  };

  return (
    <ToastContext.Provider value={{ toast: showToast }}>
      {children}
      {toast && (
        <Animated.View
          style={[
            styles.container,
            { opacity: fadeAnim },
            toast.variant === 'destructive' && styles.destructive,
          ]}
        >
          {toast.title && (
            <Text style={styles.title}>{toast.title}</Text>
          )}
          <Text style={styles.description}>{toast.description}</Text>
        </Animated.View>
      )}
    </ToastContext.Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 100,
    left: 16,
    right: 16,
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  destructive: {
    backgroundColor: '#fee2e2',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: '#374151',
  },
});
