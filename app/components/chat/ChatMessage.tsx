import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar"
import { cn } from "~/lib/utils"

interface ChatMessageProps {
  message: {
    role: string
    content: string
    name?: string
    avatar?: string
  }
  className?: string
}

export function ChatMessage({ message, className }: ChatMessageProps) {
  return (
    <div
      className={cn(
        "flex items-start gap-4 p-4",
        message.role === "user" ? "flex-row-reverse" : "",
        className
      )}
    >
      <Avatar>
        <AvatarImage src={message.avatar} />
        <AvatarFallback>
          {message.name?.[0]?.toUpperCase() || (message.role === "user" ? "U" : "A")}
        </AvatarFallback>
      </Avatar>
      <div
        className={cn(
          "rounded-lg px-4 py-2 max-w-[80%]",
          message.role === "user"
            ? "bg-primary text-primary-foreground"
            : "bg-muted"
        )}
      >
        <p className="text-sm">{message.content}</p>
      </div>
    </div>
  )
} 