import { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button } from '@/components/ui/native/button';
import EventCard from "./event-card"
import { EventFilter } from "@/components/events/EventFilter"
import { Plus } from "lucide-react-native"

interface Event {
  id: string
  title: string
  description: string
  date: string
  location: string
  price: number
  participants: number
  interested: number
  imageUrl?: string
}

interface EventFilters {
  keyword?: string;
  location?: string;
  minPrice?: number;
  maxPrice?: number;
  date?: Date;
}

// モックデータ
const mockEvents: Event[] = [
  {
    id: "1",
    title: "目醒めヨガワークショップ",
    description: "心と体を目醒めさせる特別なヨガセッション。初心者から上級者まで参加できます。",
    date: "2024年4月1日 10:00",
    location: "東京都渋谷区",
    price: 3000,
    participants: 15,
    interested: 45,
    imageUrl: "https://source.unsplash.com/random/800x600/?yoga"
  },
  {
    id: "2",
    title: "瞑想と音楽の夕べ",
    description: "ライブ演奏とともに行う瞑想セッション。心の深いところで目醒めを体験しましょう。",
    date: "2024年4月15日 19:00",
    location: "大阪市中央区",
    price: 5000,
    participants: 30,
    interested: 120,
    imageUrl: "https://source.unsplash.com/random/800x600/?meditation"
  },
  {
    id: "3",
    title: "オンライン目醒めトーク",
    description: "各分野の専門家が語る「目醒め」についてのオンラインセミナー。",
    date: "2024年4月30日 20:00",
    location: "オンライン",
    price: 0,
    participants: 100,
    interested: 250,
    imageUrl: "https://source.unsplash.com/random/800x600/?seminar"
  }
]

export default function EventsPage() {
  const [filteredEvents, setFilteredEvents] = useState<Event[]>(mockEvents)

  const handleFilterChange = (filters: EventFilters) => {
    // 実際のアプリケーションではAPIコールなどで検索を行う
    let filtered = mockEvents;

    if (filters.keyword && typeof filters.keyword === 'string') {
      const keyword = filters.keyword.toLowerCase();
      filtered = filtered.filter(
        event =>
          event.title.toLowerCase().includes(keyword) ||
          event.description.toLowerCase().includes(keyword)
      );
    }

    if (filters.location && filters.location !== "all") {
      const location = filters.location.toLowerCase();
      filtered = filtered.filter(event =>
        event.location.toLowerCase().includes(location)
      );
    }

    if (typeof filters.minPrice === 'number') {
      filtered = filtered.filter(event => event.price >= filters.minPrice!);
    }

    if (typeof filters.maxPrice === 'number') {
      filtered = filtered.filter(event => event.price <= filters.maxPrice!);
    }

    if (filters.date instanceof Date) {
      const year = filters.date.getFullYear().toString();
      filtered = filtered.filter(event =>
        event.date.includes(year)
      );
    }

    setFilteredEvents(filtered)
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}><Text>イベント</Text></Text>
        <Button onPress={() => {}}>
          <View style={styles.buttonContent}>
            <Plus size={16} color="#fff" />
            <Text style={styles.buttonText}><Text>イベントを作成</Text></Text>
          </View>
        </Button>
      </View>

      <View style={styles.filterContainer}>
        <EventFilter onFilterChange={handleFilterChange} />
      </View>

      <View style={styles.eventGrid}>
        {filteredEvents.map(event => (
          <EventCard
            key={event.id}
            event={{
              id: event.id,
              title: event.title,
              description: event.description,
              date: event.date,
              location: event.location,
              price: event.price,
              capacity: event.participants,
              currentParticipants: event.participants,
              interestedCount: event.interested,
              image: event.imageUrl || '',
              organizer: {
                name: '主催者',
                image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=1',
              },
            }}
            onClick={() => {}}
          />
        ))}
      </View>

      {filteredEvents.length === 0 && (
        <View style={styles.emptyState}>
          <Text style={styles.emptyText}><Text>該当するイベントが見つかりませんでした。</Text></Text>
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  buttonContent: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  buttonText: {
    color: '#fff',
    marginLeft: 8,
  },
  container: {
    backgroundColor: '#fff',
    flex: 1,
    padding: 16,
  },
  emptyState: {
    alignItems: 'center',
    padding: 48,
  },
  emptyText: {
    color: '#6b7280',
  },
  eventGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  filterContainer: {
    marginBottom: 24,
  },
  header: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});         