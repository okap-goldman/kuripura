import { useParams, useNavigate } from "react-router-dom";
import { ChatHeader } from "@/components/chat/ChatHeader";
import { MessageList } from "@/components/chat/MessageList";
import { MessageInput } from "@/components/chat/MessageInput";

// モックデータ（実際の実装では適切なデータフェッチを行う）
const mockUser = {
  name: "田中さん",
  avatarUrl: "/avatars/user1.jpg",
};

const mockCommonPoints = [
  { text: "スイーツ大好き", type: "hobby" },
  { text: "コミュ力診断で相性◎", type: "personality" },
  { text: "恋愛スタイル診断で相性◎", type: "personality" },
  { text: "タバコ吸わない", type: "lifestyle" },
  { text: "東京出身", type: "location" },
  { text: "東京勤務", type: "lifestyle" },
  { text: "お酒飲まない", type: "lifestyle" },
  { text: "一人暮らし同士", type: "lifestyle" },
];

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
    <div className="flex flex-col h-screen bg-background">
      <ChatHeader
        user={mockUser}
        commonPoints={mockCommonPoints}
        onBack={handleBack}
      />
      <div className="flex-1 overflow-hidden">
        <MessageList
          messages={mockMessages}
          currentUserId="current"
          onMessageSelect={() => {}}
        />
      </div>
      <MessageInput onSend={handleSend} />
    </div>
  );
}; 