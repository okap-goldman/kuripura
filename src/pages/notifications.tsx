import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function NotificationsPage() {
  const navigate = useNavigate();

  // モックのお知らせデータ
  const notifications = [
    {
      id: "1",
      message: "あなたの投稿に新しいコメントが付きました。",
      isRead: false,
      createdAt: "2024-02-01T10:00:00",
    },
    {
      id: "2",
      message: "誰かがあなたをフォローしました。",
      isRead: true,
      createdAt: "2024-01-31T15:30:00",
    },
    {
      id: "3",
      message: "新しいイベントが作成されました。",
      isRead: false,
      createdAt: "2024-01-30T09:45:00",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="p-4 border-b flex items-center space-x-4">
        <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-lg font-semibold">お知らせ</h1>
      </div>
      <ScrollArea className="p-4">
        {notifications.map((notification) => (
          <Card key={notification.id} className="mb-4">
            <CardContent className="p-4">
              <p className="text-sm">{notification.message}</p>
              <p className="text-xs text-muted-foreground">
                {new Date(notification.createdAt).toLocaleString()}
              </p>
            </CardContent>
          </Card>
        ))}
      </ScrollArea>
    </div>
  );
}