import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { ArrowLeft, Video as VideoIcon, Upload, Play, Pause } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useYouTubeUpload } from '@/hooks/use-youtube-upload';

export default function VideoPostPage() {
  const navigate = useNavigate();
  const { uploadVideo, progress, error: uploadError, isUploading } = useYouTubeUpload();
  const [videoBlob, setVideoBlob] = useState<Blob | null>(null);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [description, setDescription] = useState('');
  const [isPublic, setIsPublic] = useState(true);
  const [isRecording, setIsRecording] = useState(false);
  
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const videoChunksRef = useRef<Blob[]>([]);
  const videoElementRef = useRef<HTMLVideoElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true
      });
      streamRef.current = stream;
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      videoChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        videoChunksRef.current.push(event.data);
      };

      mediaRecorder.onstop = () => {
        const videoBlob = new Blob(videoChunksRef.current, { type: 'video/webm' });
        const videoUrl = URL.createObjectURL(videoBlob);
        setVideoBlob(videoBlob);
        setVideoUrl(videoUrl);
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);
    } catch (error) {
      console.error('録画の開始に失敗しました:', error);
      alert('録画の開始に失敗しました。カメラとマイクへのアクセスを許可してください。');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setVideoBlob(file);
      setVideoUrl(url);
    }
  };

  const togglePlayback = () => {
    if (videoElementRef.current) {
      if (isPlaying) {
        videoElementRef.current.pause();
      } else {
        videoElementRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleSubmit = async () => {
    if (!videoBlob) {
      alert('動画を録画または選択してください。');
      return;
    }

    try {
      const videoFile = new File([videoBlob], 'video.webm', { type: 'video/webm' });
      const videoUrl = await uploadVideo(videoFile, description || '無題', isPublic);

      if (uploadError) {
        alert(uploadError);
        return;
      }

      if (videoUrl) {
        // バックエンドAPIを呼び出して投稿を作成
        // TODO: createPost APIの実装後に統合
        navigate('/');
      }
    } catch (error) {
      console.error('投稿の作成に失敗しました:', error);
      alert(error instanceof Error ? error.message : '投稿の作成に失敗しました。');
    }
  };

  // アップロード進捗の表示
  const renderProgress = () => {
    if (!isUploading) return null;
    return (
      <div className="mt-4">
        <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-blue-500 transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="text-sm text-gray-500 mt-1">アップロード中... {progress}%</p>
      </div>
    );
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
          <h1 className="text-lg font-semibold">動画投稿</h1>
          <Button
            onClick={handleSubmit}
            disabled={!videoBlob || isUploading}
          >
            {isUploading ? 'アップロード中...' : '投稿する'}
          </Button>
        </div>

        <div className="py-6 space-y-6">
          {/* アップロード進捗 */}
          {renderProgress()}
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

          {/* 動画プレビュー/録画 */}
          <div className="space-y-4">
            {isRecording && streamRef.current && (
              <video
                ref={videoElementRef}
                autoPlay
                muted
                playsInline
                className="w-full aspect-video rounded-lg bg-black"
                {...{ srcObject: streamRef.current }}
              />
            )}
            
            {videoUrl && !isRecording && (
              <div className="relative">
                <video
                  ref={videoElementRef}
                  src={videoUrl}
                  className="w-full aspect-video rounded-lg bg-black"
                  onClick={togglePlayback}
                />
                <Button
                  variant="outline"
                  size="icon"
                  className="absolute bottom-4 right-4"
                  onClick={togglePlayback}
                >
                  {isPlaying ? (
                    <Pause className="h-4 w-4" />
                  ) : (
                    <Play className="h-4 w-4" />
                  )}
                </Button>
              </div>
            )}

            {!videoUrl && !isRecording && (
              <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
                <div className="text-center space-y-4">
                  <VideoIcon className="h-12 w-12 text-gray-400 mx-auto" />
                  <div className="space-x-4">
                    <Button
                      variant="outline"
                      onClick={startRecording}
                    >
                      録画を開始
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <Upload className="h-4 w-4 mr-2" />
                      動画を選択
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {isRecording && (
              <div className="flex justify-center">
                <Button
                  variant="destructive"
                  onClick={stopRecording}
                >
                  録画を停止
                </Button>
              </div>
            )}

            <input
              ref={fileInputRef}
              type="file"
              accept="video/*"
              className="hidden"
              onChange={handleFileSelect}
            />
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
        </div>
      </div>
    </div>
  );
}        