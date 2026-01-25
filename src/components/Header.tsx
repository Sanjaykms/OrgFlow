import { useEffect, useRef, useState } from "react";
import { Search, User } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Link, useNavigate } from "react-router-dom";
import { useSearchCxt } from "@/data/searchContext";
import { useAuthCxt } from "@/data/authContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

interface HeaderProps {
  showAuthButtons?: boolean;
  showSearchButton?: boolean;
  showHomeButton?: boolean;
}
const typingDelay = 500;

export const Header = ({
  showAuthButtons = true,
  showSearchButton = true,
  showHomeButton = false,
}: HeaderProps) => {
  const { results, search, geminiChat, loading } = useSearchCxt();
  const authCxt = useAuthCxt();
  const [query, setQuery] = useState("");
  const [showResults, setShowResults] = useState(false);

  const navigate = useNavigate();

  const typingTimeout = useRef<NodeJS.Timeout | null>(null);

  // Debounced Gemini call


  return (
    <header className="bg-card border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">

          {/* LOGO */}
          <Link to="/home" className="flex items-center gap-2">
            <div className="relative w-10 h-10">
              <div className="absolute inset-0 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground text-xl font-bold">
                  ?
                </span>
              </div>
              <div className="absolute bottom-0 right-0 w-4 h-4 bg-[#FF6B35] rounded-full"></div>
            </div>
            <span className="text-xl font-bold text-foreground">Work Hacks Hub</span>
          </Link>

          {/* SEARCH BAR */}
          <div className="relative flex-1 max-w-md mx-8">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />

            <Input
              type="text"
              placeholder="Search"
              className="pl-10"
              value={query}
              onChange={(e) => {
                const v = e.target.value;
                setQuery(v);
                setShowResults(v.length > 0);

                search(v);       // instant
                geminiChat(v);   // debounced (only once)
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") navigate("/search");
              }}
            />

            {/* SEARCH RESULTS */}
            {showResults && (
              <div className="absolute mt-2 w-full bg-background border rounded-lg shadow-xl p-4 z-50" style={{maxHeight:"300px",overflow:"auto"}}>
                <div className="grid grid-cols-3 gap-4">

                  {/* LOCAL */}
                  <div>
                    <h3 className="font-semibold mb-2">Local Questions</h3>
                    {results.filter(r => r.source === "local").map((q) => (
                      <Link
                        key={q.id}
                        to={`/question/${q.id}`}
                        className="block p-2 hover:bg-muted rounded"
                      >
                        {q.title}
                      </Link>
                    ))}
                  </div>

                  {/* STACK */}
                  <div>
                    <h3 className="font-semibold mb-2">StackOverflow</h3>
                    {results.filter(r => r.source === "stack").map((s) => (
                      <a
                        key={s.id}
                        href={s.link}
                        target="_blank"
                        className="block p-2 hover:bg-muted rounded"
                      >
                        {s.title}
                      </a>
                    ))}
                  </div>

                 {/* GEMINI */}
                  <div>
                    <h3 className="font-semibold mb-2">Gemini Chat</h3>
                    {results
                      .filter(r => r.source === "gemini")
                      .map((g) => (
                        <div
                          key={g.id}
                          className="p-2 bg-muted rounded text-sm cursor-pointer hover:bg-muted/80"
                          onClick={() => {
                            // Save selected chat prompt
                            localStorage.setItem("gemini_prompt", g.content);
                            navigate("/ai-chat");
                          }}
                        >
                          {g.content}
                        </div>
                      ))}
                  </div>

                </div>

                {loading && (
                  <p className="mt-3 text-sm text-muted-foreground italic">
                    Thinking…
                  </p>
                )}
              </div>
            )}
          </div>
         <div className="flex items-center gap-3">
  {showAuthButtons && (
    <>
      <Link to={!showHomeButton ? "/post-question" : "/home"}>
        <Button variant="default">
          {!showHomeButton ? "Ask a Question" : "Home"}
        </Button>
      </Link>

      {/* USER DROPDOWN */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="rounded-full">
            <Button
            variant="ghost"
            size="icon"
            className="rounded-full bg-[#2094f3] hover:bg-blue-400"
          >
            <User className="h-5 w-5 text-white" />
          </Button>


          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent className="w-48">
          <DropdownMenuLabel>
            {authCxt.userInfo.userId
              ? `User: ${authCxt.userInfo.userId}`
              : "My Account"}
          </DropdownMenuLabel>

          <DropdownMenuSeparator />

          <DropdownMenuItem asChild className="hover:bg-blue-400">
            <button
              className="w-full text-left"
              onClick={() => authCxt.logoutHandler()}
            >
              Logout
            </button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )}
</div>


        </div>
      </div>
    </header>
  );
};
