import { Home, User, Compass, Search, Calendar, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="fixed bottom-0 left-0 right-0 h-16 bg-white border-t border-gray-200 z-50">
      <div className="container h-full mx-auto px-4">
        <nav className="h-full flex items-center justify-around">
          <Link to="/">
            <Button variant="ghost" size="icon">
              <Home className="h-5 w-5" />
            </Button>
          </Link>
          
          <Link to="/profile">
            <Button variant="ghost" size="icon">
              <User className="h-5 w-5" />
            </Button>
          </Link>
          
          <Link to="/post">
            <Button size="icon" className="bg-primary text-white rounded-full hover:bg-primary/90">
              <Plus className="h-5 w-5" />
            </Button>
          </Link>
          
          <Link to="/discover">
            <Button variant="ghost" size="icon">
              <Compass className="h-5 w-5" />
            </Button>
          </Link>
          
          <Link to="/events">
            <Button variant="ghost" size="icon">
              <Calendar className="h-5 w-5" />
            </Button>
          </Link>
        </nav>
      </div>
    </footer>
  );
} 