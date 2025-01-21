import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";

interface Comment {
  author: {
    name: string;
    image: string;
  };
  content: string;
}

interface PostCommentsProps {
  comments: Comment[];
}

export function PostComments({ comments }: PostCommentsProps) {
  return (
    <div className="px-4 py-2">
      {comments.map((comment, index) => (
        <div key={index} className="flex items-start gap-3 mb-3">
          <Avatar className="h-8 w-8">
            <AvatarImage src={comment.author.image} alt={comment.author.name} />
            <AvatarFallback>{comment.author.name[0]}</AvatarFallback>
          </Avatar>
          <div>
            <div className="font-semibold text-sm">{comment.author.name}</div>
            <div className="text-sm">{comment.content}</div>
          </div>
        </div>
      ))}
    </div>
  );
} 