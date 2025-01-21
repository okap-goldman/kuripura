import { Card } from "~/components/ui/card";
import { PostHeader } from "./post/PostHeader";
import { PostContent } from "./post/PostContent";
import { PostActions } from "./post/PostActions";
import { PostComments } from "./post/PostComments";

interface PostProps {
  author: {
    name: string;
    image: string;
    id: string;
  };
  content: string;
  caption?: string;
  mediaType: "text" | "image" | "video" | "audio";
  comments?: {
    author: {
      name: string;
      image: string;
    };
    content: string;
  }[];
}

export function Post({ author, content, caption, mediaType, comments = [] }: PostProps) {
  return (
    <Card>
      <PostHeader author={author} />
      <PostContent content={content} caption={caption} mediaType={mediaType} />
      <PostActions />
      {comments.length > 0 && <PostComments comments={comments} />}
    </Card>
  );
}