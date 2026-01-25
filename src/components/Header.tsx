import { Search, User } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Link } from "react-router-dom";

interface HeaderProps {
  showAuthButtons?: boolean;
  showSearchButton?: boolean;
  showHomeButton?: boolean;
}

export const Header = ({
  showAuthButtons = true,
  showSearchButton = true,
  showHomeButton = false,
}: HeaderProps) => {
  return (
    <header className="bg-card border-b border-border sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/home" className="flex items-center gap-2">
            <div className="relative w-10 h-10">
              <div className="absolute inset-0 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground text-xl font-bold">
                  ?
                </span>
              </div>
              <div className="absolute bottom-0 right-0 w-4 h-4 bg-[#FF6B35] rounded-full"></div>
            </div>
            <span className="text-xl font-bold text-foreground">OrgFlow</span>
          </Link>

          {showSearchButton && (
            <div className="flex-1 max-w-md mx-8">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  type="text"
                  placeholder="Search"
                  className="pl-10 bg-background"
                />
              </div>
            </div>
          )}

          <div className="flex items-center gap-3">
            {showAuthButtons && (
              <>
                <Link to={!showHomeButton ? "/post-question" : "/home"}>
                  <Button variant="default">
                    {!showHomeButton ? "Ask a Question" : "Home"}
                  </Button>
                </Link>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <User className="h-5 w-5" />
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
