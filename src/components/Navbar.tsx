import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Bell, MessageCircle, User } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function Navbar() {
  const { toast } = useToast();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showMessages, setShowMessages] = useState(false);

  const handleLogin = () => {
    toast({
      title: "お知らせ",
      description: "次回のアップデートでGoogleログインを実装予定です。",
    });
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <span className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          Kuripura
        </span>
        
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setShowNotifications(true)}
          >
            <Bell className="h-5 w-5" />
          </Button>
          
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setShowMessages(true)}
          >
            <MessageCircle className="h-5 w-5" />
          </Button>
          
          <Button onClick={handleLogin} className="gap-2">
            <User className="h-4 w-4" />
            ログイン
          </Button>
        </div>
      </div>

      <Dialog open={showNotifications} onOpenChange={setShowNotifications}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>通知</DialogTitle>
          </DialogHeader>
          <ScrollArea className="h-[400px]">
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center gap-3 p-2 hover:bg-accent rounded-lg">
                  <Avatar>
                    <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i}`} />
                    <AvatarFallback>UN</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm">ユーザー{i}があなたの投稿にいいねしました</p>
                    <p className="text-xs text-muted-foreground">1時間前</p>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>

      <Dialog open={showMessages} onOpenChange={setShowMessages}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>メッセージ</DialogTitle>
          </DialogHeader>
          <ScrollArea className="h-[400px]">
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center gap-3 p-2 hover:bg-accent rounded-lg cursor-pointer">
                  <Avatar>
                    <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i}`} />
                    <AvatarFallback>UN</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">ユーザー{i}</p>
                    <p className="text-sm text-muted-foreground">最新のメッセージ...</p>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </nav>
  );
}