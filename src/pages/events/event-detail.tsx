import { useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import { Button } from '@/components/ui/native/button';
import { Avatar } from '@/components/ui/native/avatar';
import { Calendar, MapPin, Users, Heart, MessageCircle } from 'lucide-react-native';
import { format } from 'date-fns';
import { ja } from 'date-fns/locale';
import PostCard from '@/components/post/post-card';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  imageContainer: {
    aspectRatio: 16 / 9,
    width: '100%',
    borderRadius: 8,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  content: {
    padding: 16,
    gap: 24,
  },
  section: {
    gap: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
  },
  organizer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  organizerName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
  details: {
    gap: 8,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  icon: {
    width: 20,
    height: 20,
  },
  detailText: {
    fontSize: 14,
    color: '#6b7280',
  },
  fullText: {
    color: '#ef4444',
  },
  dot: {
    marginHorizontal: 8,
    color: '#6b7280',
  },
  price: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
  },
  description: {
    fontSize: 14,
    color: '#6b7280',
  },
  actions: {
    gap: 16,
  },
  participateButton: {
    width: '100%',
  },
  subActions: {
    flexDirection: 'row',
    gap: 8,
  },
  subActionButton: {
    flex: 1,
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  buttonText: {
    fontSize: 14,
    color: '#6b7280',
  },
  interestedText: {
    color: '#ef4444',
  },
});

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
    <ScrollView style={styles.container}>
      {/* イベント画像 */}
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: event.image }}
          style={styles.image}
        />
      </View>

      {/* イベント情報 */}
      <View style={styles.content}>
        <View style={styles.section}>
          <Text style={styles.title}>{event.title}</Text>
          
          <View style={styles.organizer}>
            <Avatar
              source={{ uri: event.organizer.image }}
              fallback={event.organizer.name[0]}
            />
            <Text style={styles.organizerName}>主催: {event.organizer.name}</Text>
          </View>

          <View style={styles.details}>
            <View style={styles.detailRow}>
              <Calendar size={20} color="#6b7280" style={styles.icon} />
              <Text style={styles.detailText}>{formattedDate}</Text>
            </View>
            <View style={styles.detailRow}>
              <MapPin size={20} color="#6b7280" style={styles.icon} />
              <Text style={styles.detailText}>{event.location}</Text>
            </View>
            <View style={styles.detailRow}>
              <Users size={20} color="#6b7280" style={styles.icon} />
              {remainingSpots > 0 ? (
                <Text style={styles.detailText}>残り{remainingSpots}名</Text>
              ) : (
                <Text style={[styles.detailText, styles.fullText]}>満員</Text>
              )}
              <Text style={styles.dot}>•</Text>
              <Text style={styles.detailText}>{event.interestedCount}名が興味あり</Text>
            </View>
          </View>

          <Text style={styles.price}>
            {event.price === 0 ? '無料' : `¥${event.price.toLocaleString()}`}
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>イベント詳細</Text>
          <Text style={styles.description}>
            {event.description}
          </Text>
        </View>

        {/* アクションボタン */}
        <View style={styles.actions}>
          <Button
            style={styles.participateButton}
            onPress={handleParticipate}
            disabled={remainingSpots <= 0}
          >
            {remainingSpots > 0 ? '参加する' : '満員です'}
          </Button>
          
          <View style={styles.subActions}>
            <Button
              variant="outline"
              onPress={handleToggleInterest}
              style={styles.subActionButton}
            >
              <View style={styles.buttonContent}>
                <Heart size={16} color={isInterested ? '#ef4444' : '#6b7280'} />
                <Text style={[styles.buttonText, isInterested && styles.interestedText]}>
                  興味あり
                </Text>
              </View>
            </Button>
            
            <Button
              variant="outline"
              onPress={handleContact}
              style={styles.subActionButton}
            >
              <View style={styles.buttonContent}>
                <MessageCircle size={16} color="#6b7280" />
                <Text style={styles.buttonText}>質問する</Text>
              </View>
            </Button>
          </View>
        </View>

        {/* 関連投稿 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>関連投稿</Text>
          {MOCK_RELATED_POSTS.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </View>
      </View>
    </ScrollView>
  );
}    