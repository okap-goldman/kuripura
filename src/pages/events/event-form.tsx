import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Calendar, MapPin, Upload } from 'lucide-react';

interface EventFormProps {
  onSubmit: () => void;
}

export default function EventForm({ onSubmit }: EventFormProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [location, setLocation] = useState('');
  const [price, setPrice] = useState('0');
  const [capacity, setCapacity] = useState('20');
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isPublic, setIsPublic] = useState(true);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setImagePreview(url);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim() || !description.trim() || !date || !time || !location.trim()) {
      alert('必須項目を入力してください。');
      return;
    }

    // TODO: Implement event creation
    console.log({
      title,
      description,
      date,
      time,
      location,
      price: parseInt(price),
      capacity: parseInt(capacity),
      imagePreview,
      isPublic,
    });
    onSubmit();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* イベント画像 */}
      <div className="space-y-2">
        <Label>イベント画像</Label>
        <div
          className="aspect-video bg-gray-100 rounded-lg overflow-hidden relative"
          onClick={() => fileInputRef.current?.click()}
        >
          {imagePreview ? (
            <img
              src={imagePreview}
              alt="イベント画像プレビュー"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <Upload className="h-8 w-8 text-gray-400 mb-2" />
              <span className="text-sm text-gray-500">
                クリックして画像をアップロード
              </span>
            </div>
          )}
        </div>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleImageSelect}
        />
      </div>

      {/* タイトル */}
      <div className="space-y-2">
        <Label htmlFor="title">タイトル *</Label>
        <Input
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          maxLength={100}
          required
        />
      </div>

      {/* 説明文 */}
      <div className="space-y-2">
        <Label htmlFor="description">イベント詳細 *</Label>
        <Textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="min-h-[200px]"
          required
        />
      </div>

      {/* 日時 */}
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="date">開催日 *</Label>
          <div className="relative">
            <Calendar className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
            <Input
              id="date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="pl-10"
              required
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="time">開始時間 *</Label>
          <Input
            id="time"
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            required
          />
        </div>
      </div>

      {/* 開催場所 */}
      <div className="space-y-2">
        <Label htmlFor="location">開催場所 *</Label>
        <div className="relative">
          <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
          <Input
            id="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="pl-10"
            placeholder="例: 東京都渋谷区"
            required
          />
        </div>
      </div>

      {/* 参加費 */}
      <div className="space-y-2">
        <Label htmlFor="price">参加費</Label>
        <Input
          id="price"
          type="number"
          min="0"
          step="100"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
      </div>

      {/* 定員 */}
      <div className="space-y-2">
        <Label htmlFor="capacity">定員</Label>
        <Input
          id="capacity"
          type="number"
          min="1"
          value={capacity}
          onChange={(e) => setCapacity(e.target.value)}
        />
      </div>

      {/* 公開設定 */}
      <div className="flex items-center justify-between">
        <Label htmlFor="public-switch">公開設定</Label>
        <div className="flex items-center space-x-2">
          <Label htmlFor="public-switch" className="text-sm text-gray-500">
            {isPublic ? '公開' : '限定公開'}
          </Label>
          <Switch
            id="public-switch"
            checked={isPublic}
            onCheckedChange={setIsPublic}
          />
        </div>
      </div>

      {/* 作成ボタン */}
      <Button type="submit" className="w-full">
        イベントを作成
      </Button>
    </form>
  );
} 