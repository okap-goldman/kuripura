import { Heart, MessageCircle, Share } from "lucide-react";

export function PostActions() {
  return (
    <div className="flex items-center gap-4 px-4 py-2">
      <button className="text-muted-foreground hover:text-foreground transition-colors">
        <Heart className="h-5 w-5" />
      </button>
      <button className="text-muted-foreground hover:text-foreground transition-colors">
        <MessageCircle className="h-5 w-5" />
      </button>
      <button className="text-muted-foreground hover:text-foreground transition-colors">
        <Share className="h-5 w-5" />
      </button>
    </div>
  );
} 