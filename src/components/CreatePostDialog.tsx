import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Image, Video, Mic, BookText, History } from "lucide-react";

interface CreatePostDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CreatePostDialog({ isOpen, onClose }: CreatePostDialogProps) {
  const postTypes = [
    { icon: Video, label: "動画・画像", value: "media" },
    { icon: Mic, label: "音声", value: "audio" },
    { icon: BookText, label: "テキスト", value: "text" },
    { icon: History, label: "ストーリーズ", value: "story" },
  ];

  const handlePostTypeSelect = (type: string) => {
    console.log("Selected post type:", type);
    // TODO: Implement post creation logic
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>新規投稿を作成</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-2 gap-4">
          {postTypes.map(({ icon: Icon, label, value }) => (
            <Button
              key={value}
              variant="outline"
              className="h-24 flex flex-col gap-2"
              onClick={() => handlePostTypeSelect(value)}
            >
              <Icon className="h-8 w-8" />
              <span>{label}</span>
            </Button>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}