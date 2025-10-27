import { Button } from '@/components/ui/button';
import { Home } from 'lucide-react';
import { Link } from 'react-router';

export function AppHeader() {
  return (
    <header className="flex h-16 shrink-0 items-center border-b px-4">
      <div className="flex w-full items-center justify-between gap-4">
        <Button variant="ghost" size="sm" asChild>
          <a href="/" className="flex items-center gap-2">
            <Home className="h-4 w-4" />
            <span>Home</span>
          </a>
        </Button>

        <Button variant="link" asChild>
          <Link to="/application">Create An Application</Link>
        </Button>

        <Button variant="ghost" size="sm" asChild>
          <a
            href="https://github.com/otmjka"
            rel="noopener noreferrer"
            target="_blank"
            className="dark:text-foreground"
          >
            GitHub
          </a>
        </Button>
      </div>
    </header>
  );
}
