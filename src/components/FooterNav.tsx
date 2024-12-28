import { Home, Search, PlusSquare, Heart, User } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

export function FooterNav() {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-background border-t flex justify-around items-center p-3 z-50">
      <Link to="/" className={`${isActive('/') ? 'text-primary' : 'text-muted-foreground'}`}>
        <Home className="w-6 h-6" />
      </Link>
      <Link to="/search" className={`${isActive('/search') ? 'text-primary' : 'text-muted-foreground'}`}>
        <Search className="w-6 h-6" />
      </Link>
      <Link to="/create" className={`${isActive('/create') ? 'text-primary' : 'text-muted-foreground'}`}>
        <PlusSquare className="w-6 h-6" />
      </Link>
      <Link to="/notifications" className={`${isActive('/notifications') ? 'text-primary' : 'text-muted-foreground'}`}>
        <Heart className="w-6 h-6" />
      </Link>
      <Link to="/profile" className={`${isActive('/profile') ? 'text-primary' : 'text-muted-foreground'}`}>
        <User className="w-6 h-6" />
      </Link>
    </nav>
  );
}