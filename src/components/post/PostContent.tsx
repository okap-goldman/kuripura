import { useRef, useEffect, useState } from "react";
import { Play, Pause } from "lucide-react";
import { Button } from "@/components/ui/button";
import ReactMarkdown from "react-markdown";

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
  const audioContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (mediaType === "audio") {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting && audioRef.current && isAudioPlaying) {
              audioRef.current.pause();
              setIsAudioPlaying(false);
            }
          });
        },
        {
          threshold: 0.5,
        }
      );

      if (audioContainerRef.current) {
        observer.observe(audioContainerRef.current);
      }

      return () => {
        observer.disconnect();
      };
    }
  }, [mediaType, isAudioPlaying]);

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
    if (text.length <= 280 || isExpanded) {
      return (
        <div className="prose dark:prose-invert max-w-none text-sm">
          <ReactMarkdown>{text}</ReactMarkdown>
        </div>
      );
    }
    return (
      <div>
        <div className="prose dark:prose-invert max-w-none text-sm">
          <ReactMarkdown>{text.slice(0, 280)}...</ReactMarkdown>
        </div>
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
          <div ref={audioContainerRef} className="w-full bg-[#00ffff] text-[#000080] p-6 rounded-lg">
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
