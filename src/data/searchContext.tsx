import { createContext, useContext, useRef, useState } from "react";
import { GoogleGenAI } from "@google/genai";
import { useQuestionCxt } from "./questionsContext";

interface SearchResult {
  id: string;
  title: string;
  source: "local" | "stack" | "gemini";
  content: string;
  link?: string;
}

interface SearchContextType {
  results: SearchResult[];
  loading: boolean;
  query: string;
  search: (query: string) => Promise<void>;
  geminiChat: (query: string) => Promise<void>;
}

const SearchContext = createContext<SearchContextType | null>(null);

export const SearchProvider = ({ children }: { children: React.ReactNode }) => {
  const { questionsList } = useQuestionCxt(); // FIXED: must be outside functions

  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");

  // -----------------------------------------
  // 1️⃣ LOCAL DATABASE SEARCH
  // -----------------------------------------
  async function searchLocal(text: string) {
    console.log(questionsList);
    return questionsList
      .filter(
        (q) =>
          q.title.toLowerCase().includes(text.toLowerCase()) ||
          q.content.toLowerCase().includes(text.toLowerCase())
      )
      .map((q) => ({
        id: q.id,
        title: q.title,
        content: q.content,
        source: "local" as const,
      }));
  }

  // -----------------------------------------
  // 2️⃣ STACKOVERFLOW SEARCH
  // -----------------------------------------
  async function searchStack(text: string) {
    const url = `https://api.stackexchange.com/2.3/search/advanced?order=desc&sort=relevance&q=${text}&site=stackoverflow`;

    const res = await fetch(url);
    const data = await res.json();

    return (data.items || []).map((d: any) => ({
      id: d.question_id.toString(),
      title: d.title,
      content: "",
      link: d.link,
      source: "stack" as const,
    }));
  }

  // -----------------------------------------
  // 3️⃣ GEMINI CHAT (Persistent AI Thread)
  // -----------------------------------------

  const ai = new GoogleGenAI({ apiKey: "KEY" });

  // async function geminiChat(text: string) {
  //   const response = await ai.models.generateContent({
  //     model: "gemini-2.5-flash",
  //     contents: text,
  //   });

  //   const answer = response.text;
  //   // console.log(answer)
  //   setResults((prev) => [
  //     ...prev,
  //     {
  //       id: crypto.randomUUID(),
  //       title: "Gemini AI",
  //       content: answer,
  //       source: "gemini",
  //     },
  //   ]);
  // }


  const typingRef = useRef<NodeJS.Timeout | null>(null);

async function geminiChat(text: string) {
  if (typingRef.current) clearTimeout(typingRef.current);

  typingRef.current = setTimeout(async () => {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: text,
    });

    const answer = response.text;

    setResults(prev => [
      ...prev,
      {
        id: crypto.randomUUID(),
        title: "Gemini AI",
        content: answer,
        source: "gemini",
      },
    ]);
  }, 600); // ← delay
}


  // -----------------------------------------
  // 4️⃣ MASTER SEARCH (LOCAL + STACKOVERFLOW + OPTIONAL GEMINI)
  // -----------------------------------------
  async function search(text: string) {
    setQuery(text);
    setLoading(true);

    const [local, stack] = await Promise.all([
      searchLocal(text),
      searchStack(text),
    ]);

    setResults([...local, ...stack]);
    setLoading(false);
  }

  return (
    <SearchContext.Provider
      value={{
        results,
        loading,
        query,
        search,
        geminiChat,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export const useSearchCxt = () =>
  useContext(SearchContext) as SearchContextType;
