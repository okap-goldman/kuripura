import { View, TouchableOpacity, Text, StyleSheet, Share } from 'react-native';
import { Heart, MessageCircle, Share2 } from 'lucide-react-native';
import { useState } from 'react';

interface PostActionsProps {
  likes: number;
  comments: number;
  onLike?: () => void;
  onComment?: () => void;
  shareUrl?: string;
}

export function PostActions({ likes, comments, onLike, onComment, shareUrl }: PostActionsProps) {
  const [isLiked, setIsLiked] = useState(false);

  const handleLike = () => {
    setIsLiked(!isLiked);
    onLike?.();
  };

  const handleShare = async () => {
    if (shareUrl) {
      try {
        await Share.share({
          message: shareUrl,
        });
      } catch (error) {
        console.error('Error sharing:', error);
      }
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.action} onPress={handleLike}>
        <Heart 
          size={20} 
          color={isLiked ? '#ef4444' : '#6b7280'} 
          fill={isLiked ? '#ef4444' : 'none'} 
        />
        <Text style={styles.count}>{likes}</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.action} onPress={onComment}>
        <MessageCircle size={20} color="#6b7280" />
        <Text style={styles.count}>{comments}</Text>
      </TouchableOpacity>

      {shareUrl && (
        <TouchableOpacity style={styles.action} onPress={handleShare}>
          <Share2 size={20} color="#6b7280" />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    paddingVertical: 8,
  },
  action: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  count: {
    fontSize: 14,
    color: '#6b7280',
  },
});
        variant="ghost"
        size="sm"
        className="flex items-center gap-2 group"
        onClick={() => setLiked(!liked)}
      >
        <Heart 
          className={cn(
            "h-5 w-5 transition-all duration-300 ease-in-out",
            liked && "fill-red-500 text-red-500 scale-125 animate-heartBeat"
          )} 
        />
      </Button>

      <Button
        variant="ghost"
        size="sm"
        className="flex items-center gap-2"
        onClick={onComment}
      >
        <MessageSquare className="h-5 w-5" />
      </Button>

      <Button
        variant="ghost"
        size="sm"
        className="flex items-center gap-2"
        onClick={() => !kuratta && setShowKurattaDialog(true)}
        disabled={kuratta}
      >
        <Flame className={`h-5 w-5 ${kuratta ? "fill-orange-500 text-orange-500" : ""}`} />
      </Button>

      <Dialog open={showKurattaDialog} onOpenChange={setShowKurattaDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>どんなことが魂に響きましたか？</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Button
              onClick={() => {
                setKuratta(true);
                setShowKurattaDialog(false);
              }}
              className="w-full"
            >
              心に響いた
            </Button>
            <Button
              onClick={() => {
                setKuratta(true);
                setShowKurattaDialog(false);
              }}
              className="w-full"
            >
              共感した
            </Button>
            <Button
              onClick={() => {
                setKuratta(true);
                setShowKurattaDialog(false);
              }}
              className="w-full"
            >
              感動した
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
