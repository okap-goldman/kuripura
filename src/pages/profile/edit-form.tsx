import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Camera, Mic, Square, Play, Pause, Upload } from 'lucide-react';

interface ProfileEditFormProps {
  profile: {
    name: string;
    image: string;
    bio: string;
    bioAudioUrl: string;
    externalLink?: string;
  };
  onSubmit: () => void;
}

export default function ProfileEditForm({ profile, onSubmit }: ProfileEditFormProps) {
  const [name, setName] = useState(profile.name);
  const [bio, setBio] = useState(profile.bio);
  const [externalLink, setExternalLink] = useState(profile.externalLink || '');
  const [imagePreview, setImagePreview] = useState(profile.image);
  const [isRecording, setIsRecording] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(profile.bioAudioUrl);
  const [isPlaying, setIsPlaying] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const audioElementRef = useRef<HTMLAudioElement | null>(null);

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setImagePreview(url);
    }
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
        const audioUrl = URL.createObjectURL(audioBlob);
        setAudioUrl(audioUrl);
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);
    } catch (error) {
      console.error('録音の開始に失敗しました:', error);
      alert('録音の開始に失敗しました。マイクへのアクセスを許可してください。');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const togglePlayback = () => {
    if (audioElementRef.current && audioUrl) {
      if (isPlaying) {
        audioElementRef.current.pause();
      } else {
        audioElementRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim() || !bio.trim()) {
      alert('名前と自己紹介文を入力してください。');
      return;
    }

    // TODO: Implement profile update
    console.log({ name, bio, externalLink, imagePreview, audioUrl });
    onSubmit();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* プロフィール画像 */}
      <div className="flex flex-col items-center space-y-4">
        <Avatar className="h-24 w-24">
          <AvatarImage src={imagePreview} />
          <AvatarFallback>{name[0]}</AvatarFallback>
        </Avatar>
        <Button
          type="button"
          variant="outline"
          onClick={() => fileInputRef.current?.click()}
        >
          <Camera className="h-4 w-4 mr-2" />
          画像を変更
        </Button>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleImageSelect}
        />
      </div>

      {/* 名前入力 */}
      <div className="space-y-2">
        <Label htmlFor="name">名前</Label>
        <Input
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          maxLength={50}
        />
      </div>

      {/* 自己紹介文 */}
      <div className="space-y-2">
        <Label htmlFor="bio">自己紹介文</Label>
        <Textarea
          id="bio"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          maxLength={280}
          className="min-h-[100px]"
        />
        <p className="text-sm text-gray-500 text-right">
          {bio.length}/280文字
        </p>
      </div>

      {/* 自己紹介音声 */}
      <div className="space-y-4">
        <Label>自己紹介音声</Label>
        <div className="flex justify-center space-x-4">
          {!audioUrl ? (
            <Button
              type="button"
              size="lg"
              variant={isRecording ? 'destructive' : 'default'}
              className="w-16 h-16 rounded-full"
              onClick={isRecording ? stopRecording : startRecording}
            >
              {isRecording ? (
                <Square className="h-6 w-6" />
              ) : (
                <Mic className="h-6 w-6" />
              )}
            </Button>
          ) : (
            <Button
              type="button"
              size="lg"
              variant="outline"
              className="w-16 h-16 rounded-full"
              onClick={togglePlayback}
            >
              {isPlaying ? (
                <Pause className="h-6 w-6" />
              ) : (
                <Play className="h-6 w-6" />
              )}
            </Button>
          )}
        </div>

        {audioUrl && (
          <audio
            ref={audioElementRef}
            src={audioUrl}
            onEnded={() => setIsPlaying(false)}
            className="hidden"
          />
        )}
      </div>

      {/* 外部リンク */}
      <div className="space-y-2">
        <Label htmlFor="external-link">ショップ/外部リンク（任意）</Label>
        <Input
          id="external-link"
          type="url"
          value={externalLink}
          onChange={(e) => setExternalLink(e.target.value)}
          placeholder="https://example.com"
        />
      </div>

      {/* 保存ボタン */}
      <Button type="submit" className="w-full">
        保存する
      </Button>
    </form>
  );
} 