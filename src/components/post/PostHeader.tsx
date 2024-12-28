import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface PostHeaderProps {
  author: {
    name: string;
    image: string;
  };
  type: "family" | "watch";
}

export function PostHeader({ author, type }: PostHeaderProps) {
  return (
    <div className="flex items-center gap-3">
      <Avatar>
        <AvatarImage src={author.image} />
        <AvatarFallback>{author.name[0]}</AvatarFallback>
      </Avatar>
      <div>
        <div className="font-semibold">{author.name}</div>
        <div className="text-sm text-muted-foreground">
          {type === "family" ? "Family" : "Watch"}
        </div>
      </div>
    </div>
  );
}