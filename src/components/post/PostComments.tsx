import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";
import { Heart, Send } from "lucide-react";

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
    });
  };

  return (
    <div className="flex flex-col h-[80vh]">
      <div className="text-center py-4 border-b">
        <h2 className="text-lg font-semibold">コメント</h2>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-2 space-y-6">
        {comments.map((comment) => (
          <div key={comment.id} className="space-y-2">
            <div className="flex items-start gap-3">
              <Avatar className="w-8 h-8">
                <AvatarImage src={comment.author.image} />
                <AvatarFallback>{comment.author.name[0]}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium">{comment.author.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {comment.createdAt === new Date().toISOString() 
                      ? "たった今" 
                      : new Date(comment.createdAt).toLocaleDateString() + " 前"}
                  </p>
                </div>
                <p className="text-sm mt-1">{comment.content}</p>
              </div>
            </div>
            <div className="flex items-center gap-4 ml-11">
              <button className="text-xs text-muted-foreground hover:text-foreground">
                いいね！
              </button>
              <button className="text-xs text-muted-foreground hover:text-foreground">
                返信する
              </button>
              <button className="text-xs text-muted-foreground hover:text-foreground">
                翻訳を見る
              </button>
            </div>
            {comment.likes !== undefined && comment.likes > 0 && (
              <div className="ml-11 flex items-center gap-1">
                <Heart className="w-3 h-3 text-pink-500" fill="currentColor" />
                <p className="text-xs">{comment.likes}件</p>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="border-t p-4">
        <form onSubmit={handleSubmitComment} className="flex items-center gap-2">
          <Avatar className="w-8 h-8 shrink-0">
            <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=current" />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
          <div className="flex-1 relative">
            <Input
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="コメントを追加..."
              className="pr-12"
            />
            <button
              type="submit"
              className="absolute right-2 top-1/2 -translate-y-1/2 text-blue-500 disabled:text-gray-300"
              disabled={!newComment.trim()}
            >
              <Send className="h-5 w-5" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}