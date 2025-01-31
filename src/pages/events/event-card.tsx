import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Calendar, MapPin, Users } from 'lucide-react';
import { format } from 'date-fns';
import { ja } from 'date-fns/locale';

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
    <button
      onClick={onClick}
      className="block w-full bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
    >
      {/* イベント画像 */}
      <div className="aspect-video relative">
        <img
          src={event.image}
          alt={event.title}
          className="w-full h-full object-cover"
        />
        {/* 価格バッジ */}
        <div className="absolute top-2 right-2 bg-white/90 px-3 py-1 rounded-full">
          <span className="font-bold">
            {event.price === 0 ? '無料' : `¥${event.price.toLocaleString()}`}
          </span>
        </div>
      </div>

      {/* イベント情報 */}
      <div className="p-4 space-y-4">
        <div className="space-y-2">
          <h3 className="font-semibold text-left line-clamp-2">
            {event.title}
          </h3>
          <p className="text-sm text-gray-500 line-clamp-2">
            {event.description}
          </p>
        </div>

        <div className="space-y-2 text-sm">
          <div className="flex items-center text-gray-600">
            <Calendar className="h-4 w-4 mr-2" />
            {formattedDate}
          </div>
          <div className="flex items-center text-gray-600">
            <MapPin className="h-4 w-4 mr-2" />
            {event.location}
          </div>
          <div className="flex items-center text-gray-600">
            <Users className="h-4 w-4 mr-2" />
            {remainingSpots > 0 ? (
              <span>残り{remainingSpots}名</span>
            ) : (
              <span className="text-red-500">満員</span>
            )}
            <span className="mx-1">•</span>
            <span>{event.interestedCount}名が興味あり</span>
          </div>
        </div>

        <div className="flex items-center space-x-2 pt-2 border-t">
          <Avatar className="h-6 w-6">
            <AvatarImage src={event.organizer.image} />
            <AvatarFallback>{event.organizer.name[0]}</AvatarFallback>
          </Avatar>
          <span className="text-sm text-gray-500">
            主催: {event.organizer.name}
          </span>
        </div>
      </div>
    </button>
  );
} 