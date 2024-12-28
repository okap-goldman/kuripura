import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

interface PostProps {
  author: {
    name: string;
    image: string;
  };
  content: string;
  type: "family" | "watch";
}

export function Post({ author, content, type }: PostProps) {
  const [isKurattaDialogOpen, setIsKurattaDialogOpen] = useState(false);
  const { toast } = useToast();

  const handleKuratta = (reason: string) => {
    toast({
      title: "くらった！",
      description: `You deeply resonated with this post: "${reason}"`,
    });
    setIsKurattaDialogOpen(false);
  };

  return (
    <Card className="p-4 space-y-4">
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

      <p className="text-sm">{content}</p>

      <Dialog open={isKurattaDialogOpen} onOpenChange={setIsKurattaDialogOpen}>
        <DialogTrigger asChild>
          <button className="kuratta-button">
            <span>くらった</span>
          </button>
        </DialogTrigger>
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
    </Card>
  );
}