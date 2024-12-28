import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/Navbar";
import { Post } from "@/components/Post";
import { useState } from "react";

const SAMPLE_POSTS = [
  {
    author: {
      name: "Spiritual Seeker",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=1",
    },
    content: "Today I meditated for an hour and felt a deep connection with the universe. The silence spoke volumes.",
    type: "family" as const,
    mediaType: "text" as const,
  },
  {
    author: {
      name: "Light Worker",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=2",
    },
    content: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
    type: "watch" as const,
    mediaType: "image" as const,
  },
  {
    author: {
      name: "Soul Explorer",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=3",
    },
    content: "https://soundcloud.com/user-123456789/meditation-music",
    type: "family" as const,
    mediaType: "audio" as const,
  },
  {
    author: {
      name: "Inner Light",
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