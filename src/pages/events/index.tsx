import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { EventCard } from "@/components/events/EventCard"
import { EventFilter } from "@/components/events/EventFilter"
import { PlusIcon } from "lucide-react"

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

  const handleFilterChange = (filters: any) => {
    // 実際のアプリケーションではAPIコールなどで検索を行う
    let filtered = mockEvents

    if (filters.keyword) {
      filtered = filtered.filter(
        event =>
          event.title.toLowerCase().includes(filters.keyword.toLowerCase()) ||
          event.description.toLowerCase().includes(filters.keyword.toLowerCase())
      )
    }

    if (filters.location && filters.location !== "all") {
      filtered = filtered.filter(event =>
        event.location.toLowerCase().includes(filters.location.toLowerCase())
      )
    }

    if (filters.minPrice !== undefined) {
      filtered = filtered.filter(event => event.price >= filters.minPrice)
    }

    if (filters.maxPrice !== undefined) {
      filtered = filtered.filter(event => event.price <= filters.maxPrice)
    }

    if (filters.date) {
      filtered = filtered.filter(event =>
        event.date.includes(filters.date.getFullYear().toString())
      )
    }

    setFilteredEvents(filtered)
  }

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">イベント</h1>
        <Button>
          <PlusIcon className="mr-2 h-4 w-4" />
          イベントを作成
        </Button>
      </div>

      <div className="mb-8">
        <EventFilter onFilterChange={handleFilterChange} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEvents.map(event => (
          <EventCard key={event.id} {...event} />
        ))}
      </div>

      {filteredEvents.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">該当するイベントが見つかりませんでした。</p>
        </div>
      )}
    </div>
  )
} 