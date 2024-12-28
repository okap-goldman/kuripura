import { useState } from "react";
import { Card } from "@/components/ui/card";
import { PostHeader } from "./post/PostHeader";
import { PostContent } from "./post/PostContent";
import { PostActions } from "./post/PostActions";
import { PostComments } from "./post/PostComments";
import { Dialog, DialogContent } from "@/components/ui/dialog";

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
  const [isExpanded, setIsExpanded] = useState(false);
  const [showComments, setShowComments] = useState(false);

  return (
    <Card className="p-4 space-y-4">
      <PostHeader author={author} type={type} />
      
      <PostContent
        content={content}
        caption={caption}
        mediaType={mediaType}
        isExpanded={isExpanded}
        setIsExpanded={setIsExpanded}
      />

      <PostActions
        postId="1"
        onComment={() => setShowComments(true)}
      />

      <Dialog open={showComments} onOpenChange={setShowComments}>
        <DialogContent>
          <PostComments
            postId="1"
            comments={[
              {
                id: "1",
                author: {
                  name: "テストユーザー",
                  image: "https://api.dicebear.com/7.x/avataaars/svg?seed=test",
                },
                content: "素晴らしい投稿ですね！",
                createdAt: new Date().toISOString(),
              },
            ]}
          />
        </DialogContent>
      </Dialog>
    </Card>
  );
}