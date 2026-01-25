import { useEffect, useState, useMemo } from "react";
import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import { QuestionCard } from "@/components/QuestionCard";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useSearchParams } from "react-router-dom";
import { useQuestionCxt } from "@/data/questionsContext";

const Home = () => {
  const [selectedDepartment, setSelectedDepartment] = useState("My Questions");
  const [sortBy, setSortBy] = useState("most-viewed");
  const [searchParams, setSearchParams] = useSearchParams();

  const questions = useQuestionCxt().questionsList;

  // 1️⃣ Filter by department
  const filteredQuestions = useMemo(() => {
    if (selectedDepartment === "My Questions") return questions;

    return questions.filter((q) => q.department === selectedDepartment);
  }, [questions, selectedDepartment]);

  // 2️⃣ Apply sorting correctly
  const sortedQuestions = useMemo(() => {
    const sorted = [...filteredQuestions];

    switch (sortBy) {
      case "most-viewed":
        return sorted.sort((a, b) => b.views - a.views);

      case "most-voted":
        return sorted.sort((a, b) => b.votes - a.votes);

      case "newest":
        return sorted.sort(
          (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );

      case "oldest":
        return sorted.sort(
          (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        );

      default:
        return sorted;
    }
  }, [filteredQuestions, sortBy]);

  // 3️⃣ Update search params when sorting changes
  useEffect(() => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set("sortBy", sortBy);
    setSearchParams(newParams);
  }, [sortBy]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="flex max-w-7xl mx-auto">
        <Sidebar onDepartmentChange={setSelectedDepartment} />

        <main className="flex-1 p-6">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold text-foreground">Recent Questions</h1>

            <div className="flex items-center gap-3">
              <span className="text-sm text-muted-foreground">Sort By</span>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="most-viewed">Most Viewed</SelectItem>
                  <SelectItem value="newest">Newest</SelectItem>
                  <SelectItem value="oldest">Oldest</SelectItem>
                  <SelectItem value="most-voted">Most Voted</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* 4️⃣ Render sorted questions */}
          <div className="space-y-4">
            {sortedQuestions.map((question) => (
              <QuestionCard key={question.id} question={question} />
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Home;
