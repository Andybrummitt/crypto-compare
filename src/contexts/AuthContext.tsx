import { createContext, Dispatch, SetStateAction, useState } from "react";

export type User = {
  isLoggedIn: boolean;
  userId: string | null;
};

export interface UserContextInterface {
  user: User;
  setUser: Dispatch<SetStateAction<User>>;
}

//  Auth Context

const defaultState = {
  user: {
    isLoggedIn: false,
    userId: "",
  },
  setUser: (user: User) => {},
} as UserContextInterface;

export const AuthContext = createContext<UserContextInterface>(defaultState);

//  Auth Provider Component

type AuthProviderProps = {
  children: React.ReactNode;
};

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User>({ isLoggedIn: false, userId: "" });

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
