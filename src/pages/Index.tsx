import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/Navbar";
import { Post } from "@/components/Post";
import { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const SAMPLE_POSTS = [
  {
    author: {
      name: "心の探求者",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=1",
    },
    content: "私は最近、瞑想の素晴らしさについて深く考えています。毎日の瞑想実践を通じて、心の平安と内なる気づきを得ることができました。静寂の中で過ごす時間は、私たちの心を整理し、新しい視点を見出すための貴重な機会を与えてくれます。特に朝の瞑想は、一日をより意識的に過ごすための素晴らしい方法です。瞑想を始めてから、ストレスへの対処能力が向上し、周囲との関係もより深まりました。また、自分自身への理解も深まり、日々の決断がより明確になってきました。この実践を続けることで、人生の様々な側面でポジティブな変化を感じています。瞑想は単なるトレンドではなく、本当の意味で人生を豊かにする実践だと確信しています。",
    type: "family" as const,
    mediaType: "text" as const,
  },
  {
    author: {
      name: "光の使者",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=2",
    },
    content: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
    caption: "新しい技術との出会いは、いつも心を躍らせてくれます。",
    type: "watch" as const,
    mediaType: "image" as const,
  },
  {
    author: {
      name: "魂の冒険家",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=3",
    },
    content: "https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/1931717666&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true",
    caption: "この音楽を聴くと、心が落ち着きます。瞑想のお供に。",
    type: "family" as const,
    mediaType: "audio" as const,
  },
  {
    author: {
      name: "内なる光",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=4",
    },
    content: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    caption: "この動画から多くの気づきを得ました。皆さんにもシェアしたいと思います。",
    type: "watch" as const,
    mediaType: "video" as const,
  },
];

const Index = () => {
  const [timelineType, setTimelineType] = useState<"family" | "watch">("family");
  const [showWatchConfirm, setShowWatchConfirm] = useState(false);

  const handleTimelineChange = (type: "family" | "watch") => {
    if (type === "watch") {
      setShowWatchConfirm(true);
    } else {
      setTimelineType(type);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container mx-auto px-4 pt-24 pb-8">
        <div className="flex justify-center gap-2 mb-8">
          <Button
            variant={timelineType === "family" ? "default" : "outline"}
            onClick={() => handleTimelineChange("family")}
          >
            Family
          </Button>
          <Button
            variant={timelineType === "watch" ? "default" : "outline"}
            onClick={() => handleTimelineChange("watch")}
          >
            Watch
          </Button>
        </div>

        <div className="space-y-4 max-w-xl mx-auto">
          {SAMPLE_POSTS
            .filter((post) => post.type === timelineType)
            .map((post, index) => (
              <Post key={index} {...post} />
            ))}
        </div>
      </main>

      <AlertDialog open={showWatchConfirm} onOpenChange={setShowWatchConfirm}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>ウォッチタイムラインの表示</AlertDialogTitle>
            <AlertDialogDescription>
              ウォッチタイムラインを表示しますか？
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>キャンセル</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                setTimelineType("watch");
                setShowWatchConfirm(false);
              }}
            >
              表示する
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Index;