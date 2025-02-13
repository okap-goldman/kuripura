import { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { Button } from '@/components/ui/native/button';
import { Checkbox } from '@/components/ui/native/checkbox';
import { useToast } from '@/components/ui/native/toast';
import { useAuth } from '@/contexts/AuthContext';
import { LogIn } from 'lucide-react-native';

export default function LoginPage() {
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const { user, isInitialized, login } = useAuth();
  const params = useLocalSearchParams();
  const { toast } = useToast();
  
  const isDevelopment = __DEV__;
  const testingEmail = process.env.EXPO_PUBLIC_TESTING_GOOGLE_MAIL;

  useEffect(() => {
    if (isInitialized && user) {
      const from = params.from as string || '/(app)';
      router.replace(from as any);
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
          <Text style={styles.title}><Text>目醒め人のためのSNS</Text></Text>
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
              <LogIn size={24} color="#000" />
              <Text style={styles.buttonText}><Text>Googleでログイン</Text></Text>
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
                  onPress={() => router.push('/(app)/terms' as any)}
                >
                  利用規約
                </Text>
                と
                <Text 
                  style={styles.link}
                  onPress={() => router.push('/(app)/privacy' as any)}
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
  buttonContent: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 8,
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    elevation: 3,
    maxWidth: 400,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    width: '100%',
  },
  container: {
    alignItems: 'center',
    backgroundColor: '#f3f4f6',
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  content: {
    gap: 24,
  },
  devInfo: {
    color: '#6b7280',
    fontSize: 14,
    textAlign: 'center',
  },
  googleIcon: {
    height: 24,
    width: 24,
  },
  header: {
    alignItems: 'center',
    marginBottom: 24,
  },
  link: {
    color: '#3b82f6',
    textDecorationLine: 'underline',
  },
  loadingContainer: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  loginButton: {
    paddingVertical: 16,
    width: '100%',
  },
  spinner: {
    borderBottomColor: 'transparent',
    borderColor: '#ef4444',
    borderRadius: 16,
    borderTopColor: 'transparent',
    borderWidth: 2,
    height: 32,
    transform: [{ rotate: '45deg' }],
    width: 32,
  },
  termsContainer: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    gap: 8,
  },
  termsLabel: {
    color: '#374151',
    fontSize: 14,
    fontWeight: '500',
  },
  termsText: {
    flex: 1,
  },
  title: {
    color: '#111827',
    fontSize: 24,
    fontWeight: 'bold',
  },
});                                                                                                                                                                                                                                                                                                                                                                                                                                                              