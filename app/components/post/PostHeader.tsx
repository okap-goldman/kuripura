import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { MoreHorizontal } from "lucide-react";

interface PostHeaderProps {
  author: {
    name: string;
    image: string;
    id: string;
  };
}

export function PostHeader({ author }: PostHeaderProps) {
  return (
    <div className="flex items-center justify-between p-4">
      <div className="flex items-center gap-3">
        <Avatar>
          <AvatarImage src={author.image} alt={author.name} />
          <AvatarFallback>{author.name[0]}</AvatarFallback>
        </Avatar>
        <div>
          <div className="font-semibold">{author.name}</div>
          <div className="text-sm text-muted-foreground">{author.id}</div>
        </div>
      </div>
      <button className="text-muted-foreground hover:text-foreground transition-colors">
        <MoreHorizontal className="h-5 w-5" />
      </button>
    </div>
  );
} 