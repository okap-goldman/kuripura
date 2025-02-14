import { ThumbsUp } from "lucide-react";
import { Post } from "@/components/Post";
import { SAMPLE_POSTS } from "@/lib/data";

export function RecommendedPostsSection() {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <ThumbsUp className="w-5 h-5" />
        <h2 className="text-lg font-semibold"><Text>おすすめ投稿</Text></h2>
      </div>

      <div className="space-y-4">
        {SAMPLE_POSTS.map((post, index) => (
          <Post
            key={index}
            author={post.author}
            content={post.content}
            caption={post.caption}
            mediaType={post.mediaType}
          />
        ))}
      </div>
    </div>
  );
}