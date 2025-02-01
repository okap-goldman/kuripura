import { useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { FooterNav } from "@/components/FooterNav";

type Message = {
  id: string;
  user: {
    name: string;
    age: number;
    location: string;
    avatarUrl?: string;
  };
  lastMessage: string;
  isAdvice?: boolean;
  unreadCount?: number;
  weeksAgo: number;
  isUndelivered?: boolean;
};

const mockMessages: Message[] = [
  {
    id: "1",
    user: {
      name: "田中",
      age: 25,
      location: "千葉",
      avatarUrl: "/avatars/user1.jpg",
    },
    lastMessage: "withからあなたへのアドバイスが届きました。",
    isAdvice: true,
    unreadCount: 1,
    weeksAgo: 34,
  },
  {
    id: "2",
    user: {
      name: "佐藤",
      age: 22,
      location: "千葉",
      avatarUrl: "/avatars/user2.jpg",
    },
    lastMessage: "メッセージを送信しました",
    weeksAgo: 43,
  },
  {
    id: "3",
    user: {
      name: "鈴木",
      age: 25,
      location: "埼玉",
      avatarUrl: "/avatars/user3.jpg",
    },
    lastMessage: "withからあなたへのアドバイスが届きました。",
    isAdvice: true,
    unreadCount: 3,
    weeksAgo: 57,
  },
  {
    id: "4",
    user: {
      name: "高橋",
      age: 23,
      location: "東京",
      avatarUrl: "/avatars/user4.jpg",
    },
    lastMessage: "メッセージを送信しました",
    weeksAgo: 58,
  },
  {
    id: "5",
    user: {
      name: "山田",
      age: 23,
      location: "神奈川",
      avatarUrl: "/avatars/user5.jpg",
    },
    lastMessage: "withからあなたへのアドバイスが届きました。",
    isAdvice: true,
    unreadCount: 2,
    weeksAgo: 58,
  },
  {
    id: "6",
    user: {
      name: "渡辺",
      age: 28,
      location: "千葉",
      avatarUrl: "/avatars/user6.jpg",
    },
    lastMessage: "withからあなたへのアドバイスが届きました。",
    isAdvice: true,
    unreadCount: 2,
    weeksAgo: 59,
  },
  {
    id: "7",
    user: {
      name: "伊藤",
      age: 21,
      location: "神奈川",
      avatarUrl: "/avatars/user7.jpg",
    },
    lastMessage: "メッセージを送信しました",
    isUndelivered: true,
    weeksAgo: 59,
  },
  {
    id: "8",
    user: {
      name: "中村",
      age: 24,
      location: "東京",
      avatarUrl: "/avatars/user8.jpg",
    },
    lastMessage: "メッセージを送信しました",
    weeksAgo: 59,
  },
  {
    id: "9",
    user: {
      name: "小林",
      age: 24,
      location: "東京",
      avatarUrl: "/avatars/user9.jpg",
    },
    lastMessage: "メッセージを送信しました",
    weeksAgo: 60,
  },
];

export const MessagesPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col h-screen bg-background">
      <div className="flex-1 overflow-y-auto">
        {mockMessages.map((message) => (
          <button
            key={message.id}
            onClick={() => navigate(`/chat/${message.id}`)}
            className="w-full p-4 flex items-center gap-3 hover:bg-muted/50 transition-colors border-b"
          >
            <Avatar className="w-12 h-12">
              <AvatarImage src={message.user.avatarUrl} />
              <AvatarFallback>{message.user.name[0]}</AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="font-medium text-sm text-rose-500">
                  {message.user.name}
                </span>
                <span className="text-sm text-rose-500">
                  {message.user.age}歳 {message.user.location}
                </span>
                {message.isUndelivered && (
                  <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded">
                    未返信
                  </span>
                )}
                <span className="text-sm text-muted-foreground ml-auto">
                  {message.weeksAgo}週間前
                </span>
              </div>
              <div className="flex items-center gap-2 mt-1">
                <p className="text-sm text-muted-foreground truncate">
                  {message.lastMessage}
                </p>
                {message.unreadCount && (
                  <Badge variant="destructive" className="h-5 w-5 rounded-full p-0 flex items-center justify-center">
                    {message.unreadCount}
                  </Badge>
                )}
              </div>
            </div>
          </button>
        ))}
      </div>
      <FooterNav />
    </div>
  );
}; 