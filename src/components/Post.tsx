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
  caption?: string;
  type: "family" | "watch";
  mediaType: "text" | "image" | "video" | "audio";
}

export function Post({ author, content, caption, type, mediaType }: PostProps) {
  const [isKurattaDialogOpen, setIsKurattaDialogOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const { toast } = useToast();

  const handleKuratta = (reason: string) => {
    toast({
      title: "くらった！",
      description: `You deeply resonated with this post: "${reason}"`,
    });
    setIsKurattaDialogOpen(false);
  };

  const renderTruncatedText = (text: string) => {
    if (text.length <= 280 || isExpanded) {
      return <p className="text-sm whitespace-pre-wrap">{text}</p>;
    }
    return (
      <div>
        <p className="text-sm whitespace-pre-wrap">{text.slice(0, 280)}...</p>
        <Button
          variant="link"
          className="p-0 h-auto text-sm text-muted-foreground"
          onClick={() => setIsExpanded(true)}
        >
          すべて表示
        </Button>
      </div>
    );
  };

  const renderMedia = () => {
    switch (mediaType) {
      case "image":
        return (
          <img
            src={content}
            alt="Post content"
            className="w-full h-auto rounded-md object-cover max-h-96"
          />
        );
      case "video":
        return (
          <div className="aspect-video w-full">
            <iframe
              src={content}
              className="w-full h-full rounded-md"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        );
      case "audio":
        return (
          <div className="w-full">
            <iframe
              width="100%"
              height="300"
              scrolling="no"
              frameBorder="no"
              allow="autoplay"
              src={content}
              className="rounded-md"
            />
          </div>
        );
      case "text":
      default:
        return renderTruncatedText(content);
    }
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

      <div className="space-y-4">
        {mediaType === "text" ? (
          renderMedia()
        ) : (
          <>
            {renderMedia()}
            {caption && renderTruncatedText(caption)}
          </>
        )}
      </div>

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