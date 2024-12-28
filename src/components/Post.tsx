import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useState, useRef, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { Heart, MessageCircle, Flame } from "lucide-react";

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
  const videoRef = useRef<HTMLIFrameElement>(null);
  const videoContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (mediaType !== "video" || !videoContainerRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!videoRef.current?.contentWindow) return;

          if (entry.isIntersecting) {
            // 画面内に入った時：再生
            videoRef.current.contentWindow.postMessage(
              '{"event":"command","func":"playVideo","args":""}',
              "*"
            );
          } else {
            // 画面外に出た時：停止
            videoRef.current.contentWindow.postMessage(
              '{"event":"command","func":"pauseVideo","args":""}',
              "*"
            );
          }
        });
      },
      {
        threshold: 0.5, // 50%以上表示された時にトリガー
      }
    );

    observer.observe(videoContainerRef.current);

    return () => {
      observer.disconnect();
    };
  }, [mediaType]);

  const handleKuratta = (reason: string) => {
    toast({
      title: "くらった！",
      description: `You deeply resonated with this post: "${reason}"`,
    });
    setIsKurattaDialogOpen(false);
  };

  const handleLike = () => {
    toast({
      title: "いいね！",
      description: "投稿にいいねしました",
    });
  };

  const handleComment = () => {
    toast({
      title: "コメント",
      description: "コメント機能は開発中です",
    });
  };

  const renderTruncatedText = (text: string) => {
    if (text.length <= 140 || isExpanded) {
      return <p className="text-sm whitespace-pre-wrap">{text}</p>;
    }
    return (
      <div>
        <p className="text-sm whitespace-pre-wrap">{text.slice(0, 140)}...</p>
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
          <div ref={videoContainerRef} className="aspect-video w-full">
            <iframe
              ref={videoRef}
              src={`${content}?enablejsapi=1`}
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

      <div className="flex gap-2">
        <Button
          variant="ghost"
          size="sm"
          className="flex-1 hover:bg-pink-50 hover:text-pink-500"
          onClick={handleLike}
        >
          <Heart className="w-4 h-4 mr-2" />
          いいね
        </Button>
        
        <Button
          variant="ghost"
          size="sm"
          className="flex-1 hover:bg-blue-50 hover:text-blue-500"
          onClick={handleComment}
        >
          <MessageCircle className="w-4 h-4 mr-2" />
          コメント
        </Button>

        <Dialog open={isKurattaDialogOpen} onOpenChange={setIsKurattaDialogOpen}>
          <DialogTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="flex-1 hover:bg-orange-50 hover:text-orange-500"
            >
              <Flame className="w-4 h-4 mr-2" />
              くらった
            </Button>
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
      </div>
    </Card>
  );
}
