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
  },
  {
    author: {
      name: "Light Worker",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=2",
    },
    content: "Remember: you are not your thoughts. You are the awareness that observes them.",
    type: "watch" as const,
  },
  {
    author: {
      name: "Soul Explorer",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=3",
    },
    content: "Just completed a powerful sound healing session. The vibrations are still resonating within me.",
    type: "family" as const,
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