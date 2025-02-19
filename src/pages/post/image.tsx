import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { ArrowLeft, Image as ImageIcon, Plus, X } from 'lucide-react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { cn } from '@/lib/utils';
import { uploadImage, ImageUploadError } from '@/lib/storage';

interface ImagePreview {
  url: string;
  file: File;
}

export default function ImagePostPage() {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [images, setImages] = useState<ImagePreview[]>([]);
  const [description, setDescription] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const MAX_IMAGES = 8;

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const remainingSlots = MAX_IMAGES - images.length;
    const newFiles = files.slice(0, remainingSlots);

    const newImages = newFiles.map((file) => ({
      url: URL.createObjectURL(file),
      file,
    }));

    setImages([...images, ...newImages]);
    
    if (files.length > remainingSlots) {
      alert(`画像は最大${MAX_IMAGES}枚までアップロードできます。`);
    }
  };

  const handleRemoveImage = (index: number) => {
    const newImages = [...images];
    URL.revokeObjectURL(newImages[index].url);
    newImages.splice(index, 1);
    setImages(newImages);
  };

  const handleSubmit = async () => {
    if (images.length === 0) {
      alert('画像を選択してください。');
      return;
    }

    setIsLoading(true);
    try {
      const uploadedUrls = await Promise.all(
        images.map(image => uploadImage(image.file))
      );

      const response = await fetch('/api/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          content: description,
          post_type: 'image',
          media_url: uploadedUrls[0],
          additional_media_urls: uploadedUrls.slice(1),
          visibility: 'public'
        })
      });

      if (!response.ok) {
        throw new Error('投稿の作成に失敗しました');
      }

      navigate('/');
    } catch (error) {
      console.error('Error:', error);
      if (error instanceof ImageUploadError) {
        alert(error.message);
      } else {
        alert('画像のアップロードに失敗しました。もう一度お試しください。');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-16 pb-16">
      <div className="container mx-auto px-4">
        {/* ヘッダー */}
        <div className="sticky top-16 bg-gray-50 py-4 z-10 flex items-center justify-between border-b">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate('/post')}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-lg font-semibold">画像投稿</h1>
          <Button
            onClick={handleSubmit}
            disabled={images.length === 0 || isLoading}
          >
            {isLoading ? '投稿中...' : '投稿する'}
          </Button>
        </div>

        <div className="py-6 space-y-6">
          {/* 画像プレビュー */}
          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-2">
              {images.map((image, index) => (
                <div key={index} className="relative aspect-square rounded-lg overflow-hidden">
                  <img
                    src={image.url}
                    alt={`プレビュー ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                  <Button
                    variant="destructive"
                    size="icon"
                    className="absolute top-2 right-2"
                    onClick={() => handleRemoveImage(index)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>

            {/* 画像追加ボタン */}
            <Button
              variant="outline"
              className="w-full aspect-square sm:aspect-auto"
              onClick={() => fileInputRef.current?.click()}
              id="upload-button"
              data-testid="upload-button"
              data-devinid="upload-button"
            >
              <div className="flex flex-col items-center space-y-2">
                <Plus className="h-6 w-6" />
                <span className="text-sm">画像を追加</span>
              </div>
            </Button>
          </div>

          {/* 説明文入力 */}
          <div className="space-y-2">
            <Label htmlFor="description">説明文</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="説明文を入力（任意）"
              className="min-h-[100px]"
            />
          </div>

          {/* 非表示のファイル入力 */}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={handleFileSelect}
          />
        </div>
      </div>
    </div>
  );
}                                                                      