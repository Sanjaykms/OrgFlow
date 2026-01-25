import { ChevronUp, ChevronDown } from "lucide-react";

export const VoteButton = ({ votes, onUp, onDown }) => {
  return (
    <div className="flex flex-col items-center gap-1 bg-vote rounded-lg p-2">
      <button
        onClick={onUp}
        className="hover:bg-background rounded p-1"
      >
        <ChevronUp className="h-5 w-5" />
      </button>

      <span className="text-lg font-semibold text-vote-foreground">
        {votes}
      </span>

      <button
        onClick={onDown}
        className="hover:bg-background rounded p-1"
      >
        <ChevronDown className="h-5 w-5" />
      </button>
    </div>
  );
};
