import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Menu, Search, User } from "lucide-react";

export function Navbar() {
  const { toast } = useToast();

  const handleLogin = () => {
    toast({
      title: "Coming soon!",
      description: "Google authentication will be implemented in the next update.",
    });
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon">
            <Menu className="h-5 w-5" />
          </Button>
          <span className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Kuripura
          </span>
        </div>
        
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon">
            <Search className="h-5 w-5" />
          </Button>
          <Button onClick={handleLogin} className="gap-2">
            <User className="h-4 w-4" />
            Login
          </Button>
        </div>
      </div>
    </nav>
  );
}