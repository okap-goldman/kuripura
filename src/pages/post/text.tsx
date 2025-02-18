import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { ArrowLeft, ImagePlus, X } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { createTextPost, uploadImage } from '@/lib/firebase';
import { useAuth } from '@/contexts/AuthContext';
import { RichTextEditor } from '@/components/RichTextEditor';

export default function TextPostPage() {
  const navigate = useNavigate();
  const [content, setContent] = useState({ text: '', html: '' });
  const [images, setImages] = useState<string[]>([]);
  const [isPublic, setIsPublic] = useState(true);
  const [isUploading, setIsUploading] = useState(false);

  const { toast } = useToast();
  const { user } = useAuth();

  const handleImageUpload = async (file: File) => {
    if (images.length >= 4) {
      toast({
        title: 'エラー',
        description: '画像は最大4枚までです。',
        variant: 'destructive',
      });
      return;
    }

    setIsUploading(true);
    try {
      const url = await uploadImage(file, user!.uid);
      setImages([...images, url]);
    } catch (error) {
      console.error('Image upload error:', error);
      toast({
        title: 'エラー',
        description: '画像のアップロードに失敗しました。',
        variant: 'destructive',
      });
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast({
        title: 'エラー',
        description: 'ログインが必要です。',
        variant: 'destructive',
      });
      return;
    }

    if (!content.text.trim()) {
      toast({
        title: 'エラー',
        description: '本文を入力してください。',
        variant: 'destructive',
      });
      return;
    }

    if (content.text.length > 10000) {
      toast({
        title: 'エラー',
        description: '本文は10,000文字以内で入力してください。',
        variant: 'destructive',
      });
      return;
    }

    try {
      await createTextPost({
        userId: user.uid,
        content,
        images,
        isPublic,
      });
      
      toast({
        title: '投稿完了',
        description: '投稿が完了しました。',
      });
      
      navigate('/timeline');
    } catch (error) {
      console.error('Post creation error:', error);
      toast({
        title: 'エラー',
        description: '投稿に失敗しました。',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-16 pb-16">
      <div className="container mx-auto px-4">
        <div className="sticky top-16 bg-gray-50 py-4 z-10 flex items-center justify-between border-b">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate('/post')}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-lg font-semibold">テキスト投稿</h1>
          <Button
            onClick={handleSubmit}
            disabled={!content.text.trim() || isUploading}
          >
            投稿する
          </Button>
        </div>

        <div className="py-6 space-y-6">
          <div className="flex items-center justify-between">
            <Label htmlFor="public-switch">公開設定</Label>
            <div className="flex items-center space-x-2">
              <Label htmlFor="public-switch" className="text-sm text-gray-500">
                {isPublic ? '公開' : '下書き'}
              </Label>
              <Switch
                id="public-switch"
                checked={isPublic}
                onCheckedChange={setIsPublic}
              />
            </div>
          </div>

          <div className="space-y-4">
            <RichTextEditor
              content={content}
              onChange={setContent}
            />

            <div className="mt-4">
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) handleImageUpload(file);
                }}
                disabled={images.length >= 4 || isUploading}
                className="hidden"
                id="image-upload"
              />
              <Label
                htmlFor="image-upload"
                className={`flex items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer ${
                  images.length >= 4 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-50'
                }`}
              >
                <div className="flex flex-col items-center">
                  <ImagePlus className="h-8 w-8 text-gray-400 mb-2" />
                  <span className="text-sm text-gray-500">
                    {isUploading ? '画像をアップロード中...' : '画像を追加（最大4枚）'}
                  </span>
                </div>
              </Label>

              {images.length > 0 && (
                <div className="grid grid-cols-2 gap-2 mt-2">
                  {images.map((url, index) => (
                    <div key={url} className="relative">
                      <img
                        src={url}
                        alt={`添付画像 ${index + 1}`}
                        className="w-full h-40 object-cover rounded-lg"
                      />
                      <Button
                        variant="destructive"
                        size="icon"
                        className="absolute top-2 right-2 h-6 w-6"
                        onClick={() => setImages(images.filter(i => i !== url))}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}    