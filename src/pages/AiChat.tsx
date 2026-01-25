import { useEffect, useState } from "react";
import { Header } from "@/components/Header";
import { useSearchCxt } from "@/data/searchContext";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { main } from "@/lib/geminiApi";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeSanitize from "rehype-sanitize";

const AiChat = () => {
  const { geminiChat, loading, results } = useSearchCxt();

  const [messages, setMessages] = useState<
    { role: "user" | "ai"; content: string }[]
  >([]);
  const [isloading, setIsLoading] = useState<boolean>(false);

  const [input, setInput] = useState("");
  console.log(messages);
  // Load selected message from Header
  useEffect(() => {
    const saved = localStorage.getItem("gemini_prompt");
    if (saved) {
      setMessages([{ role: "user", content: saved }]);

      // Call Gemini
      geminiChat(saved);
    }
    return () => {
      setMessages([]);
    };
  }, []);

  // Listen for Gemini returned result
  // useEffect(() => {
  //   const last = results.find((r) => r.source === "gemini");
  //   if (last) {
  //     setMessages((prev) => [...prev, { role: "ai", content: last.content }]);
  //   }
  // }, [results]);

  const sendMessage = async () => {
    setIsLoading(true);
    if (!input.trim()) return;

    setMessages((prev) => [...prev, { role: "user", content: input }]);
    console.log("Input:", input);
    setInput("");
    const res = await main(input);
    setMessages((prev) => [...prev, { role: "ai", content: res.text }]);
    // geminiChat(input);
    setIsLoading(false);
  };

  useEffect(() => {
    if (
      !localStorage.getItem("gemini_prompt") ||
      localStorage.getItem("gemini_prompt").length === 0
    )
      setMessages([]);
  }, []);
  return (
    <div className="min-h-screen bg-background">
      <Header showSearchButton={false} />

      <div className="max-w-3xl mx-auto p-6 space-y-4">
        <h1 className="text-2xl font-bold mb-4">AI Chat</h1>

        {messages.length > 0 && (
          <div className="bg-card border rounded-lg p-4 space-y-4 max-h-[70vh] overflow-auto">
            {messages.map((m, index) => (
              <div
                key={index}
                className={`${
                  m.content.length === 0 ? "null" : "p-3 rounded-lg"
                } ${
                  m.role === "user"
                    ? "bg-primary text-primary-foreground ml-auto w-fit"
                    : "bg-muted w-fit"
                }
              `}
              >
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  rehypePlugins={[rehypeSanitize]}
                >
                  {m.content}
                </ReactMarkdown>
              </div>
            ))}
            {isloading && (
              <p className="italic text-muted-foreground">
                finding the best answer...
              </p>
            )}
          </div>
        )}

        {/* INPUT */}
        <div className="flex gap-2">
          <Textarea
            placeholder="Ask something..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="min-h-[60px]"
          />

          <Button className="h-fit" onClick={sendMessage}>
            Send
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AiChat;
 