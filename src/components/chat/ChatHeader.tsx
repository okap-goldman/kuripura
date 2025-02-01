import { ArrowLeft, MoreVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type ChatHeaderProps = {
  user: {
    name: string;
    avatarUrl?: string;
  };
  onBack: () => void;
};

export const ChatHeader = ({ user, onBack }: ChatHeaderProps) => {
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
            <MoreVertical className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};