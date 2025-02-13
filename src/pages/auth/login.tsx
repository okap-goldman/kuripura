import { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { Button } from '@/components/ui/native/button';
import { Checkbox } from '@/components/ui/native/checkbox';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { Google } from 'lucide-react-native';

export default function LoginPage() {
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const { user, isInitialized, login } = useAuth();
  const params = useLocalSearchParams();
  const { toast } = useToast();
  
  const isDevelopment = import.meta.env.MODE === 'development';
  const testingEmail = import.meta.env.VITE_TESTING_GOOGLE_MAIL;

  useEffect(() => {
    if (isInitialized && user) {
      const from = params.from as string || '/';
      router.replace(from);
    }
  }, [user, isInitialized, params.from]);

  const handleGoogleLogin = async () => {
    if (!agreedToTerms) {
      toast({
        title: 'エラー',
        description: '利用規約とプライバシーポリシーに同意してください',
        variant: 'destructive',
      });
      return;
    }

    try {
      await login();
      toast({
        title: 'ログイン成功',
        description: 'ようこそ！',
      });
    } catch (error) {
      console.error('Login error:', error);
      toast({
        title: 'エラー',
        description: 'ログインに失敗しました',
        variant: 'destructive',
      });
    }
  };

  if (!isInitialized) {
    return (
      <View style={styles.loadingContainer}>
        <View style={styles.spinner} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.header}>
          <Text style={styles.title}>目醒め人のためのSNS</Text>
        </View>

        <View style={styles.content}>
          {isDevelopment && testingEmail && (
            <Text style={styles.devInfo}>
              開発環境: {testingEmail} でログイン
            </Text>
          )}
          <Button
            onPress={handleGoogleLogin}
            variant="outline"
            disabled={!agreedToTerms}
            style={styles.loginButton}
          >
            <View style={styles.buttonContent}>
              <Google size={24} color="#000" />
              <Text style={styles.buttonText}>Googleでログイン</Text>
            </View>
          </Button>

          <View style={styles.termsContainer}>
            <Checkbox
              checked={agreedToTerms}
              onCheckedChange={(checked) => setAgreedToTerms(checked as boolean)}
            />
            <View style={styles.termsText}>
              <Text style={styles.termsLabel}>
                <Text 
                  style={styles.link}
                  onPress={() => router.push('/terms')}
                >
                  利用規約
                </Text>
                と
                <Text 
                  style={styles.link}
                  onPress={() => router.push('/privacy')}
                >
                  プライバシーポリシー
                </Text>
                に同意する
              </Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f4f6',
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    width: '100%',
    maxWidth: 400,
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  header: {
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
  },
  content: {
    gap: 24,
  },
  devInfo: {
    fontSize: 14,
    color: '#6b7280',
    textAlign: 'center',
  },
  loginButton: {
    width: '100%',
    paddingVertical: 16,
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  googleIcon: {
    width: 24,
    height: 24,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  termsContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
  },
  termsText: {
    flex: 1,
  },
  termsLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#374151',
  },
  link: {
    color: '#3b82f6',
    textDecorationLine: 'underline',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  spinner: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#ef4444',
    borderTopColor: 'transparent',
    borderBottomColor: 'transparent',
    transform: [{ rotate: '45deg' }],
  },
});                                                                                                                                                                                                                                                                                                                              