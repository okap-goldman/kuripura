import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface PostHeaderProps {
  author: {
    name: string;
    image: string;
    id?: string;
  };
}

export function PostHeader({ author }: PostHeaderProps) {
  return (
    <div className="flex items-center gap-3">
      <Avatar>
        <AvatarImage src={author.image} />
        <AvatarFallback>{author.name[0]}</AvatarFallback>
      </Avatar>
      <div>
        <div className="font-semibold">{author.name}</div>
        <div className="text-sm text-muted-foreground">
          {author.id || `@${author.name.toLowerCase().replace(/\s+/g, '')}`}
        </div>
      </div>
    </div>
  );
}