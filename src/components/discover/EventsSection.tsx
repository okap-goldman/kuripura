import { Calendar, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export function EventsSection() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Calendar className="w-5 h-5" />
          <h2 className="text-lg font-semibold">イベント</h2>
        </div>
        
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Filter className="w-4 h-4 mr-1" />
            フィルター
          </Button>
          
          <Dialog>
            <DialogTrigger asChild>
              <Button size="sm">イベントを企画</Button>
            </DialogTrigger>
            <DialogContent>
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
                <Button type="submit" className="w-full">作成</Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="space-y-4">
        <Card className="p-4">
          <h3 className="font-medium">シアターワーク体験会</h3>
          <p className="text-sm text-muted-foreground mt-1">2024年4月20日 14:00-16:00</p>
          <p className="text-sm mt-2">青梅市文化会館</p>
          <div className="flex gap-2 mt-4">
            <Button variant="outline" size="sm">詳細を見る</Button>
            <Button size="sm">参加する</Button>
          </div>
        </Card>
      </div>
    </div>
  );
}