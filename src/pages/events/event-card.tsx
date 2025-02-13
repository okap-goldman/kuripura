import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Avatar } from '@/components/ui/native/avatar';
import { Calendar, MapPin, Users } from 'lucide-react-native';
import { format } from 'date-fns';
import { ja } from 'date-fns/locale';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 8,
    elevation: 2,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  content: {
    gap: 16,
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
    marginHorizontal: 4,
  },
  fullText: {
    color: '#ef4444',
  },
  icon: {
    height: 16,
    width: 16,
  },
  image: {
    height: '100%',
    resizeMode: 'cover',
    width: '100%',
  },
  imageContainer: {
    aspectRatio: 16 / 9,
    width: '100%',
  },
  organizer: {
    alignItems: 'center',
    borderTopColor: '#e5e7eb',
    borderTopWidth: 1,
    flexDirection: 'row',
    gap: 8,
    paddingTop: 8,
  },
  organizerAvatar: {
    height: 24,
    width: 24,
  },
  organizerName: {
    color: '#6b7280',
    fontSize: 14,
  },
  priceBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 4,
    position: 'absolute',
    right: 8,
    top: 8,
  },
  priceText: {
    color: '#000',
    fontSize: 14,
    fontWeight: 'bold',
  },
  section: {
    gap: 8,
  },
  title: {
    color: '#000',
    fontSize: 16,
    fontWeight: '600',
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
              <Text style={styles.detailText}><Text>残り{remainingSpots}名</Text></Text>
            ) : (
              <Text style={[styles.detailText, styles.fullText]}><Text>満員</Text></Text>
            )}
            <Text style={styles.dot}><Text>•</Text></Text>
            <Text style={styles.detailText}><Text>{event.interestedCount}名が興味あり</Text></Text>
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