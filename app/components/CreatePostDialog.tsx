import { Dialog, DialogContent, DialogHeader, DialogTitle } from "~/components/ui/dialog";
import { Button } from "~/components/ui/button";
import { useState } from "react";
import { Form } from "@remix-run/react";
import { Textarea } from "~/components/ui/textarea";

interface CreatePostDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CreatePostDialog({ isOpen, onClose }: CreatePostDialogProps) {
  const [content, setContent] = useState("");

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // TODO: Implement post creation logic
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>新規投稿</DialogTitle>
        </DialogHeader>
        <Form onSubmit={handleSubmit} className="space-y-4">
          <Textarea
            placeholder="あなたの気持ちをシェアしましょう..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="min-h-[200px]"
          />
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={onClose} type="button">
              キャンセル
            </Button>
            <Button type="submit">投稿</Button>
          </div>
        </Form>
      </DialogContent>
    </Dialog>
  );
} 