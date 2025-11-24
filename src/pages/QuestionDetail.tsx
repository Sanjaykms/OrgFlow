import { useParams } from "react-router-dom";
import { Header } from "@/components/Header";
import { VoteButton } from "@/components/VoteButton";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { mockQuestions, mockAnswers } from "@/data/mockData";

const QuestionDetail = () => {
  const { id } = useParams();
  const question = mockQuestions.find(q => q.id === id);
  const answers = mockAnswers[id || "1"] || [];

  if (!question) {
    return <div>Question not found</div>;
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-card rounded-lg border border-border p-6 mb-6">
          <div className="flex gap-4">
            <div className="flex flex-col items-center gap-4">
              <Avatar className="h-20 w-20">
                <AvatarImage src={question.author.avatar} alt={question.author.name} />
                <AvatarFallback>{question.author.name[0]}</AvatarFallback>
              </Avatar>
              <VoteButton initialVotes={question.votes} />
            </div>
            
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-foreground mb-4">
                {question.title}
              </h1>
              <p className="text-foreground mb-4 leading-relaxed">
                {question.content}
              </p>
              <div className="flex items-center gap-3 text-sm text-muted-foreground mb-4">
                <span className="font-medium text-foreground">Asked by {question.author.name}</span>
                <span>•</span>
                <span>on {question.createdAt}</span>
              </div>
              <div className="flex gap-2">
                {question.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="bg-tag text-tag-foreground">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-foreground mb-4">Answers</h2>
        
        <div className="space-y-4 mb-8">
          {answers.map((answer) => (
            <div key={answer.id} className="bg-card rounded-lg border border-border p-6">
              <div className="flex gap-4">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={answer.author.avatar} alt={answer.author.name} />
                  <AvatarFallback>{answer.author.name[0]}</AvatarFallback>
                </Avatar>
                
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3 text-sm">
                      <span className="font-semibold text-foreground">{answer.author.name}</span>
                      <span className="text-muted-foreground">{answer.createdAt}</span>
                    </div>
                    <VoteButton initialVotes={answer.votes} />
                  </div>
                  <p className="text-foreground leading-relaxed">{answer.content}</p>
                  <div className="mt-4">
                    <button className="text-sm text-muted-foreground hover:text-foreground">
                      Comments
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-card rounded-lg border border-border p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Post Your Answer</h3>
          <Textarea 
            placeholder="Write your answer here..."
            className="min-h-[150px] mb-4"
          />
          <Button className="w-full">Post Your Answer</Button>
        </div>
      </div>
    </div>
  );
};

export default QuestionDetail;
