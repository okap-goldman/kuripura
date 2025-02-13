import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, Linking } from 'react-native';
import { Button } from '@/components/ui/native/button';
import { Tabs } from '@/components/ui/native/tabs';
import { Avatar } from '@/components/ui/native/avatar';
import { Play, Pause, Link as LinkIcon, Edit } from 'lucide-react-native';
import PostCard from '@/components/post/post-card';
import { Dialog } from '@/components/ui/native/dialog';
import ProfileEditForm from './edit-form';

// モックデータ
const MOCK_PROFILE = {
  name: '山田太郎',
  image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=1',
  bio: '私は「目醒め」を探求する旅の途中です。日々の気づきや学びを大切にしながら、より深い自己理解と他者との繋がりを目指しています。',
  bioAudioUrl: 'https://example.com/audio.mp3',
  externalLink: 'https://myshop.example.com',
  familyCount: 42,
  watchCount: 156,
};

const MOCK_POSTS = [
  {
    id: '1',
    author: {
      name: MOCK_PROFILE.name,
      image: MOCK_PROFILE.image,
    },
    content: {
      type: 'text' as const,
      text: '今日の気づき：瞑想を通じて、自分の内なる声にもっと耳を傾けることの大切さを実感しました。',
    },
    createdAt: '2024-01-31 12:00',
    likes: 15,
    comments: 3,
    highlights: 2,
  },
  // 他の投稿...
];

export default function ProfilePage() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);

  const toggleAudio = () => {
    // TODO: Implement audio playback
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-16 pb-16">
      <div className="container mx-auto px-4">
        {/* プロフィールヘッダー */}
        <div className="bg-white rounded-xl p-6 space-y-6">
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-4">
              <Button
                variant="outline"
                size="icon"
                className="rounded-full"
                onClick={toggleAudio}
              >
                {isPlaying ? (
                  <Pause className="h-4 w-4" />
                ) : (
                  <Play className="h-4 w-4" />
                )}
              </Button>
              <Avatar className="h-20 w-20">
                <AvatarImage src={MOCK_PROFILE.image} />
                <AvatarFallback>{MOCK_PROFILE.name[0]}</AvatarFallback>
              </Avatar>
              {MOCK_PROFILE.externalLink && (
                <a
                  href={MOCK_PROFILE.externalLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:text-primary/80"
                >
                  <LinkIcon className="h-5 w-5" />
                </a>
              )}
            </div>

            <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm">
                  <Edit className="h-4 w-4 mr-2" />
                  編集
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle><Text>プロフィールを編集</Text></DialogTitle>
                </DialogHeader>
                <ProfileEditForm
                  profile={MOCK_PROFILE}
                  onSubmit={() => setShowEditDialog(false)}
                />
              </DialogContent>
            </Dialog>
          </div>

          <div className="space-y-4">
            <h1 className="text-xl font-bold">{MOCK_PROFILE.name}</h1>
            <p className="text-gray-600 whitespace-pre-wrap">{MOCK_PROFILE.bio}</p>
            <div className="flex space-x-6">
              <div>
                <span className="text-lg font-bold">{MOCK_PROFILE.familyCount}</span>
                <span className="text-gray-500 ml-2"><Text>ファミリー</Text></span>
              </div>
              <div>
                <span className="text-lg font-bold">{MOCK_PROFILE.watchCount}</span>
                <span className="text-gray-500 ml-2"><Text>ウォッチ</Text></span>
              </div>
            </div>
          </div>
        </div>

        {/* タブ付きコンテンツ */}
        <div className="mt-6">
          <Tabs defaultValue="media">
            <TabsList className="w-full">
              <TabsTrigger value="media" className="flex-1"><Text>メディア</Text></TabsTrigger>
              <TabsTrigger value="audio" className="flex-1"><Text>音声</Text></TabsTrigger>
              <TabsTrigger value="text" className="flex-1"><Text>テキスト</Text></TabsTrigger>
              <TabsTrigger value="highlight" className="flex-1"><Text>ハイライト</Text></TabsTrigger>
              <TabsTrigger value="event" className="flex-1"><Text>イベント</Text></TabsTrigger>
            </TabsList>

            <div className="mt-6">
              <TabsContent value="media">
                <div className="grid grid-cols-3 gap-1">
                  {MOCK_POSTS.map((post) => (
                    <div key={post.id} className="aspect-square bg-gray-100" />
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="audio">
                <div className="space-y-4">
                  {/* 音声投稿一覧（後で実装） */}
                  <div className="h-24 bg-white rounded-lg flex items-center justify-center text-gray-400">
                    音声投稿（実装予定）
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="text">
                <div className="space-y-4">
                  {MOCK_POSTS.map((post) => (
                    <PostCard key={post.id} post={post} />
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="highlight">
                <div className="space-y-4">
                  {/* ハイライト一覧（後で実装） */}
                  <div className="h-24 bg-white rounded-lg flex items-center justify-center text-gray-400">
                    ハイライト（実装予定）
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="event">
                <div className="space-y-4">
                  {/* イベント一覧（後で実装） */}
                  <div className="h-24 bg-white rounded-lg flex items-center justify-center text-gray-400">
                    イベント（実装予定）
                  </div>
                </div>
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </div>
    </div>
  );
}    