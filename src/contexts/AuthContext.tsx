import { createContext, Dispatch, SetStateAction } from "react";

export type User = {
  isLoggedIn: boolean;
  userId: string | null;
  email: string | null;
};

export interface UserContextInterface {
  user: User;
  setUser: Dispatch<SetStateAction<User>>;
}

//  Auth Context

const defaultState = {
  user: {
    isLoggedIn: false,
    userId: null,
    email: null,
  },
  setUser: (user: User) => {},
} as UserContextInterface;

export const AuthContext = createContext<UserContextInterface>(defaultState);
