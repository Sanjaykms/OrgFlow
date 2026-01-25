import { useParams } from "react-router-dom";
import { Header } from "@/components/Header";
import { VoteButton } from "@/components/VoteButton";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useQuestionCxt } from "@/data/questionsContext";
import { useAnswerCxt } from "@/data/answersContext";
import { useUserCxt } from "@/data/userContext";
import { useEffect, useState } from "react";
import { useAuthCxt } from "@/data/authContext";
import { main } from "@/lib/geminiApi";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeSanitize from "rehype-sanitize"
const QuestionDetail = () => {
  const { id } = useParams();

  const question = useQuestionCxt().questionsList.find((q) => q.id === id);
  const { answersList, answerDispatch } = useAnswerCxt();
  const { questionDispatchFn } = useQuestionCxt();
  const loggedUser = useUserCxt().usersList[0];

  const answers = answersList[id || "1"] || [];

  const [newReply, setNewReply] = useState<{ [key: string]: string }>({});
  const [openReplies, setOpenReplies] = useState<{ [key: string]: boolean }>(
    {}
  );
  const [newAnswer, setNewAnswer] = useState("");

 const authCxt = useAuthCxt();
  const userList = useUserCxt();
  const toggleReplies = (answerId: string) => {
    setOpenReplies((prev) => ({
      ...prev,
      [answerId]: !prev[answerId],
    }));
  };
  const [text, setText] = useState("");
  const handleResponse = async () => {
    const response = await main(question?.content || "");
    setText(response?.text);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const renderBlocks = (blocks: any[]) =>
    blocks.map((block, idx) => {
      if (block.type === "heading") {
        const Tag = `h${block.level}` as keyof JSX.IntrinsicElements;
        return (
          <Tag key={idx} className="font-bold mb-2">
            {block.text}
          </Tag>
        );
      }
      if (block.type === "list") {
        return (
          <ul key={idx} className="list-disc ml-6 mb-2">
            {block.items.map((item: string, i: number) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        );
      }
      if (block.type === "olist") {
        return (
          <ol key={idx} className="list-decimal ml-6 mb-2">
            {block.items.map((item: string, i: number) => (
              <li key={i}>{item}</li>
            ))}
          </ol>
        );
      }
      // Paragraph
      return (
        <p key={idx} className="mb-2">
          {block.text}
        </p>
      );
    });

  const addReply = (answerId: string) => {
    const text = newReply[answerId]?.trim();
    if (!text) return;

var tempUser = {
        ...userList.usersList.find((user) => {
          return authCxt.userInfo.userId === user.id;
        }),
      };


    const reply = {
      id: crypto.randomUUID(),
      content: text,
      createdAt: new Date().toISOString().slice(0, 10),
      author: {
        id: tempUser.id,
        name: tempUser.name,
        avatar: tempUser.avatar,
      },
    };

    answerDispatch({
      type: "ADD_REPLY",
      questionId: id!,
      answerId,
      reply,
    });

    setNewReply((prev) => ({ ...prev, [answerId]: "" }));
  };

  /* ---------------- POST NEW ANSWER ---------------- */
  const postAnswer = () => {
    if (!newAnswer.trim()) return;

var tempUser = {
        ...userList.usersList.find((user) => {
          return authCxt.userInfo.userId === user.id;
        }),
      };

    const answer = {
      id: crypto.randomUUID(),
      content: newAnswer,
      createdAt: new Date().toISOString().slice(0, 10),
      votes: 0,
      author: {
        id: tempUser.id,
        name: tempUser.name,
        avatar: tempUser.avatar,
        department: tempUser.department
      },
      replies: [],
    };

    answerDispatch({
      type: "ADD_ANSWER",
      questionId: id!,
      value: answer,
    });

    setNewAnswer("");
  };

  useEffect(() => {
    handleResponse();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!question) return <div>Question not found</div>;

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="max-w-4xl mx-auto p-6">
        {/* -------------------- QUESTION ---------------------- */}
        <div className="bg-card rounded-lg border border-border p-6 mb-6">
          <div className="flex gap-4">
            <div className="flex flex-col items-center gap-4">
              <Avatar className="h-20 w-20">
                <AvatarImage src={question.author.avatar} />
                <AvatarFallback>{question.author.name[0]}</AvatarFallback>
              </Avatar>

              <VoteButton
                votes={question.votes}
                onUp={() =>
                  questionDispatchFn({
                    type: "VOTE_QUESTION_UP",
                    questionId: question.id,
                  })
                }
                onDown={() =>
                  questionDispatchFn({
                    type: "VOTE_QUESTION_DOWN",
                    questionId: question.id,
                  })
                }
              />
            </div>

            <div className="flex-1">
              <h1 className="text-3xl font-bold mb-4">{question.title}</h1>

              <p className="mb-4">{question.content}</p>

              <div className="flex items-center gap-3 text-sm text-muted-foreground mb-4">
                <span className="font-medium">
                  Asked by {question.author.name}
                </span>
                <span>•</span>
                <span>on {question.createdAt}</span>
              </div>

              <div className="flex gap-2">
                {question.tags.map((tag) => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ---------------------- ANSWERS ----------------------- */}
        <h2 className="text-2xl font-bold mb-4">Answers</h2>

        <div className="space-y-4 mb-8">
          <h1>AI response</h1>
          <div
            className="bg-card rounded-lg border border-border p-6 text-justify mb-2 leading-relaxed text-sm text-gray-700 text-wrap"
            style={{ backgroundColor: "aliceblue" }}
          >
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeSanitize]}
            >
              {text}
            </ReactMarkdown>
          </div>
          {answers.map((answer) => (
            <div
              key={answer.id}
              className="bg-card rounded-lg border border-border p-6"
            >
              <div className="flex gap-4">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={answer.author.avatar} />
                  <AvatarFallback>{answer.author.name[0]}</AvatarFallback>
                </Avatar>

                <div className="flex-1">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3 text-sm">
                      <span className="font-semibold">
                        {answer.author.name}
                      </span>
                      <span className="text-muted-foreground">
                        {answer.createdAt}
                      </span>
                    </div>
                    <VoteButton
                      votes={answer.votes}
                      onUp={() =>
                        answerDispatch({
                          type: "VOTE_ANSWER_UP",
                          questionId: id!,
                          answerId: answer.id,
                        })
                      }
                      onDown={() =>
                        answerDispatch({
                          type: "VOTE_ANSWER_DOWN",
                          questionId: id!,
                          answerId: answer.id,
                        })
                      }
                    />
                  </div>

                  <p>{answer.content}</p>

                  {/* ---- REPLIES BUTTON ---- */}
                  <div className="mt-4">
                    <button
                      className="text-sm text-muted-foreground hover:text-foreground"
                      onClick={() => toggleReplies(answer.id)}
                    >
                      {openReplies[answer.id]
                        ? `Hide Comments (${answer.replies?.length || 0})`
                        : `Comments (${answer.replies?.length || 0})`}
                    </button>
                  </div>

                  {/* ---- REPLIES LIST ---- */}
                  {openReplies[answer.id] && (
                    <div className="mt-4 pl-6 border-l border-border space-y-4">
                      {(answer.replies || []).map((r) => (
                        <div
                          key={r.id}
                          className="bg-muted p-2 rounded-md text-sm"
                        >
                          <div className="flex items-center gap-2 mb-1">
                            <Avatar className="h-6 w-6">
                              <AvatarImage src={r.author.avatar} />
                              <AvatarFallback>
                                {r.author.name[0]}
                              </AvatarFallback>
                            </Avatar>
                            <span className="font-medium">{r.author.name}</span>
                            <span className="text-xs text-muted-foreground">
                              {r.createdAt}
                            </span>
                          </div>
                          <div className="text-foreground ml-8">
                            {r.content}
                          </div>
                        </div>
                      ))}

                      {/* ---- ADD REPLY ---- */}
                      <Textarea
                        placeholder="Write a comment..."
                        value={newReply[answer.id] || ""}
                        onChange={(e) =>
                          setNewReply((prev) => ({
                            ...prev,
                            [answer.id]: e.target.value,
                          }))
                        }
                        className="min-h-[70px]"
                      />

                      <Button
                        className="w-full"
                        onClick={() => addReply(answer.id)}
                      >
                        Add Comment
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ------------------ POST ANSWER ------------------ */}
        <div className="bg-card rounded-lg border border-border p-6">
          <h3 className="text-lg font-semibold mb-4">Post Your Answer</h3>

          <Textarea
            placeholder="Write your answer here..."
            value={newAnswer}
            onChange={(e) => setNewAnswer(e.target.value)}
            className="min-h-[150px] mb-4"
          />

          <Button className="w-full" onClick={postAnswer}>
            Post Your Answer
          </Button>
        </div>
      </div>
    </div>
  );
};

export default QuestionDetail;
