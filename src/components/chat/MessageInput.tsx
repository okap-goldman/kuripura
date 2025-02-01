import { Send } from "lucide-react";
import { useState } from "react";

export const MessageInput = () => {
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    // TODO: メッセージ送信処理
    setMessage("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2 p-4 border-t">
      <div className="flex-1 relative">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="こんにちは"
          className="w-full p-2 rounded-lg border bg-background text-foreground"
        />
      </div>
      <button
        type="submit"
        className="p-2 rounded-lg bg-primary text-primary-foreground hover:opacity-90"
      >
        <Send className="w-5 h-5" />
      </button>
    </form>
  );
}; 