import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";
import { Gift, SmilePlus } from "lucide-react";

interface Comment {
  id: string;
  author: {
    name: string;
    image: string;
  };
  content: string;
  createdAt: string;
  likes?: number;
}

interface PostCommentsProps {
  postId: string;
  comments: Comment[];
}

export function PostComments({ postId, comments: initialComments }: PostCommentsProps) {
  const [comments, setComments] = useState<Comment[]>(initialComments);
  const [newComment, setNewComment] = useState("");
  const { toast } = useToast();

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const comment: Comment = {
      id: Date.now().toString(),
      author: {
        name: "現在のユーザー",
        image: "https://api.dicebear.com/7.x/avataaars/svg?seed=current",
      },
      content: newComment,
      createdAt: new Date().toISOString(),
      likes: 0,
    };

    setComments([...comments, comment]);
    setNewComment("");
    toast({
      title: "コメントを投稿しました",
      description: "コメントが正常に投稿されました。",
    });
  };

  return (
    <div className="space-y-4">
      <div className="space-y-4 max-h-[60vh] overflow-y-auto">
        {comments.map((comment) => (
          <div key={comment.id} className="flex gap-2">
            <Avatar className="w-8 h-8">
              <AvatarImage src={comment.author.image} />
              <AvatarFallback>{comment.author.name[0]}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium">{comment.author.name}</p>
                <p className="text-xs text-muted-foreground">
                  {new Date(comment.createdAt).toLocaleDateString()}
                </p>
              </div>
              <p className="text-sm mt-1">{comment.content}</p>
              {comment.likes !== undefined && (
                <p className="text-xs text-muted-foreground mt-1">
                  {comment.likes.toLocaleString()} いいね
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
      
      <form onSubmit={handleSubmitComment} className="flex gap-2 items-center">
        <Avatar className="w-8 h-8">
          <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=current" />
          <AvatarFallback>U</AvatarFallback>
        </Avatar>
        <div className="flex-1 relative">
          <Input
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="コメントを追加..."
            className="pr-20"
          />
          <div className="absolute right-2 top-1/2 -translate-y-1/2 flex gap-2">
            <SmilePlus className="h-5 w-5 text-muted-foreground cursor-pointer" />
            <Gift className="h-5 w-5 text-muted-foreground cursor-pointer" />
          </div>
        </div>
      </form>
    </div>
  );
}