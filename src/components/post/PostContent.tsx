import { useRef, useEffect, useState } from "react";
import { Play, Pause } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PostContentProps {
  content: string;
  caption?: string;
  mediaType: "text" | "image" | "video" | "audio";
  isExpanded: boolean;
  setIsExpanded: (value: boolean) => void;
}

export function PostContent({ content, caption, mediaType, isExpanded, setIsExpanded }: PostContentProps) {
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const videoRef = useRef<HTMLIFrameElement>(null);
  const videoContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (mediaType !== "video" || !videoContainerRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!videoRef.current?.contentWindow) return;

          if (entry.isIntersecting) {
            videoRef.current.contentWindow.postMessage(
              '{"event":"command","func":"playVideo","args":""}',
              "*"
            );
          } else {
            videoRef.current.contentWindow.postMessage(
              '{"event":"command","func":"pauseVideo","args":""}',
              "*"
            );
          }
        });
      },
      {
        threshold: 0.5,
      }
    );

    observer.observe(videoContainerRef.current);

    return () => {
      observer.disconnect();
    };
  }, [mediaType]);

  const toggleAudio = () => {
    if (!audioRef.current) {
      audioRef.current = new Audio(content);
    }

    if (isAudioPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsAudioPlaying(!isAudioPlaying);
  };

  const renderTruncatedText = (text: string) => {
    if (text.length <= 140 || isExpanded) {
      return <p className="text-sm whitespace-pre-wrap">{text}</p>;
    }
    return (
      <div>
        <p className="text-sm whitespace-pre-wrap">{text.slice(0, 140)}...</p>
        <button
          className="text-sm text-muted-foreground hover:underline"
          onClick={() => setIsExpanded(true)}
        >
          すべて表示
        </button>
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
          <div className="w-full bg-purple-600 text-white p-6 rounded-lg">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold">使命</h3>
                <p className="text-sm opacity-80">1時間5分・165人がリスニング/リプレイ</p>
              </div>
            </div>
            <Button
              onClick={toggleAudio}
              variant="outline"
              size="icon"
              className="w-full bg-white text-purple-600 hover:bg-white/90 hover:text-purple-600"
            >
              {isAudioPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
              <span className="sr-only">音声を再生</span>
            </Button>
          </div>
        );
      case "text":
      default:
        return renderTruncatedText(content);
    }
  };

  return (
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
  );
}