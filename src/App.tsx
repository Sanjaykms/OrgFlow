import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Home from "./pages/Home";
import QuestionDetail from "./pages/QuestionDetail";
import NotFound from "./pages/NotFound";
import { PostQuestion } from "./pages/PostQuestion";
import UserContextProvider from "./data/userContext";
import { QuestionContextProvider } from "./data/questionsContext";
import AnswerContextProvider from "./data/answersContext";
import { SearchProvider } from "./data/searchContext";
import SearchResults from "./pages/SearchResults";
import AiChat from "./pages/AiChat";
import AuthContextProvider, { useAuthCxt } from "./data/authContext";
import RequireAuth from "./data/requireAuth";

const queryClient = new QueryClient();

// ---------------------------------------
// INTERNAL APP (runs inside all providers)
// ---------------------------------------
const AppContent = () => {
  const { userInfo, isLogged } = useAuthCxt();

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route
          element={<RequireAuth role={userInfo.userType} isLogged={isLogged} />}
        >
          <Route path="/home" element={<Home />} />
          <Route path="/question/:id" element={<QuestionDetail />} />
          <Route path="/post-question" element={<PostQuestion />} />
          <Route path="/search" element={<SearchResults />} />
          <Route path="/ai-chat" element={<AiChat />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

// ---------------------------------------
// MAIN APP
// ---------------------------------------
const App = () => {
  return (
    <AuthContextProvider>
      <SearchProvider>
        <AnswerContextProvider>
          <QuestionContextProvider>
            <UserContextProvider>
              <QueryClientProvider client={queryClient}>
                <TooltipProvider>
                  <Toaster />
                  <Sonner />
                  <AppContent />
                </TooltipProvider>
              </QueryClientProvider>
            </UserContextProvider>
          </QuestionContextProvider>
        </AnswerContextProvider>
      </SearchProvider>
    </AuthContextProvider>
  );
};

export default App;
