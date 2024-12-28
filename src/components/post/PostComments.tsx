import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";

interface Comment {
  id: string;
  author: {
    name: string;
    image: string;
  };
  content: string;
  createdAt: string;
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
      <div className="space-y-4 max-h-60 overflow-y-auto">
        {comments.map((comment) => (
          <div key={comment.id} className="flex gap-2">
            <Avatar className="w-8 h-8">
              <AvatarImage src={comment.author.image} />
              <AvatarFallback>{comment.author.name[0]}</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium">{comment.author.name}</p>
              <p className="text-sm">{comment.content}</p>
              <p className="text-xs text-muted-foreground">
                {new Date(comment.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        ))}
      </div>
      
      <form onSubmit={handleSubmitComment} className="flex gap-2">
        <Input
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="コメントを追加..."
          className="flex-1"
        />
        <Button type="submit" size="sm">
          投稿
        </Button>
      </form>
    </div>
  );
}