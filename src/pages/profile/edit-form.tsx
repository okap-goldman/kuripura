import { useState, useRef } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { uploadProfileImage } from '@/lib/storage';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Camera, Mic, Square, Play, Pause, ChevronRight } from 'lucide-react';
import { DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ProfileEditFormProps {
  profile: {
    user_id: number;
    uid: string;
    user_name: string;
    email: string;
    profile_icon_url: string | null;
    profile_audio_url: string | null;
    shop_link_url: string | null;
    is_shop_link: boolean;
    introduction: string | null;
    created_at: string;
    updated_at: string;
  };
  onSubmit: () => void;
  onCancel: () => void;
}

export default function ProfileEditForm({ profile, onSubmit, onCancel }: ProfileEditFormProps) {
  const [name, setName] = useState(profile.user_name);
  const [bio, setBio] = useState(profile.introduction || '');
  const [externalLink, setExternalLink] = useState(profile.shop_link_url || '');
  const [imagePreview, setImagePreview] = useState(profile.profile_icon_url || '');
  const [isRecording, setIsRecording] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(profile.profile_audio_url);
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

  const { updateProfile } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      let profileImageUrl = imagePreview;
      if (fileInputRef.current?.files?.[0]) {
        profileImageUrl = await uploadProfileImage(fileInputRef.current.files[0]);
      }

      await updateProfile({
        user_name: name,
        profile_icon_url: profileImageUrl,
        introduction: bio,
        shop_link_url: externalLink || null,
        is_shop_link: !!externalLink,
        profile_audio_url: audioUrl,
      });

      onSubmit();
    } catch (error) {
      console.error('プロフィールの更新に失敗しました:', error);
      alert('プロフィールの更新に失敗しました。もう一度お試しください。');
    }
  };

  return (
    <div className="flex flex-col h-full bg-background">
      {/* ヘッダー */}
      <DialogHeader className="border-b px-4 py-3">
        <div className="flex justify-between items-center">
          <Button
            variant="ghost"
            className="text-base font-normal hover:bg-transparent"
            onClick={onCancel}
          >
            キャンセル
          </Button>
          <DialogTitle className="text-lg font-semibold">
            プロフィールを編集
          </DialogTitle>
          <Button
            variant="ghost"
            className="text-blue-500 text-base font-normal hover:bg-transparent"
            onClick={handleSubmit}
          >
            完了
          </Button>
        </div>
        <DialogDescription className="sr-only">
          プロフィール情報の編集フォーム
        </DialogDescription>
      </DialogHeader>

      <div className="flex-1 overflow-auto">
        <div className="p-4 space-y-8">
          {/* プロフィール画像 */}
          <div className="flex flex-col items-center space-y-2">
            <Avatar className="h-24 w-24">
              <AvatarImage src={imagePreview} />
              <AvatarFallback>{name[0]}</AvatarFallback>
            </Avatar>
            <Button
              type="button"
              variant="link"
              className="text-blue-500 font-normal"
              onClick={() => fileInputRef.current?.click()}
            >
              写真やアバターを変更
            </Button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageSelect}
            />
          </div>

          {/* 名前とユーザーネーム */}
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">名前</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                maxLength={50}
                className="border-0 border-b rounded-none focus-visible:ring-0 px-0"
                placeholder="名前を入力"
              />
            </div>

            </div>

          {/* 自己紹介文 */}
          <div className="space-y-2">
            <Label htmlFor="bio">自己紹介</Label>
            <Textarea
              id="bio"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              maxLength={280}
              className="min-h-[100px] border-0 border-b rounded-none focus-visible:ring-0 resize-none px-0"
              placeholder="自己紹介を入力してください"
            />
            <p className="text-sm text-muted-foreground text-right">
              {bio.length}/280文字
            </p>
          </div>

          {/* リンク */}
          <div className="space-y-2">
            <Label htmlFor="external-link">リンク</Label>
            <div className="relative border-b">
              <Input
                id="external-link"
                type="url"
                value={externalLink}
                onChange={(e) => setExternalLink(e.target.value)}
                placeholder="リンクを追加"
                className="border-0 focus-visible:ring-0 pr-8 px-0"
              />
              <ChevronRight className="absolute right-0 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            </div>
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

          {/* プロアカウントへの切り替え */}
          <div className="pt-4">
            <Button
              type="button"
              variant="ghost"
              className="w-full text-blue-500 justify-start px-0 font-normal hover:bg-transparent"
              onClick={() => {/* TODO: Implement pro account switch */}}
            >
              プロアカウントに切り替える
            </Button>
          </div>

          {/* 個人の情報の設定 */}
          <div className="pt-2">
            <Button
              type="button"
              variant="ghost"
              className="w-full text-blue-500 justify-start px-0 font-normal hover:bg-transparent"
              onClick={() => {/* TODO: Implement personal info settings */}}
            >
              個人の情報の設定
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
