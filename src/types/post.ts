export type PostType = {
  author: {
    name: string;
    image: string;
    id: string;
  };
  content: {
    text: string;
    html: string;
  };
  images?: string[];
  mediaType: "text" | "image" | "video" | "audio";
}; 