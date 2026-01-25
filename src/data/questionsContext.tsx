import React, {
  createContext,
  useReducer,
  useContext,
  useEffect,
  ReactNode,
} from "react";
import { mockQuestions } from "./mockData"; // or correct path
import { User } from "./mockData";

// ------------------------------------------------------
// QUESTION INTERFACE
// ------------------------------------------------------
export interface Question {
  id: string;
  title: string;
  content: string;
  author: User;
  votes: number;
  answers: number;
  views: number;
  tags: string[];
  createdAt: string;
  department: string;
}

// ------------------------------------------------------
// ACTION TYPES
// ------------------------------------------------------
type QuestionAction =
  | { type: "GET_QUESTIONS"; value: Question[] }
  | { type: "ADD_QUESTION"; value: Question }
  | { type: "EDIT_QUESTION"; value: Question }
  | { type: "DELETE_QUESTION"; value: string }
  | { type: "VOTE_QUESTION_UP"; questionId: string }
| { type: "VOTE_QUESTION_DOWN"; questionId: string };

// ------------------------------------------------------
// CONTEXT TYPE
// ------------------------------------------------------
interface QuestionContextType {
  questionsList: Question[];
  questionDispatchFn: React.Dispatch<QuestionAction>;
}

// ------------------------------------------------------
// DEFAULT CONTEXT
// ------------------------------------------------------
const QuestionContext = createContext<QuestionContextType>({
  questionsList: mockQuestions,
  questionDispatchFn: () => {},
});

// ------------------------------------------------------
// REDUCER
// ------------------------------------------------------
const questionReducer = (
  state: Question[],
  action: QuestionAction
): Question[] => {
  switch (action.type) {
    case "GET_QUESTIONS":
      return [...action.value];

    case "ADD_QUESTION":
      
      return [...state, action.value];

    case "EDIT_QUESTION":
      
      return state.map((q) =>
        q.id === action.value.id ? action.value : q
      );

    case "DELETE_QUESTION":
      
      return state.filter((q) => q.id !== action.value);

    case "VOTE_QUESTION_UP": {
      return state.map((q) =>
        q.id === action.questionId
          ? { ...q, votes: (q.votes || 0) + 1 }
          : q
      );
    }

    // ----------------------------------------------------
    // ★ NEW: Vote Down (-1)
    // ----------------------------------------------------
    case "VOTE_QUESTION_DOWN": {
      return state.map((q) =>
        q.id === action.questionId
          ? { ...q, votes: (q.votes || 0) - 1 }
          : q
      );
    }
    default:
      return state;
  }
};

// ------------------------------------------------------
// PROVIDER
// ------------------------------------------------------
interface ProviderProps {
  children: ReactNode;
}

export const QuestionContextProvider: React.FC<ProviderProps> = ({
  children,
}) => {

  const [questionsList, questionDispatchFn] = useReducer(questionReducer, []);
  
    useEffect(() => {
      questionDispatchFn({ type: "GET_QUESTIONS", value: mockQuestions });
    }, []);

  


  return (
    <QuestionContext.Provider value={{ questionsList, questionDispatchFn }}>
      {children}
    </QuestionContext.Provider>
  );
};

// ------------------------------------------------------
// CUSTOM HOOK
// ------------------------------------------------------
export const useQuestionCxt = () => useContext(QuestionContext);
