import React, {
  createContext,
  useReducer,
  useContext,
  useEffect,
  ReactNode,
} from "react";
import { mockUsers } from "./mockData";

// ------------------------------------------------------
// USER INTERFACE
// ------------------------------------------------------
export interface User {
  id: string;
  name: string;
  avatar: string;
  department: string;
  email: string;
  password: string;  // NOTE: only for mock data
  role: "admin" | "moderator" | "user";
}

// ------------------------------------------------------
// ACTION TYPES
// ------------------------------------------------------
type UserAction =
  | { type: "GET_USERS"; value: User[] }
  | { type: "ADD_USER"; value: User }
  | { type: "EDIT_USER"; value: User }
  | { type: "DELETE_USER"; value: string };

// ------------------------------------------------------
// CONTEXT TYPE
// ------------------------------------------------------
interface UserContextType {
  usersList: User[];
  userDispatchFn: React.Dispatch<UserAction>;
}

// ------------------------------------------------------
// DEFAULT CONTEXT
// ------------------------------------------------------
const UserContext = createContext<UserContextType>({
  usersList: [],
  userDispatchFn: () => {},
});

// ------------------------------------------------------
// REDUCER
// ------------------------------------------------------
const userReducer = (state: User[], action: UserAction): User[] => {
  let updatedArray: User[];

  switch (action.type) {
    case "GET_USERS":
      return [...action.value];

    case "ADD_USER":
      return [...state, action.value];

    case "EDIT_USER":
      return state.map((user) =>
        user.id === action.value.id ? action.value : user
      );

    case "DELETE_USER":
      return state.filter((user) => user.id !== action.value);

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

const UserContextProvider: React.FC<ProviderProps> = ({ children }) => {



  const [usersList, userDispatchFn] = useReducer(userReducer, []);

    useEffect(() => {
        userDispatchFn({ type: "GET_USERS", value: mockUsers });
      }, []);

 
  return (
    <UserContext.Provider value={{ usersList, userDispatchFn }}>
      {children}
    </UserContext.Provider>
  );
};

// ------------------------------------------------------
// CUSTOM HOOK
// ------------------------------------------------------
export const useUserCxt = () => useContext(UserContext);

export default UserContextProvider;
