import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/Navbar";
import { Post } from "@/components/Post";
import { useState } from "react";

const SAMPLE_POSTS = [
  {
    author: {
      name: "心の探求者",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=1",
    },
    content: "今日は1時間瞑想をして、宇宙との深いつながりを感じました。静寂は多くを語りかけてくれます。",
    type: "family" as const,
    mediaType: "text" as const,
  },
  {
    author: {
      name: "光の使者",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=2",
    },
    content: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
    type: "watch" as const,
    mediaType: "image" as const,
  },
  {
    author: {
      name: "魂の冒険家",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=3",
    },
    content: "https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/1931717666&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true",
    type: "family" as const,
    mediaType: "audio" as const,
  },
  {
    author: {
      name: "内なる光",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=4",
    },
    content: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    type: "watch" as const,
    mediaType: "video" as const,
  },
];

const Index = () => {
  const [timelineType, setTimelineType] = useState<"family" | "watch">("family");

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container mx-auto px-4 pt-24 pb-8">
        <div className="flex justify-center gap-2 mb-8">
          <Button
            variant={timelineType === "family" ? "default" : "outline"}
            onClick={() => setTimelineType("family")}
          >
            Family
          </Button>
          <Button
            variant={timelineType === "watch" ? "default" : "outline"}
            onClick={() => setTimelineType("watch")}
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
    </div>
  );
};

export default Index;