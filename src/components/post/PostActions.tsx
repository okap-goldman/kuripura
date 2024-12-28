import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Heart, MessageCircle, Flame } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface PostActionsProps {
  onComment: () => void;
  postId: string;
}

export function PostActions({ onComment, postId }: PostActionsProps) {
  const [isKurattaDialogOpen, setIsKurattaDialogOpen] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isKuratta, setIsKuratta] = useState(false);
  const { toast } = useToast();

  const handleLike = () => {
    setIsLiked(!isLiked);
    toast({
      title: isLiked ? "いいねを取り消しました" : "いいね！",
      description: isLiked ? "投稿のいいねを取り消しました" : "投稿にいいねしました",
    });
  };

  const handleKuratta = (reason: string) => {
    if (isKuratta) return;
    
    setIsKuratta(true);
    toast({
      title: "くらった！",
      description: `You deeply resonated with this post: "${reason}"`,
    });
    setIsKurattaDialogOpen(false);
  };

  return (
    <div className="flex gap-2">
      <Button
        variant="ghost"
        size="sm"
        className={`flex-1 ${
          isLiked
            ? "text-pink-500 hover:text-pink-600 hover:bg-pink-50"
            : "hover:bg-pink-50 hover:text-pink-500"
        }`}
        onClick={handleLike}
      >
        <Heart className={`w-4 h-4 mr-2 ${isLiked ? "fill-current" : ""}`} />
        いいね
      </Button>

      <Button
        variant="ghost"
        size="sm"
        className="flex-1 hover:bg-blue-50 hover:text-blue-500"
        onClick={onComment}
      >
        <MessageCircle className="w-4 h-4 mr-2" />
        コメント
      </Button>

      <Dialog open={isKurattaDialogOpen} onOpenChange={setIsKurattaDialogOpen}>
        <Button
          variant="ghost"
          size="sm"
          className={`flex-1 ${
            isKuratta
              ? "text-orange-500 hover:text-orange-600 hover:bg-orange-50"
              : "hover:bg-orange-50 hover:text-orange-500"
          }`}
          onClick={() => !isKuratta && setIsKurattaDialogOpen(true)}
          disabled={isKuratta}
        >
          <Flame className={`w-4 h-4 mr-2 ${isKuratta ? "fill-current" : ""}`} />
          くらった
        </Button>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Share why this resonated with you</DialogTitle>
          </DialogHeader>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.currentTarget);
              handleKuratta(formData.get("reason") as string);
            }}
            className="space-y-4"
          >
            <Input
              name="reason"
              placeholder="What touched your heart?"
              required
            />
            <Button type="submit">Share</Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}