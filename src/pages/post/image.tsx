import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { ArrowLeft, Image as ImageIcon, Plus, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { uploadImage, ImageUploadError } from '@/lib/storage';

const LAYOUT_OPTIONS = [
  { id: 'single', label: '1枚', maxImages: 1 },
  { id: 'triple', label: '3枚', maxImages: 3 },
  { id: 'quad', label: '4枚', maxImages: 4 },
  { id: 'grid', label: '9枚', maxImages: 9 },
];

interface ImagePreview {
  url: string;
  file: File;
}

export default function ImagePostPage() {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedLayout, setSelectedLayout] = useState(LAYOUT_OPTIONS[0]);
  const [images, setImages] = useState<ImagePreview[]>([]);
  const [description, setDescription] = useState('');

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const remainingSlots = selectedLayout.maxImages - images.length;
    const newFiles = files.slice(0, remainingSlots);

    const newImages = newFiles.map((file) => ({
      url: URL.createObjectURL(file),
      file,
    }));

    setImages([...images, ...newImages]);
  };

  const handleRemoveImage = (index: number) => {
    const newImages = [...images];
    URL.revokeObjectURL(newImages[index].url);
    newImages.splice(index, index + 1);
    setImages(newImages);
  };

  const handleSubmit = async () => {
    if (images.length === 0) {
      alert('画像を選択してください。');
      return;
    }

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
            disabled={images.length === 0}
          >
            投稿する
          </Button>
        </div>

        <div className="py-6 space-y-6">
          {/* レイアウト選択 */}
          <div className="space-y-2">
            <Label>レイアウト</Label>
            <div className="grid grid-cols-4 gap-2">
              {LAYOUT_OPTIONS.map((layout) => (
                <Button
                  key={layout.id}
                  variant={selectedLayout.id === layout.id ? 'default' : 'outline'}
                  className="w-full"
                  onClick={() => {
                    if (images.length > layout.maxImages) {
                      const removedImages = images.slice(layout.maxImages);
                      removedImages.forEach((img) => URL.revokeObjectURL(img.url));
                      setImages(images.slice(0, layout.maxImages));
                    }
                    setSelectedLayout(layout);
                  }}
                >
                  {layout.label}
                </Button>
              ))}
            </div>
          </div>

          {/* 画像プレビュー */}
          <div className={cn(
            'grid gap-2',
            selectedLayout.id === 'single' && 'grid-cols-1',
            selectedLayout.id === 'triple' && 'grid-cols-3',
            selectedLayout.id === 'quad' && 'grid-cols-2',
            selectedLayout.id === 'grid' && 'grid-cols-3',
          )}>
            {Array.from({ length: selectedLayout.maxImages }).map((_, index) => (
              <div
                key={index}
                className={cn(
                  'aspect-square rounded-lg overflow-hidden',
                  selectedLayout.id === 'single' && 'max-h-[500px]',
                )}
              >
                {images[index] ? (
                  <div className="relative h-full">
                    <img
                      src={images[index].url}
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
                ) : (
                  <Button
                    variant="outline"
                    className="w-full h-full"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <div className="flex flex-col items-center space-y-2">
                      <Plus className="h-6 w-6" />
                      <span className="text-sm">画像を追加</span>
                    </div>
                  </Button>
                )}
              </div>
            ))}
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