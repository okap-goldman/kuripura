import { Bell, MessageCircle, Settings, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/components/ui/use-toast';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';

export default function Header() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const isMobile = useIsMobile();

  if (!user) {
    return null;
  }

  const handleLogout = async () => {
    try {
      await logout();
      toast({
        title: "ログアウトしました",
        description: "ご利用ありがとうございました",
      });
      navigate('/auth/login');
    } catch (error) {
      toast({
        title: "ログアウトに失敗しました",
        description: "もう一度お試しください",
        variant: "destructive",
      });
    }
  };

  return (
    <header className={cn(
        "fixed left-0 right-0 bg-white border-b border-gray-200",
        isMobile ? "top-0 h-14 z-[90]" : "top-0 h-16 z-50"
      )}>
      <div className="container h-full mx-auto px-4 flex items-center justify-between">
        <div className="flex-1">
          <h1 className="text-xl font-bold">目醒め人</h1>
        </div>
        
        <div className={cn(
          "flex items-center",
          isMobile 
            ? "fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 justify-around z-[100] w-full" 
            : "space-x-4"
        )}>
          <Link to="/notifications">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full" />
            </Button>
          </Link>
          
          <Link to="/messages">
            <Button variant="ghost" size="icon" className="relative">
              <MessageCircle className="h-5 w-5" />
              <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full" />
            </Button>
          </Link>
          
          <Link to="/settings">
            <Button variant="ghost" size="icon" className={cn(
              "relative",
              isMobile ? "flex flex-col items-center" : ""
            )}>
              <Settings className="h-5 w-5" />
            </Button>
          </Link>

          <Button
            variant="ghost"
            size="icon"
            onClick={handleLogout}
            className={cn(
              "relative",
              isMobile ? "text-red-500" : "text-red-500 hover:text-red-600"
            )}
          >
            <LogOut className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
}                 