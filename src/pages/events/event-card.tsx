import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Avatar } from '@/components/ui/native/avatar';
import { Calendar, MapPin, Users } from 'lucide-react-native';
import { format } from 'date-fns';
import { ja } from 'date-fns/locale';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 8,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  imageContainer: {
    aspectRatio: 16 / 9,
    width: '100%',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  priceBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 16,
  },
  priceText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000',
  },
  content: {
    padding: 16,
    gap: 16,
  },
  section: {
    gap: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
  description: {
    fontSize: 14,
    color: '#6b7280',
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
    width: 16,
    height: 16,
  },
  detailText: {
    fontSize: 14,
    color: '#6b7280',
  },
  fullText: {
    color: '#ef4444',
  },
  dot: {
    marginHorizontal: 4,
    color: '#6b7280',
  },
  organizer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
  },
  organizerAvatar: {
    width: 24,
    height: 24,
  },
  organizerName: {
    fontSize: 14,
    color: '#6b7280',
  },
});

interface EventCardProps {
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
  onClick: () => void;
}

export default function EventCard({ event, onClick }: EventCardProps) {
  const formattedDate = format(new Date(event.date), 'M月d日(E) HH:mm', { locale: ja });
  const remainingSpots = event.capacity - event.currentParticipants;

  return (
    <TouchableOpacity
      onPress={onClick}
      style={styles.container}
    >
      {/* イベント画像 */}
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: event.image }}
          style={styles.image}
        />
        {/* 価格バッジ */}
        <View style={styles.priceBadge}>
          <Text style={styles.priceText}>
            {event.price === 0 ? '無料' : `¥${event.price.toLocaleString()}`}
          </Text>
        </View>
      </View>

      {/* イベント情報 */}
      <View style={styles.content}>
        <View style={styles.section}>
          <Text style={styles.title} numberOfLines={2}>
            {event.title}
          </Text>
          <Text style={styles.description} numberOfLines={2}>
            {event.description}
          </Text>
        </View>

        <View style={styles.details}>
          <View style={styles.detailRow}>
            <Calendar size={16} color="#6b7280" style={styles.icon} />
            <Text style={styles.detailText}>{formattedDate}</Text>
          </View>
          <View style={styles.detailRow}>
            <MapPin size={16} color="#6b7280" style={styles.icon} />
            <Text style={styles.detailText}>{event.location}</Text>
          </View>
          <View style={styles.detailRow}>
            <Users size={16} color="#6b7280" style={styles.icon} />
            {remainingSpots > 0 ? (
              <Text style={styles.detailText}>残り{remainingSpots}名</Text>
            ) : (
              <Text style={[styles.detailText, styles.fullText]}>満員</Text>
            )}
            <Text style={styles.dot}>•</Text>
            <Text style={styles.detailText}>{event.interestedCount}名が興味あり</Text>
          </View>
        </View>

        <View style={styles.organizer}>
          <Avatar
            source={{ uri: event.organizer.image }}
            fallback={event.organizer.name[0]}
            style={styles.organizerAvatar}
          />
          <Text style={styles.organizerName}>
            主催: {event.organizer.name}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}    