import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { ArrowLeft } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { useToast } from '@/components/ui/use-toast';
import { createTextPost } from '@/lib/firebase';
import { useAuth } from '@/contexts/AuthContext';

export default function TextPostPage() {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [view, setView] = useState<'edit' | 'preview'>('edit');
  const [isPublic, setIsPublic] = useState(true);

  const { toast } = useToast();
  const { user } = useAuth();

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

    if (!title.trim() || !content.trim()) {
      toast({
        title: 'エラー',
        description: 'タイトルと本文を入力してください。',
        variant: 'destructive',
      });
      return;
    }

    if (content.length > 10000) {
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
        title,
        content,
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
        {/* ヘッダー */}
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
            disabled={!title.trim() || !content.trim()}
          >
            投稿する
          </Button>
        </div>

        <div className="py-6 space-y-6">
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

          {/* タイトル入力 */}
          <div className="space-y-2">
            <Label htmlFor="title">タイトル</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="タイトルを入力"
              maxLength={100}
            />
          </div>

          {/* 編集/プレビュー切り替え */}
          <Tabs value={view} onValueChange={(v) => setView(v as 'edit' | 'preview')}>
            <TabsList className="w-full">
              <TabsTrigger value="edit" className="flex-1">
                編集
              </TabsTrigger>
              <TabsTrigger value="preview" className="flex-1">
                プレビュー
              </TabsTrigger>
            </TabsList>
          </Tabs>

          {/* 本文入力/プレビュー */}
          <div className="min-h-[400px]">
            {view === 'edit' ? (
              <div className="space-y-2">
                <Label htmlFor="content">本文（Markdown対応）</Label>
                <Textarea
                  id="content"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="本文を入力（最大10,000文字）"
                  className="min-h-[400px]"
                />
                <p className="text-sm text-gray-500 text-right">
                  {content.length}/10000文字
                </p>
              </div>
            ) : (
              <div className="prose max-w-none">
                <ReactMarkdown>{content || '本文がありません'}</ReactMarkdown>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}  