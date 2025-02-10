import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { FcGoogle } from 'react-icons/fc';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '@/contexts/AuthContext';

export default function LoginPage() {
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

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
      navigate('/');
      toast({
        title: 'ログイン成功',
        description: 'ようこそ！',
      });
    } catch (error) {
      console.error('Google login error:', error);
      toast({
        title: 'エラー',
        description: 'ログインに失敗しました',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100 p-4">
      <div className="w-full max-w-md space-y-8 bg-white p-8 rounded-xl shadow-lg">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">目醒め人のためのSNS</h1>
        </div>

        <div className="space-y-6">
          <Button
            onClick={handleGoogleLogin}
            variant="outline"
            className="w-full flex items-center justify-center gap-2 py-6"
            disabled={!agreedToTerms}
          >
            <FcGoogle className="w-6 h-6" />
            <span>Googleでログイン</span>
          </Button>

          <div className="flex items-start space-x-2">
            <Checkbox
              id="terms"
              checked={agreedToTerms}
              onCheckedChange={(checked) => setAgreedToTerms(checked as boolean)}
            />
            <div className="grid gap-1.5 leading-none">
              <label
                htmlFor="terms"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                <a href="/terms" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">利用規約</a>
                と
                <a href="/privacy" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">プライバシーポリシー</a>
                に同意する
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}                                