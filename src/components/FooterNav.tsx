import { Home, Search, PlusSquare, Compass, User, MessageCircle, Heart, Card } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { CreatePostDialog } from "./CreatePostDialog";
import { cn } from "@/lib/utils";

const navItems = [
  {
    label: "さがす",
    icon: Search,
    path: "/search",
  },
  {
    label: "いいね",
    icon: Heart,
    path: "/likes",
  },
  {
    label: "トーク",
    icon: MessageCircle,
    path: "/messages",
  },
  {
    label: "好みカード",
    icon: Card,
    path: "/cards",
  },
  {
    label: "マイページ",
    icon: User,
    path: "/profile",
  },
];

export const FooterNav = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isCreatePostOpen, setIsCreatePostOpen] = useState(false);

  return (
    <>
      <nav className="flex items-center justify-around p-4 border-t bg-background">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className="flex flex-col items-center gap-1"
            >
              <item.icon
                className={cn(
                  "w-6 h-6",
                  isActive ? "text-primary" : "text-muted-foreground"
                )}
              />
              <span
                className={cn(
                  "text-xs",
                  isActive ? "text-primary" : "text-muted-foreground"
                )}
              >
                {item.label}
              </span>
            </button>
          );
        })}
      </nav>

      <CreatePostDialog 
        isOpen={isCreatePostOpen}
        onClose={() => setIsCreatePostOpen(false)}
      />
    </>
  );
};