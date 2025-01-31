import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Search, Filter, Plus } from 'lucide-react';
import EventCard from './event-card';
import EventDetail from './event-detail';
import EventForm from './event-form';

// モックデータ
const MOCK_EVENTS = [
  {
    id: '1',
    title: '目醒めのための瞑想会',
    description: '瞑想を通じて、より深い自己理解と気づきを得るためのワークショップです。初心者の方も大歓迎です。',
    date: '2024-02-15T14:00:00',
    location: '東京都渋谷区',
    price: 3000,
    capacity: 20,
    currentParticipants: 12,
    interestedCount: 35,
    image: 'https://source.unsplash.com/random/800x600?meditation',
    organizer: {
      name: '山田太郎',
      image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=1',
    },
  },
  {
    id: '2',
    title: 'マインドフルネス・ヨガ体験会',
    description: 'ヨガを通じて、心と体の繋がりを感じ、より深い気づきを得るためのセッションです。',
    date: '2024-02-20T10:00:00',
    location: '東京都新宿区',
    price: 2500,
    capacity: 15,
    currentParticipants: 8,
    interestedCount: 22,
    image: 'https://source.unsplash.com/random/800x600?yoga',
    organizer: {
      name: '佐藤花子',
      image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=2',
    },
  },
];

export default function EventsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedEvent, setSelectedEvent] = useState<typeof MOCK_EVENTS[0] | null>(null);
  const [showFilterDialog, setShowFilterDialog] = useState(false);
  const [showCreateDialog, setShowCreateDialog] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement search
    console.log({ searchQuery });
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-16 pb-16">
      <div className="container mx-auto px-4">
        {/* 検索・フィルターヘッダー */}
        <div className="sticky top-16 bg-gray-50 py-4 z-10 space-y-4">
          <form onSubmit={handleSearch} className="flex gap-2">
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="イベントを検索"
              className="flex-1"
            />
            <Button type="submit">
              <Search className="h-4 w-4" />
            </Button>
          </form>

          <div className="flex items-center justify-between">
            <Dialog open={showFilterDialog} onOpenChange={setShowFilterDialog}>
              <DialogTrigger asChild>
                <Button variant="outline">
                  <Filter className="h-4 w-4 mr-2" />
                  フィルター
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>フィルター</DialogTitle>
                </DialogHeader>
                {/* TODO: フィルターの実装 */}
                <div className="space-y-4">
                  <div className="h-24 flex items-center justify-center text-gray-400">
                    フィルター（実装予定）
                  </div>
                </div>
              </DialogContent>
            </Dialog>

            <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  イベントを作成
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>イベントを作成</DialogTitle>
                </DialogHeader>
                <EventForm onSubmit={() => setShowCreateDialog(false)} />
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* イベント一覧 */}
        <div className="py-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {MOCK_EVENTS.map((event) => (
              <EventCard
                key={event.id}
                event={event}
                onClick={() => setSelectedEvent(event)}
              />
            ))}
          </div>
        </div>

        {/* イベント詳細モーダル */}
        {selectedEvent && (
          <Dialog open={!!selectedEvent} onOpenChange={() => setSelectedEvent(null)}>
            <DialogContent className="max-w-2xl">
              <EventDetail
                event={selectedEvent}
                onClose={() => setSelectedEvent(null)}
              />
            </DialogContent>
          </Dialog>
        )}
      </div>
    </div>
  );
} 