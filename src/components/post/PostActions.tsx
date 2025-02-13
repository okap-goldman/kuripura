import { View, TouchableOpacity, Text, StyleSheet, Share } from 'react-native';
import { Heart, MessageCircle, Share2 } from 'lucide-react-native';
import { useState } from 'react';
import { LucideProps } from 'lucide-react-native';

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
      <TouchableOpacity 
        style={styles.action} 
        onPress={handleLike}
        testID="like-button"
      >
        <Heart 
          {...({
            size: 20,
            strokeWidth: 2,
            color: isLiked ? '#ef4444' : '#6b7280'
          } as LucideProps)}
        />
        <Text style={styles.count}>{likes}</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.action} 
        onPress={onComment}
        testID="comment-button"
      >
        <MessageCircle {...({ size: 20, strokeWidth: 2, color: '#6b7280' } as LucideProps)} />
        <Text style={styles.count}>{comments}</Text>
      </TouchableOpacity>

      {shareUrl && (
        <TouchableOpacity 
          style={styles.action} 
          onPress={handleShare}
          testID="share-button"
        >
          <Share2 {...({ size: 20, strokeWidth: 2, color: '#6b7280' } as LucideProps)} />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  action: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 4,
  },
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 16,
    paddingVertical: 8,
  },
  count: {
    color: '#6b7280',
    fontSize: 14,
  },
});
