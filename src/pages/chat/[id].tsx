import { MessageInput } from "@/components/chat/MessageInput";
import { MessageList } from "@/components/chat/MessageList";
import { useParams } from "react-router-dom";

const mockMessages = [
  {
    id: "1",
    content: "こんにちは",
    sender: {
      id: "user1",
      name: "田中",
      age: 24,
      location: "東京",
    },
    createdAt: new Date().toISOString(),
    isRead: true,
  },
  {
    id: "2",
    content: "はじめまして！",
    sender: {
      id: "user2",
      name: "佐藤",
      age: 25,
      location: "千葉",
    },
    createdAt: new Date().toISOString(),
    isRead: false,
  },
];

export const ChatPage = () => {
  const { id } = useParams();
  const currentUserId = "user1"; // TODO: 認証情報から取得

  return (
    <div className="flex flex-col h-screen bg-background">
      <header className="p-4 border-b">
        <h1 className="text-lg font-semibold">トーク</h1>
      </header>
      <MessageList messages={mockMessages} currentUserId={currentUserId} />
      <MessageInput />
    </div>
  );
}; 