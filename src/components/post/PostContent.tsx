import { useRef, useEffect, useState } from "react";
import { View, Text, Image, StyleSheet, Pressable } from "react-native";
import { Play, Pause } from "lucide-react-native";
import { Button } from "@/components/ui/native/button";
import { Audio, AVPlaybackStatus } from "expo-av";
import { Video } from "expo-av";

interface PostContentProps {
  content: string;
  caption?: string;
  mediaType: "text" | "image" | "video" | "audio";
  isExpanded: boolean;
  setIsExpanded: (value: boolean) => void;
}

export function PostContent({ content, caption, mediaType, isExpanded, setIsExpanded }: PostContentProps) {
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const audioRef = useRef<Audio.Sound | null>(null);
  const videoRef = useRef<Video>(null);

  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.unloadAsync();
      }
    };
  }, []);

  useEffect(() => {
    if (!isAudioPlaying && audioRef.current) {
      audioRef.current.pauseAsync();
    }
  }, [isAudioPlaying]);

  const toggleAudio = async () => {
    try {
      if (!audioRef.current) {
        const { sound } = await Audio.Sound.createAsync({ uri: content });
        audioRef.current = sound;
      }

      if (isAudioPlaying) {
        await audioRef.current.pauseAsync();
      } else {
        await audioRef.current.playAsync();
      }
      setIsAudioPlaying(!isAudioPlaying);
    } catch (error) {
      console.error('Error playing audio:', error);
    }
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
          <ReactMarkdown>{`${text.slice(0, 280)}...`}</ReactMarkdown>
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
                <h3 className="text-lg font-semibold"><Text>使命</Text></h3>
                <p className="text-sm opacity-80"><Text>1時間5分・165人がリスニング/リプレイ</Text></p>
              </div>
            </div>
            <Button
              onClick={toggleAudio}
              variant="outline"
              size="icon"
              className="w-full bg-white text-purple-600 hover:bg-white/90 hover:text-purple-600"
            >
              {isAudioPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
              <span className="sr-only"><Text>音声を再生</Text></span>
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
