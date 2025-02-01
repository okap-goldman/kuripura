import { Camera, Send, Smile } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type MessageInputProps = {
  onSend: (message: string) => void;
};

export const MessageInput = ({ onSend }: MessageInputProps) => {
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    onSend(message);
    setMessage("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2 p-4 border-t bg-background">
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className="shrink-0 text-muted-foreground hover:text-foreground"
      >
        <Camera className="w-5 h-5" />
      </Button>
      <div className="flex-1 relative">
        <Input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="メッセージを入力"
          className="pr-10 rounded-full bg-muted border-none"
        />
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="absolute right-1 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
        >
          <Smile className="w-5 h-5" />
        </Button>
      </div>
      <Button
        type="submit"
        variant="ghost"
        size="icon"
        className="shrink-0 text-primary hover:text-primary/90"
        disabled={!message.trim()}
      >
        <Send className="w-5 h-5" />
      </Button>
    </form>
  );
}; 