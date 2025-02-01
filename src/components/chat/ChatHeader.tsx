import { ArrowLeft, Phone, Lightbulb, MoreVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

type CommonPoint = {
  text: string;
  type: "hobby" | "personality" | "lifestyle" | "location";
};

type ChatHeaderProps = {
  user: {
    name: string;
    avatarUrl?: string;
  };
  commonPoints: CommonPoint[];
  onBack: () => void;
};

export const ChatHeader = ({ user, commonPoints, onBack }: ChatHeaderProps) => {
  return (
    <div className="border-b">
      <div className="flex items-center gap-2 p-4">
        <Button variant="ghost" size="icon" onClick={onBack}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <Avatar className="w-8 h-8">
          <AvatarImage src={user.avatarUrl} />
          <AvatarFallback>{user.name[0]}</AvatarFallback>
        </Avatar>
        <span className="font-medium">{user.name}</span>
        <div className="ml-auto flex items-center gap-2">
          <Button variant="ghost" size="icon">
            <Phone className="w-5 h-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <Lightbulb className="w-5 h-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <MoreVertical className="w-5 h-5" />
          </Button>
        </div>
      </div>
      <div className="px-4 pb-4">
        <div className="text-sm text-muted-foreground mb-2">話題になりそうな共通点</div>
        <div className="flex flex-wrap gap-2">
          {commonPoints.map((point, index) => (
            <Badge
              key={index}
              variant="secondary"
              className="rounded-full px-3 py-1 text-sm"
            >
              {point.text}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
}; 