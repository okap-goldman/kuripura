import { useState, useRef } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Button } from '@/components/ui/native/button';
import { Camera, Mic, Square, Play, Pause, ChevronRight } from 'lucide-react-native';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import { Audio } from 'expo-av';
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

  const [recording, setRecording] = useState<Audio.Recording | null>(null);
  const [sound, setSound] = useState<Audio.Sound | null>(null);

  const handleImageSelect = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setImagePreview(result.assets[0].uri);
    }
  };

  const startRecording = async () => {
    try {
      await Audio.requestPermissionsAsync();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      const { recording } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY
      );
      setRecording(recording);
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
              <Label htmlFor="name"><Text>名前</Text></Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                maxLength={50}
                className="border-0 border-b rounded-none focus-visible:ring-0 px-0"
                placeholder="名前を入力"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="username"><Text>ユーザーネーム</Text></Label>
              <Input
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                maxLength={15}
                className="border-0 border-b rounded-none focus-visible:ring-0 px-0"
                placeholder="@username"
              />
            </div>
          </div>

          {/* 代名詞の性別 */}
          <div className="space-y-2">
            <Label htmlFor="pronouns"><Text>代名詞の性別</Text></Label>
            <Select value={pronouns} onValueChange={setPronouns}>
              <SelectTrigger
                id="pronouns"
                className="border-0 border-b rounded-none focus:ring-0 px-0"
              >
                <SelectValue placeholder="代名詞の性別を選択" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="he"><Text>彼 (he/him)</Text></SelectItem>
                <SelectItem value="she"><Text>彼女 (she/her)</Text></SelectItem>
                <SelectItem value="they"><Text>その他 (they/them)</Text></SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* 自己紹介文 */}
          <div className="space-y-2">
            <Label htmlFor="bio"><Text>自己紹介</Text></Label>
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
            <Label htmlFor="external-link"><Text>リンク</Text></Label>
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
            <Label><Text>自己紹介音声</Text></Label>
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
