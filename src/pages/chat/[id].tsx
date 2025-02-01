import { useParams, useNavigate } from "react-router-dom";
import { ChatHeader } from "@/components/chat/ChatHeader";
import { MessageList } from "@/components/chat/MessageList";
import { MessageInput } from "@/components/chat/MessageInput";

// モックデータ（実際の実装では適切なデータフェッチを行う）
const mockUser = {
  name: "田中さん",
  avatarUrl: "/avatars/user1.jpg",
};

const mockMessages = [
  {
    id: "1",
    content: "はじめまして！",
    sender: {
      id: "user1",
      name: "田中",
      avatarUrl: "/avatars/user1.jpg",
    },
    createdAt: new Date().toISOString(),
    isRead: true,
  },
  {
    id: "2",
    content: "こんにちは！よろしくお願いします！",
    sender: {
      id: "current",
      name: "鈴木",
      avatarUrl: "/avatars/current.jpg",
    },
    createdAt: new Date().toISOString(),
    isRead: true,
  },
];

export const ChatPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const handleBack = () => {
    navigate("/messages");
  };

  const handleSend = (message: string) => {
    console.log("Send message:", message);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] bg-background">
      <ChatHeader
        user={mockUser}
        onBack={handleBack}
      />
      <div className="flex-1 overflow-y-auto">
        <MessageList
          messages={mockMessages}
          currentUserId="current"
          onMessageSelect={() => {}}
        />
      </div>
      <div className="sticky bottom-16 border-t bg-background">
        <MessageInput onSend={handleSend} />
      </div>
    </div>
  );
}; 