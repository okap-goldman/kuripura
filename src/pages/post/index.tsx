import { Link } from 'react-router-dom';
import { Video, Image, Mic, Type } from 'lucide-react';
import { Button } from '@/components/ui/button';

const POST_TYPES = [
  {
    id: 'video',
    label: '動画投稿',
    icon: Video,
    description: '動画を撮影または選択して投稿',
    path: '/post/video',
  },
  {
    id: 'image',
    label: '画像投稿',
    icon: Image,
    description: '画像を選択して投稿',
    path: '/post/image',
  },
  {
    id: 'audio',
    label: '音声投稿',
    icon: Mic,
    description: '音声を録音または選択して投稿',
    path: '/post/audio',
  },
  {
    id: 'text',
    label: 'テキスト投稿',
    icon: Type,
    description: 'テキストを入力して投稿',
    path: '/post/text',
  },
];

export default function PostTypePage() {
  return (
    <div className="min-h-screen bg-gray-50 pt-16 pb-16">
      <div className="container mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold mb-6">新規投稿</h1>
        
        <div className="grid grid-cols-1 gap-4">
          {POST_TYPES.map((type) => (
            <Link key={type.id} to={type.path} className="block">
              <Button
                variant="outline"
                className="w-full h-auto p-4 flex items-center space-x-4"
              >
                <div className="bg-primary/10 p-3 rounded-full">
                  <type.icon className="h-6 w-6 text-primary" />
                </div>
                <div className="flex-1 text-left">
                  <h2 className="font-semibold">{type.label}</h2>
                  <p className="text-sm text-gray-500">{type.description}</p>
                </div>
              </Button>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
} 