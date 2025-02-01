import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CalendarIcon, MapPinIcon, YenIcon } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface EventCardProps {
  title: string
  description: string
  date: string
  location: string
  price: number
  participants: number
  interested: number
  imageUrl?: string
}

export function EventCard({
  title,
  description,
  date,
  location,
  price,
  participants,
  interested,
  imageUrl
}: EventCardProps) {
  return (
    <Card className="w-full max-w-sm hover:shadow-lg transition-shadow">
      {imageUrl && (
        <div className="w-full h-48 relative">
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover rounded-t-lg"
          />
        </div>
      )}
      <CardHeader>
        <CardTitle className="text-xl">{title}</CardTitle>
        <CardDescription className="line-clamp-2">{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <CalendarIcon className="w-4 h-4" />
            <span className="text-sm">{date}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPinIcon className="w-4 h-4" />
            <span className="text-sm">{location}</span>
          </div>
          <div className="flex items-center gap-2">
            <YenIcon className="w-4 h-4" />
            <span className="text-sm">{price === 0 ? '無料' : `¥${price.toLocaleString()}`}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between items-center">
        <div className="flex gap-2">
          <Badge variant="secondary">{participants}人参加</Badge>
          <Badge variant="outline">{interested}人興味あり</Badge>
        </div>
        <Button variant="default">詳細を見る</Button>
      </CardFooter>
    </Card>
  )
} 