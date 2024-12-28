import { Heart, MessageSquare, Flame } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

interface PostActionsProps {
  postId: string;
  onComment: () => void;
}

export function PostActions({ postId, onComment }: PostActionsProps) {
  const [liked, setLiked] = useState(false);
  const [kuratta, setKuratta] = useState(false);
  const [showKurattaDialog, setShowKurattaDialog] = useState(false);

  return (
    <div className="flex items-center gap-4">
      <Button
        variant="ghost"
        size="sm"
        className="flex items-center gap-2 group"
        onClick={() => setLiked(!liked)}
      >
        <Heart 
          className={cn(
            "h-5 w-5 transition-all duration-300 ease-in-out",
            liked && "fill-red-500 text-red-500 scale-125 animate-heartBeat"
          )} 
        />
      </Button>

      <Button
        variant="ghost"
        size="sm"
        className="flex items-center gap-2"
        onClick={onComment}
      >
        <MessageSquare className="h-5 w-5" />
      </Button>

      <Button
        variant="ghost"
        size="sm"
        className="flex items-center gap-2"
        onClick={() => !kuratta && setShowKurattaDialog(true)}
        disabled={kuratta}
      >
        <Flame className={`h-5 w-5 ${kuratta ? "fill-orange-500 text-orange-500" : ""}`} />
      </Button>

      <Dialog open={showKurattaDialog} onOpenChange={setShowKurattaDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>この投稿をくらう理由を選択してください</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Button
              onClick={() => {
                setKuratta(true);
                setShowKurattaDialog(false);
              }}
              className="w-full"
            >
              心に響いた
            </Button>
            <Button
              onClick={() => {
                setKuratta(true);
                setShowKurattaDialog(false);
              }}
              className="w-full"
            >
              共感した
            </Button>
            <Button
              onClick={() => {
                setKuratta(true);
                setShowKurattaDialog(false);
              }}
              className="w-full"
            >
              感動した
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}