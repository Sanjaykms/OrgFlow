import React, { createContext, useReducer, useContext, useEffect } from "react";
import { Answer } from "@/data/mockData"; // adjust path if needed
import { mockAnswers } from "@/data/mockData"; // your mock data

// ----------------------
// Context Shape
// ----------------------
interface AnswerContextType {
  answersList: Record<string, Answer[]>;
  answerDispatch: React.Dispatch<AnswerAction>;
}

// ----------------------
// Initial Value
// ----------------------
const AnswerContext = createContext<AnswerContextType>({
  answersList: {},
  answerDispatch: () => {},
});

// ----------------------
// Actions
// ----------------------
type AnswerAction =
  | { type: "GET_ANSWERS"; value: Record<string, Answer[]> }
  | { type: "ADD_ANSWER"; questionId: string; value: Answer }
  | { type: "EDIT_ANSWER"; questionId: string; value: Answer }
  | { type: "DELETE_ANSWER"; questionId: string; answerId: string }
  | { type: "ADD_REPLY"; questionId: string; answerId: string; reply: any }
  | { type: "EDIT_REPLY"; questionId: string; answerId: string; reply: any }
  | { type: "DELETE_REPLY"; questionId: string; answerId: string; replyId: string }
  | { type: "VOTE_ANSWER_UP"; questionId: string; answerId: string }
  | { type: "VOTE_ANSWER_DOWN"; questionId: string; answerId: string };


// ----------------------
// Reducer
// ----------------------
const answerReducer = (
  state: Record<string, Answer[]>,
  action: AnswerAction
): Record<string, Answer[]> => {
  switch (action.type) {
    case "GET_ANSWERS":
      return { ...action.value };

    case "ADD_ANSWER": {
      const prev = state[action.questionId] || [];
      return { ...state, [action.questionId]: [...prev, action.value] };
    }

    case "EDIT_ANSWER": {
      const prev = state[action.questionId] || [];
      return {
        ...state,
        [action.questionId]: prev.map((a) =>
          a.id === action.value.id ? action.value : a
        ),
      };
    }

    case "DELETE_ANSWER": {
      const prev = state[action.questionId] || [];
      return {
        ...state,
        [action.questionId]: prev.filter((a) => a.id !== action.answerId),
      };
    }

    // -----------------------------
    // NEW: ADD REPLY (COMMENT)
    // -----------------------------
    case "ADD_REPLY": {
      const prevAnswers = state[action.questionId] || [];
      const updated = prevAnswers.map((ans) =>
        ans.id === action.answerId
          ? { ...ans, replies: [...(ans.replies || []), action.reply] }
          : ans
      );
      return { ...state, [action.questionId]: updated };
    }

    // -----------------------------
    // NEW: EDIT REPLY
    // -----------------------------
    case "EDIT_REPLY": {
      const prevAnswers = state[action.questionId] || [];
      const updated = prevAnswers.map((ans) =>
        ans.id === action.answerId
          ? {
              ...ans,
              replies: ans.replies?.map((r) =>
                r.id === action.reply.id ? action.reply : r
              ),
            }
          : ans
      );
      return { ...state, [action.questionId]: updated };
    }

    // -----------------------------
    // NEW: DELETE REPLY
    // -----------------------------
    case "DELETE_REPLY": {
      const prevAnswers = state[action.questionId] || [];
      const updated = prevAnswers.map((ans) =>
        ans.id === action.answerId
          ? {
              ...ans,
              replies: ans.replies?.filter(
                (r) => r.id !== action.replyId
              ),
            }
          : ans
      );
      return { ...state, [action.questionId]: updated };
    }

     case "VOTE_ANSWER_UP": {
      const prevAnswers = state[action.questionId] || [];
      const updated = prevAnswers.map((ans) =>
        ans.id === action.answerId
          ? { ...ans, votes: (ans.votes || 0) + 1 }
          : ans
      );
      return { ...state, [action.questionId]: updated };
    }

    // -----------------------------
    // ★ NEW: VOTE DOWN
    // -----------------------------
    case "VOTE_ANSWER_DOWN": {
      const prevAnswers = state[action.questionId] || [];
      const updated = prevAnswers.map((ans) =>
        ans.id === action.answerId
          ? { ...ans, votes: (ans.votes || 0) - 1 }
          : ans
      );
      return { ...state, [action.questionId]: updated };
    }


    default:
      return state;
  }
};

// ----------------------
// Provider
// ----------------------
export const AnswerContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [answersList, answerDispatch] = useReducer(answerReducer, {});

  // Load mock answers initially
  useEffect(() => {
    answerDispatch({ type: "GET_ANSWERS", value: mockAnswers });
  }, []);

  return (
    <AnswerContext.Provider value={{ answersList, answerDispatch }}>
      {children}
    </AnswerContext.Provider>
  );
};

// ----------------------
// Hook
// ----------------------
export const useAnswerCxt = () => useContext(AnswerContext);

export default AnswerContextProvider;
