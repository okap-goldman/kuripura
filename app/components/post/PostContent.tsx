interface PostContentProps {
  content: string;
  caption?: string;
  mediaType: "text" | "image" | "video" | "audio";
}

export function PostContent({ content, caption, mediaType }: PostContentProps) {
  return (
    <div className="px-4 pb-4">
      {mediaType === "text" ? (
        <div className="whitespace-pre-wrap">{content}</div>
      ) : mediaType === "image" ? (
        <div>
          <img
            src={content}
            alt={caption || "投稿画像"}
            className="w-full rounded-lg"
          />
          {caption && (
            <div className="mt-2 whitespace-pre-wrap text-sm">{caption}</div>
          )}
        </div>
      ) : mediaType === "video" ? (
        <div>
          <iframe
            src={content}
            className="w-full aspect-video rounded-lg"
            allowFullScreen
          />
          {caption && (
            <div className="mt-2 whitespace-pre-wrap text-sm">{caption}</div>
          )}
        </div>
      ) : mediaType === "audio" ? (
        <div>
          <audio src={content} controls className="w-full" />
          {caption && (
            <div className="mt-2 whitespace-pre-wrap text-sm">{caption}</div>
          )}
        </div>
      ) : null}
    </div>
  );
} 