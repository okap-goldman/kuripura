import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type Message = {
  id: string;
  content: string;
  sender: {
    id: string;
    name: string;
    avatarUrl?: string;
  };
  createdAt: string;
  isRead: boolean;
};

type MessageListProps = {
  messages: Message[];
  currentUserId: string;
  onMessageSelect: (messageId: string) => void;
};

export const MessageList = ({ messages, currentUserId, onMessageSelect }: MessageListProps) => {
  const getTimeAgo = (date: string) => {
    const minutes = Math.floor((new Date().getTime() - new Date(date).getTime()) / (1000 * 60));
    if (minutes < 1) return "たった今";
    if (minutes < 60) return `${minutes}分前`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}時間前`;
    const days = Math.floor(hours / 24);
    if (days < 7) return `${days}日前`;
    const weeks = Math.floor(days / 7);
    return `${weeks}週間前`;
  };

  return (
    <div className="flex flex-col space-y-4 p-4 overflow-y-auto">
      {messages.map((message) => {
        const isCurrentUser = message.sender.id === currentUserId;
        return (
          <div
            key={message.id}
            className={cn("flex items-end gap-2", isCurrentUser ? "flex-row-reverse" : "flex-row")}
          >
            {!isCurrentUser && (
              <Avatar className="w-8 h-8">
                <AvatarImage src={message.sender.avatarUrl} />
                <AvatarFallback>{message.sender.name[0]}</AvatarFallback>
              </Avatar>
            )}
            <div
              className={cn(
                "max-w-[70%] rounded-2xl px-4 py-2",
                isCurrentUser ? "bg-primary text-primary-foreground" : "bg-muted"
              )}
            >
              <p className="text-sm break-words">{message.content}</p>
            </div>
            <span className="text-xs text-muted-foreground">
              {getTimeAgo(message.createdAt)}
            </span>
          </div>
        );
      })}
    </div>
  );
}; 