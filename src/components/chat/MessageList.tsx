import { cn } from "@/lib/utils";

type Message = {
  id: string;
  content: string;
  sender: {
    id: string;
    name: string;
    age: number;
    location: string;
  };
  createdAt: string;
  isRead: boolean;
};

type MessageListProps = {
  messages: Message[];
  currentUserId: string;
};

export const MessageList = ({ messages, currentUserId }: MessageListProps) => {
  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {messages.map((message) => {
        const isSender = message.sender.id === currentUserId;
        return (
          <div
            key={message.id}
            className={cn("flex", isSender ? "justify-end" : "justify-start")}
          >
            <div
              className={cn(
                "max-w-[70%] rounded-lg p-3",
                isSender
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground"
              )}
            >
              <div className="flex items-center gap-2 mb-1">
                <span className="text-sm">
                  {message.sender.name} {message.sender.age}歳 {message.sender.location}
                </span>
                <span className="text-xs opacity-70">
                  {new Date(message.createdAt).toLocaleTimeString()}
                </span>
              </div>
              <p className="break-words">{message.content}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}; 