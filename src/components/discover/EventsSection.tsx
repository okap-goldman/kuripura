import { Calendar, Filter, Search, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";

export function EventsSection() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedEvent, setSelectedEvent] = useState<string | null>(null);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Calendar className="w-5 h-5" />
          <h2 className="text-lg font-semibold">イベント</h2>
        </div>
        
        <div className="flex gap-2">
          <div className="relative">
            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              className="pl-8"
              placeholder="イベントを検索"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button variant="outline" size="sm">
            <Filter className="w-4 h-4 mr-1" />
            フィルター
          </Button>
          
          <Dialog>
            <DialogTrigger asChild>
              <Button size="sm">
                <Plus className="w-4 h-4 mr-1" />
                イベントを企画
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>新しいイベントを企画</DialogTitle>
              </DialogHeader>
              <form className="space-y-4">
                <div>
                  <Label htmlFor="event-name">イベント名</Label>
                  <Input id="event-name" />
                </div>
                <div>
                  <Label htmlFor="event-content">コンテンツ</Label>
                  <Textarea id="event-content" />
                </div>
                <div>
                  <Label htmlFor="event-media">画像・動画</Label>
                  <Input id="event-media" type="file" accept="image/*,video/*" multiple />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="event-capacity">人数</Label>
                    <Input id="event-capacity" type="number" />
                  </div>
                  <div>
                    <Label htmlFor="event-price">金額</Label>
                    <Input id="event-price" type="number" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="event-start-date">募集開始日</Label>
                    <Input id="event-start-date" type="date" />
                  </div>
                  <div>
                    <Label htmlFor="event-end-date">募集終了日</Label>
                    <Input id="event-end-date" type="date" />
                  </div>
                </div>
                <div>
                  <Label htmlFor="event-location">開催場所</Label>
                  <Input id="event-location" />
                </div>
                <div>
                  <Label htmlFor="event-datetime">開催日時</Label>
                  <Input id="event-datetime" type="datetime-local" />
                </div>
                <Button type="submit" className="w-full">作成</Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Card className="p-4 space-y-4">
        <h3 className="font-medium">注目のイベント</h3>
        <div className="aspect-video w-full rounded-lg overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1527529482837-4698179dc6ce?w=800"
            alt="Featured event"
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <h4 className="font-medium">シアターワーク体験会</h4>
          <p className="text-sm text-muted-foreground mt-1">2024年4月20日 14:00-16:00</p>
          <p className="mt-2">青梅市文化会館</p>
          <div className="flex gap-2 mt-4">
            <Badge variant="secondary">参加費無料</Badge>
            <Badge variant="secondary">定員20名</Badge>
          </div>
        </div>
      </Card>

      <div className="grid gap-4 md:grid-cols-2">
        {[1, 2, 3, 4].map((i) => (
          <Card 
            key={i}
            className="overflow-hidden cursor-pointer hover:bg-muted/50 transition-colors"
            onClick={() => setSelectedEvent(`イベント${i}`)}
          >
            <div className="aspect-video">
              <img
                src={`https://images.unsplash.com/photo-${i + 1527529482837}-4698179dc6ce?w=400`}
                alt={`Event ${i}`}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-4">
              <h4 className="font-medium">瞑想ワークショップ {i}</h4>
              <p className="text-sm text-muted-foreground mt-1">2024年4月{i}日 14:00-16:00</p>
              <p className="mt-2">渋谷区文化センター</p>
              <div className="flex gap-2 mt-4">
                <Badge variant="secondary">¥3,000</Badge>
                <Badge variant="secondary">定員15名</Badge>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <Dialog open={!!selectedEvent} onOpenChange={() => setSelectedEvent(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{selectedEvent}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="aspect-video rounded-lg overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1527529482837-4698179dc6ce?w=800"
                alt={selectedEvent || ""}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium">イベント詳細</h4>
                <p className="text-sm text-muted-foreground mt-1">
                  瞑想を通じて、心の平安とマインドフルネスを体験するワークショップです。
                  初心者の方も安心してご参加いただけます。
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-medium">開催日時</h4>
                  <p className="text-sm text-muted-foreground">2024年4月20日 14:00-16:00</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium">場所</h4>
                  <p className="text-sm text-muted-foreground">渋谷区文化センター</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium">参加費</h4>
                  <p className="text-sm text-muted-foreground">¥3,000</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium">定員</h4>
                  <p className="text-sm text-muted-foreground">15名</p>
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline">詳細を見る</Button>
                <Button>参加する</Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}