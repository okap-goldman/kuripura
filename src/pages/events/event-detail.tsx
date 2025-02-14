import { useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import { Button } from '@/components/ui/native/button';
import { Avatar } from '@/components/ui/native/avatar';
import { Calendar, MapPin, Users, Heart, MessageCircle } from 'lucide-react-native';
import { format } from 'date-fns';
import { ja } from 'date-fns/locale';
import PostCard from '@/components/post/post-card';

const styles = StyleSheet.create({
  actions: {
    gap: 16,
  },
  buttonContent: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 8,
  },
  buttonText: {
    color: '#6b7280',
    fontSize: 14,
  },
  container: {
    backgroundColor: '#fff',
    flex: 1,
  },
  content: {
    gap: 24,
    padding: 16,
  },
  description: {
    color: '#6b7280',
    fontSize: 14,
  },
  detailRow: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 8,
  },
  detailText: {
    color: '#6b7280',
    fontSize: 14,
  },
  details: {
    gap: 8,
  },
  dot: {
    color: '#6b7280',
    marginHorizontal: 8,
  },
  fullText: {
    color: '#ef4444',
  },
  icon: {
    height: 20,
    width: 20,
  },
  image: {
    height: '100%',
    resizeMode: 'cover',
    width: '100%',
  },
  imageContainer: {
    aspectRatio: 16 / 9,
    borderRadius: 8,
    overflow: 'hidden',
    width: '100%',
  },
  interestedText: {
    color: '#ef4444',
  },
  organizer: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 8,
  },
  organizerName: {
    color: '#000',
    fontSize: 16,
    fontWeight: '600',
  },
  participateButton: {
    width: '100%',
  },
  price: {
    color: '#000',
    fontSize: 24,
    fontWeight: 'bold',
  },
  section: {
    gap: 16,
  },
  sectionTitle: {
    color: '#000',
    fontSize: 18,
    fontWeight: '600',
  },
  subActionButton: {
    flex: 1,
  },
  subActions: {
    flexDirection: 'row',
    gap: 8,
  },
  title: {
    color: '#000',
    fontSize: 24,
    fontWeight: 'bold',
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
            <Text style={styles.organizerName}><Text>主催: {event.organizer.name}</Text></Text>
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
                <Text style={styles.detailText}><Text>残り{remainingSpots}名</Text></Text>
              ) : (
                <Text style={[styles.detailText, styles.fullText]}><Text>満員</Text></Text>
              )}
              <Text style={styles.dot}><Text>•</Text></Text>
              <Text style={styles.detailText}><Text>{event.interestedCount}名が興味あり</Text></Text>
            </View>
          </View>

          <Text style={styles.price}>
            {event.price === 0 ? '無料' : `¥${event.price.toLocaleString()}`}
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}><Text>イベント詳細</Text></Text>
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
                <Text style={styles.buttonText}><Text>質問する</Text></Text>
              </View>
            </Button>
          </View>
        </View>

        {/* 関連投稿 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}><Text>関連投稿</Text></Text>
          {MOCK_RELATED_POSTS.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </View>
      </View>
    </ScrollView>
  );
}    