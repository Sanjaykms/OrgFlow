import { Question } from "@/data/mockData";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Link } from "react-router-dom";

interface QuestionCardProps {
  question: Question;
}

export const QuestionCard = ({ question }: QuestionCardProps) => {
  return (
    <Link to={`/question/${question.id}`}>
      <div className="bg-card border border-border rounded-lg p-4 hover:shadow-md transition-shadow">
        <div className="flex gap-4">
          <Avatar className="h-12 w-12">
            <AvatarImage src={question.author.avatar} alt={question.author.name} />
            <AvatarFallback>{question.author.name[0]}</AvatarFallback>
          </Avatar>
          
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-foreground hover:text-primary mb-2">
              {question.title}
            </h3>
            <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
              <span>{question.author.name}</span>
              <span>{question.createdAt}</span>
            </div>
            <div className="flex items-center gap-2">
              {question.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="bg-tag text-tag-foreground">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};
