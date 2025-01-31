import { useState } from 'react';
import { Heart, MessageCircle, Flame } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';

interface PostCardProps {
  post: {
    id: string;
    author: {
      name: string;
      image: string;
    };
    content: {
      type: 'text' | 'image' | 'video' | 'audio';
      text?: string;
      mediaUrl?: string;
    };
    createdAt: string;
    likes: number;
    comments: number;
    highlights: number;
  };
}

export default function PostCard({ post }: PostCardProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [showHighlightDialog, setShowHighlightDialog] = useState(false);
  const [highlightReason, setHighlightReason] = useState('');

  const handleHighlight = () => {
    if (!highlightReason.trim()) {
      alert('心震えた理由を入力してください。');
      return;
    }
    // TODO: Implement highlight functionality
    setShowHighlightDialog(false);
  };

  const renderContent = () => {
    switch (post.content.type) {
      case 'text':
        return (
          <p className="text-gray-800 whitespace-pre-wrap">
            {post.content.text && post.content.text.length > 280
              ? `${post.content.text.slice(0, 280)}...`
              : post.content.text}
          </p>
        );
      case 'image':
        return (
          <img
            src={post.content.mediaUrl}
            alt="投稿画像"
            className="w-full rounded-lg object-cover"
          />
        );
      case 'video':
        return (
          <video
            src={post.content.mediaUrl}
            controls
            className="w-full rounded-lg"
          />
        );
      case 'audio':
        return (
          <audio
            src={post.content.mediaUrl}
            controls
            className="w-full"
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-4 space-y-4">
      <div className="flex items-center space-x-3">
        <Avatar>
          <AvatarImage src={post.author.image} />
          <AvatarFallback>{post.author.name[0]}</AvatarFallback>
        </Avatar>
        <div>
          <p className="font-semibold">{post.author.name}</p>
          <p className="text-sm text-gray-500">{post.createdAt}</p>
        </div>
      </div>

      <div>{renderContent()}</div>

      <div className="flex items-center justify-between pt-2">
        <Button
          variant="ghost"
          size="sm"
          className={`flex items-center space-x-1 ${isLiked ? 'text-red-500' : ''}`}
          onClick={() => setIsLiked(!isLiked)}
        >
          <Heart className="h-4 w-4" />
          <span>{post.likes}</span>
        </Button>

        <Button
          variant="ghost"
          size="sm"
          className="flex items-center space-x-1"
        >
          <MessageCircle className="h-4 w-4" />
          <span>{post.comments}</span>
        </Button>

        <Dialog open={showHighlightDialog} onOpenChange={setShowHighlightDialog}>
          <DialogTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="flex items-center space-x-1"
            >
              <Flame className="h-4 w-4" />
              <span>{post.highlights}</span>
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>心震えた理由を教えてください</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <Textarea
                value={highlightReason}
                onChange={(e) => setHighlightReason(e.target.value)}
                placeholder="この投稿のどこに心震えましたか？"
                className="min-h-[100px]"
              />
              <Button onClick={handleHighlight} className="w-full">
                ハイライトする
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
} 