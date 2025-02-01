import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { FcGoogle } from 'react-icons/fc';

export default function LoginPage() {
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const handleGoogleLogin = () => {
    if (!agreedToTerms) {
      alert('利用規約とプライバシーポリシーに同意してください。');
      return;
    }
    // TODO: Implement Google login
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100 p-4">
      <div className="w-full max-w-md space-y-8 bg-white p-8 rounded-xl shadow-lg">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">目醒め人のためのSNS</h1>
          <p className="text-gray-600 text-sm">
            本当に深い繋がりを重視し、「目醒め」をテーマにした、共感・学び合い・自己表現ができるコミュニティSNS
          </p>
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
                利用規約とプライバシーポリシーに同意する
              </label>
              <p className="text-sm text-muted-foreground">
                <a href="/terms" className="text-primary hover:underline">利用規約</a>
                {' '}と{' '}
                <a href="/privacy" className="text-primary hover:underline">プライバシーポリシー</a>
                {' '}をご確認ください。
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 