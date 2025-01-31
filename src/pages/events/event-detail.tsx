import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Calendar, MapPin, Users, Heart, MessageCircle } from 'lucide-react';
import { format } from 'date-fns';
import { ja } from 'date-fns/locale';
import PostCard from '@/components/post/post-card';

interface EventDetailProps {
  event: {
    id: string;
    title: string;
    description: string;
    date: string;
    location: string;
    price: number;
    capacity: number;
    currentParticipants: number;
    interestedCount: number;
    image: string;
    organizer: {
      name: string;
      image: string;
    };
  };
  onClose: () => void;
}

// モックデータ
const MOCK_RELATED_POSTS = [
  {
    id: '1',
    author: {
      name: '山田太郎',
      image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=1',
    },
    content: {
      type: 'text' as const,
      text: '前回のイベントの様子です。皆さんの気づきや学びが深まる素晴らしい時間となりました。',
    },
    createdAt: '2024-01-31 12:00',
    likes: 15,
    comments: 3,
    highlights: 2,
  },
];

export default function EventDetail({ event, onClose }: EventDetailProps) {
  const [isInterested, setIsInterested] = useState(false);
  const formattedDate = format(new Date(event.date), 'M月d日(E) HH:mm', { locale: ja });
  const remainingSpots = event.capacity - event.currentParticipants;

  const handleParticipate = () => {
    // TODO: Implement Stripe Checkout
    console.log('参加申し込み処理を実装予定');
  };

  const handleContact = () => {
    // TODO: Implement messaging
    console.log('メッセージ機能を実装予定');
  };

  const handleToggleInterest = () => {
    setIsInterested(!isInterested);
    // TODO: Implement interest toggle
    console.log('興味あり機能を実装予定');
  };

  return (
    <div className="space-y-6">
      {/* イベント画像 */}
      <div className="aspect-video relative rounded-lg overflow-hidden">
        <img
          src={event.image}
          alt={event.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* イベント情報 */}
      <div className="space-y-6">
        <div className="space-y-4">
          <h2 className="text-2xl font-bold">{event.title}</h2>
          
          <div className="flex items-center space-x-2">
            <Avatar>
              <AvatarImage src={event.organizer.image} />
              <AvatarFallback>{event.organizer.name[0]}</AvatarFallback>
            </Avatar>
            <span className="font-semibold">主催: {event.organizer.name}</span>
          </div>

          <div className="space-y-2 text-gray-600">
            <div className="flex items-center">
              <Calendar className="h-5 w-5 mr-2" />
              {formattedDate}
            </div>
            <div className="flex items-center">
              <MapPin className="h-5 w-5 mr-2" />
              {event.location}
            </div>
            <div className="flex items-center">
              <Users className="h-5 w-5 mr-2" />
              {remainingSpots > 0 ? (
                <span>残り{remainingSpots}名</span>
              ) : (
                <span className="text-red-500">満員</span>
              )}
              <span className="mx-2">•</span>
              <span>{event.interestedCount}名が興味あり</span>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <p className="text-2xl font-bold">
              {event.price === 0 ? '無料' : `¥${event.price.toLocaleString()}`}
            </p>
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="font-semibold">イベント詳細</h3>
          <p className="text-gray-600 whitespace-pre-wrap">
            {event.description}
          </p>
        </div>

        {/* アクションボタン */}
        <div className="flex space-x-4">
          <Button
            className="flex-1"
            onClick={handleParticipate}
            disabled={remainingSpots <= 0}
          >
            {remainingSpots > 0 ? '参加する' : '満員です'}
          </Button>
          
          <Button
            variant="outline"
            onClick={handleToggleInterest}
            className={isInterested ? 'text-red-500' : ''}
          >
            <Heart className="h-4 w-4 mr-2" fill={isInterested ? 'currentColor' : 'none'} />
            興味あり
          </Button>
          
          <Button
            variant="outline"
            onClick={handleContact}
          >
            <MessageCircle className="h-4 w-4 mr-2" />
            質問する
          </Button>
        </div>

        {/* 関連投稿 */}
        <div className="space-y-4">
          <h3 className="font-semibold">関連投稿</h3>
          {MOCK_RELATED_POSTS.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </div>
  );
} 