import { MessageList } from "@/components/chat/MessageList";
import { useNavigate } from "react-router-dom";

// モックデータ（実際の実装では適切なデータフェッチを行う）
const mockMessages = [
  {
    id: "1",
    content: "",
    sender: {
      id: "user1",
      name: "田中",
      age: 25,
      location: "千葉",
      avatarUrl: "/avatars/user1.jpg",
    },
    createdAt: new Date(Date.now() - 34 * 7 * 24 * 60 * 60 * 1000).toISOString(),
    isRead: false,
    withAdvice: true,
  },
  {
    id: "2",
    content: "メッセージを送信しました",
    sender: {
      id: "user2",
      name: "佐藤",
      age: 22,
      location: "千葉",
      avatarUrl: "/avatars/user2.jpg",
    },
    createdAt: new Date(Date.now() - 43 * 7 * 24 * 60 * 60 * 1000).toISOString(),
    isRead: true,
  },
  {
    id: "3",
    content: "",
    sender: {
      id: "user3",
      name: "山田",
      age: 25,
      location: "埼玉",
      avatarUrl: "/avatars/user3.jpg",
    },
    createdAt: new Date(Date.now() - 57 * 7 * 24 * 60 * 60 * 1000).toISOString(),
    isRead: false,
    withAdvice: true,
  },
];

export const MessagesPage = () => {
  const navigate = useNavigate();

  const handleMessageSelect = (messageId: string) => {
    navigate(`/chat/${messageId}`);
  };

  return (
    <div className="flex flex-col h-full bg-background">
      <div className="border-b p-4">
        <h1 className="text-lg font-semibold">メッセージ</h1>
      </div>
      <MessageList
        messages={mockMessages}
        currentUserId="current"
        onMessageSelect={handleMessageSelect}
      />
    </div>
  );
}; 