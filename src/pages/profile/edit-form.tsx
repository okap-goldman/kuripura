import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Camera, Mic, Square, Play, Pause, ChevronRight } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ProfileEditFormProps {
  profile: {
    name: string;
    username: string;
    image: string;
    bio: string;
    bioAudioUrl: string;
    externalLink?: string;
    pronouns?: string;
  };
  onSubmit: () => void;
  onCancel: () => void;
}

export default function ProfileEditForm({ profile, onSubmit, onCancel }: ProfileEditFormProps) {
  const [name, setName] = useState(profile.name);
  const [username, setUsername] = useState(profile.username);
  const [bio, setBio] = useState(profile.bio);
  const [externalLink, setExternalLink] = useState(profile.externalLink || '');
  const [imagePreview, setImagePreview] = useState(profile.image);
  const [isRecording, setIsRecording] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(profile.bioAudioUrl);
  const [isPlaying, setIsPlaying] = useState(false);
  const [pronouns, setPronouns] = useState(profile.pronouns || '');

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
    console.log({ name, username, bio, externalLink, imagePreview, audioUrl, pronouns });
    onSubmit();
  };

  return (
    <div className="flex flex-col h-full">
      {/* ヘッダー */}
      <div className="flex justify-between items-center px-4 py-3 border-b">
        <Button variant="ghost" onClick={onCancel}>
          キャンセル
        </Button>
        <h1 className="text-lg font-semibold">プロフィールを編集</h1>
        <Button variant="ghost" onClick={handleSubmit}>
          完了
        </Button>
      </div>

      <div className="flex-1 overflow-auto">
        <div className="p-4 space-y-6">
          {/* プロフィール画像 */}
          <div className="flex flex-col items-center space-y-2">
            <Avatar className="h-24 w-24">
              <AvatarImage src={imagePreview} />
              <AvatarFallback>{name[0]}</AvatarFallback>
            </Avatar>
            <Button
              type="button"
              variant="link"
              className="text-blue-500"
              onClick={() => fileInputRef.current?.click()}
            >
              写真やアバターを編集
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
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">名前</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                maxLength={50}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="username">ユーザーネーム</Label>
              <Input
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                maxLength={15}
                placeholder="@username"
              />
            </div>
          </div>

          {/* 代名詞の性別 */}
          <div className="space-y-2">
            <Label htmlFor="pronouns">代名詞の性別</Label>
            <Select value={pronouns} onValueChange={setPronouns}>
              <SelectTrigger id="pronouns" className="w-full">
                <SelectValue placeholder="代名詞の性別" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="he">彼 (he/him)</SelectItem>
                <SelectItem value="she">彼女 (she/her)</SelectItem>
                <SelectItem value="they">その他 (they/them)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* 自己紹介文 */}
          <div className="space-y-2">
            <Label htmlFor="bio">自己紹介</Label>
            <Textarea
              id="bio"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              maxLength={280}
              className="min-h-[100px]"
              placeholder="自己紹介を入力"
            />
            <p className="text-sm text-gray-500 text-right">
              {bio.length}/280文字
            </p>
          </div>

          {/* リンク */}
          <div className="space-y-2">
            <Label htmlFor="external-link">リンク</Label>
            <div className="flex items-center space-x-2 border rounded-md px-3 py-2" onClick={() => document.getElementById('external-link')?.focus()}>
              <Input
                id="external-link"
                type="url"
                value={externalLink}
                onChange={(e) => setExternalLink(e.target.value)}
                placeholder="リンクを追加"
                className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0 px-0"
              />
              <ChevronRight className="h-4 w-4 text-gray-400" />
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
              variant="outline"
              className="w-full text-blue-500"
              onClick={() => {/* TODO: Implement pro account switch */}}
            >
              プロアカウントに切り替える
            </Button>
          </div>

          {/* 個人の情報の設定 */}
          <div className="pt-2">
            <Button
              type="button"
              variant="outline"
              className="w-full text-blue-500"
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