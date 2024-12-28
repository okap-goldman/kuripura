import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface ChatMessageProps {
  isAi?: boolean;
  message: string;
}

export function ChatMessage({ isAi = false, message }: ChatMessageProps) {
  return (
    <div className={`flex gap-4 ${isAi ? "bg-muted/50" : "bg-background"} p-6`}>
      <Avatar className="h-8 w-8">
        <AvatarImage src={isAi ? "/ai-avatar.png" : "/user-avatar.png"} />
        <AvatarFallback>{isAi ? "AI" : "Me"}</AvatarFallback>
      </Avatar>
      <div className="flex-1 space-y-2">
        <p className="text-sm font-medium">{isAi ? "アシスタント" : "あなた"}</p>
        <div className="text-sm text-muted-foreground">
          {message}
        </div>
      </div>
    </div>
  );
}