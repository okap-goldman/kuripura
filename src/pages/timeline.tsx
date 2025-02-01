import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import PostCard from '@/components/post/post-card';

// モックデータ（後でAPIから取得するように変更）
const MOCK_POSTS = [
  {
    id: '1',
    author: {
      name: '山田太郎',
      image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=1',
    },
    content: {
      type: 'text' as const,
      text: '今日は「目醒め」について深く考えさせられる一日でした。私たちは日々、様々な気づきや発見を通じて少しずつ目醒めていくのかもしれません。',
    },
    createdAt: '2024-01-31 12:00',
    likes: 15,
    comments: 3,
    highlights: 2,
  },
  {
    id: '2',
    author: {
      name: '佐藤花子',
      image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=2',
    },
    content: {
      type: 'image' as const,
      text: '自然の中で見つけた小さな気づき',
      mediaUrl: 'https://source.unsplash.com/random/800x600?nature',
    },
    createdAt: '2024-01-31 11:30',
    likes: 24,
    comments: 5,
    highlights: 4,
  },
];

export default function TimelinePage() {
  const [timelineType, setTimelineType] = useState('family');

  return (
    <div className="min-h-screen bg-gray-50 pt-16 pb-16">
      <div className="container mx-auto px-4">
        <div className="sticky top-16 bg-gray-50 pt-4 pb-2 z-10">
          <Tabs value={timelineType} onValueChange={setTimelineType}>
            <TabsList className="w-full">
              <TabsTrigger value="family" className="flex-1">
                ファミリー
              </TabsTrigger>
              <TabsTrigger value="watch" className="flex-1">
                ウォッチ
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <div className="py-4">
          {/* ストーリーズ（後で実装） */}
          <div className="h-24 bg-white rounded-xl mb-4 flex items-center justify-center text-gray-400">
            ストーリーズ（実装予定）
          </div>

          {/* 投稿一覧 */}
          <div className="space-y-4">
            {MOCK_POSTS.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 