import { ChevronUp, ChevronDown } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface VoteButtonProps {
  initialVotes: number;
}

export const VoteButton = ({ initialVotes }: VoteButtonProps) => {
  const [votes, setVotes] = useState(initialVotes);
  const [userVote, setUserVote] = useState<"up" | "down" | null>(null);

  const handleUpvote = () => {
    if (userVote === "up") {
      setVotes(votes - 1);
      setUserVote(null);
    } else if (userVote === "down") {
      setVotes(votes + 2);
      setUserVote("up");
    } else {
      setVotes(votes + 1);
      setUserVote("up");
    }
  };

  const handleDownvote = () => {
    if (userVote === "down") {
      setVotes(votes + 1);
      setUserVote(null);
    } else if (userVote === "up") {
      setVotes(votes - 2);
      setUserVote("down");
    } else {
      setVotes(votes - 1);
      setUserVote("down");
    }
  };

  return (
    <div className="flex flex-col items-center gap-1 bg-vote rounded-lg p-2">
      <button
        onClick={handleUpvote}
        className={cn(
          "hover:bg-background rounded p-1",
          userVote === "up" && "text-primary"
        )}
      >
        <ChevronUp className="h-5 w-5" />
      </button>
      <span className="text-lg font-semibold text-vote-foreground">{votes}</span>
      <button
        onClick={handleDownvote}
        className={cn(
          "hover:bg-background rounded p-1",
          userVote === "down" && "text-destructive"
        )}
      >
        <ChevronDown className="h-5 w-5" />
      </button>
    </div>
  );
};
