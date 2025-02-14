import { Calendar, Filter, Search, Plus } from "lucide-react-native";
import { Button } from "@/components/ui/native/button";
import { Card } from "@/components/ui/native/card";
import { Dialog } from "@/components/ui/native/dialog";
import { Input } from "@/components/ui/native/input";
import { Label } from "@/components/ui/native/label";
import { Textarea } from "@/components/ui/native/textarea";
import { useState } from "react";
import { Badge } from "@/components/ui/native/badge";
import { View, Text, Image, ScrollView, StyleSheet, TouchableOpacity } from "react-native";

export function EventsSection() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedEvent, setSelectedEvent] = useState<string | null>(null);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Calendar className="w-5 h-5" />
          <h2 className="text-lg font-semibold"><Text>イベント</Text></h2>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-2">
          <div className="relative flex-1 sm:flex-none">
            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              className="pl-8"
              placeholder="イベントを検索"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button variant="outline" size="sm" className="sm:w-auto">
            <Filter className="w-4 h-4 mr-1" />
            フィルター
          </Button>
          
          <Dialog>
            <DialogTrigger asChild>
              <Button size="sm" className="sm:w-auto">
                <Plus className="w-4 h-4 mr-1" />
                イベントを企画
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle><Text>新しいイベントを企画</Text></DialogTitle>
              </DialogHeader>
              <form className="space-y-4">
                <div>
                  <Label htmlFor="event-name"><Text>イベント名</Text></Label>
                  <Input id="event-name" />
                </div>
                <div>
                  <Label htmlFor="event-content"><Text>コンテンツ</Text></Label>
                  <Textarea id="event-content" />
                </div>
                <div>
                  <Label htmlFor="event-media"><Text>画像・動画</Text></Label>
                  <Input id="event-media" type="file" accept="image/*,video/*" multiple />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="event-capacity"><Text>人数</Text></Label>
                    <Input id="event-capacity" type="number" />
                  </div>
                  <div>
                    <Label htmlFor="event-price"><Text>金額</Text></Label>
                    <Input id="event-price" type="number" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="event-start-date"><Text>募集開始日</Text></Label>
                    <Input id="event-start-date" type="date" />
                  </div>
                  <div>
                    <Label htmlFor="event-end-date"><Text>募集終了日</Text></Label>
                    <Input id="event-end-date" type="date" />
                  </div>
                </div>
                <div>
                  <Label htmlFor="event-location"><Text>開催場所</Text></Label>
                  <Input id="event-location" />
                </div>
                <div>
                  <Label htmlFor="event-datetime"><Text>開催日時</Text></Label>
                  <Input id="event-datetime" type="datetime-local" />
                </div>
                <Button type="submit" className="w-full"><Text>作成</Text></Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Card className="p-4 space-y-4">
        <h3 className="font-medium"><Text>注目のイベント</Text></h3>
        <div className="aspect-video w-full rounded-lg overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1527529482837-4698179dc6ce?w=800"
            alt="Featured event"
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <h4 className="font-medium"><Text>シアターワーク体験会</Text></h4>
          <p className="text-sm text-muted-foreground mt-1"><Text>2024年4月20日 14:00-16:00</Text></p>
          <p className="mt-2"><Text>青梅市文化会館</Text></p>
          <div className="flex gap-2 mt-4">
            <Badge variant="secondary"><Text>参加費無料</Text></Badge>
            <Badge variant="secondary"><Text>定員20名</Text></Badge>
          </div>
        </div>
      </Card>

      <div className="grid gap-4 sm:grid-cols-2">
        {[
          {
            title: "集団瞑想会",
            date: "2024年4月15日 10:00-12:00",
            location: "渋谷区瞑想センター",
            price: "¥2,000",
            capacity: "定員10名",
            image: "https://images.unsplash.com/photo-1528715471579-d1bcf0ba5e83"
          },
          {
            title: "チャクラ開放ワークショップ",
            date: "2024年4月16日 14:00-16:00",
            location: "新宿区ヨガスタジオ",
            price: "¥3,500",
            capacity: "定員15名",
            image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773"
          },
          {
            title: "目醒めシェアリングサークル",
            date: "2024年4月17日 19:00-21:00",
            location: "目黒区コミュニティセンター",
            price: "¥1,500",
            capacity: "定員12名",
            image: "https://images.unsplash.com/photo-1516062423079-7ca13cdc7f5a"
          },
          {
            title: "スピリチュアルヒーリング体験会",
            date: "2024年4月18日 13:00-15:00",
            location: "池袋区カルチャーセンター",
            price: "¥4,000",
            capacity: "定員8名",
            image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773"
          }
        ].map((event, i) => (
          <Card 
            key={i}
            className="overflow-hidden cursor-pointer hover:bg-muted/50 transition-colors"
            onClick={() => setSelectedEvent(event.title)}
          >
            <div className="aspect-video">
              <img
                src={event.image}
                alt={event.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-4">
              <h4 className="font-medium">{event.title}</h4>
              <p className="text-sm text-muted-foreground mt-1">{event.date}</p>
              <p className="mt-2">{event.location}</p>
              <div className="flex gap-2 mt-4">
                <Badge variant="secondary">{event.price}</Badge>
                <Badge variant="secondary">{event.capacity}</Badge>
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
                <h4 className="font-medium"><Text>イベント詳細</Text></h4>
                <p className="text-sm text-muted-foreground mt-1">
                  瞑想を通じて、心の平安とマインドフルネスを体験するワークショップです。
                  初心者の方も安心してご参加いただけます。
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-medium"><Text>開催日時</Text></h4>
                  <p className="text-sm text-muted-foreground"><Text>2024年4月20日 14:00-16:00</Text></p>
                </div>
                <div>
                  <h4 className="text-sm font-medium"><Text>場所</Text></h4>
                  <p className="text-sm text-muted-foreground"><Text>渋谷区瞑想センター</Text></p>
                </div>
                <div>
                  <h4 className="text-sm font-medium"><Text>参加費</Text></h4>
                  <p className="text-sm text-muted-foreground"><Text>¥3,000</Text></p>
                </div>
                <div>
                  <h4 className="text-sm font-medium"><Text>定員</Text></h4>
                  <p className="text-sm text-muted-foreground"><Text>15名</Text></p>
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline"><Text>詳細を見る</Text></Button>
                <Button><Text>参加する</Text></Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
