import React from "react";

interface CurrentUserContextProps {
  currentUser: User | null;
  setCurrentUser: React.Dispatch<React.SetStateAction<User | null>>;
}

interface User {
  _id: string;
  email: string;
  avatar: {
    url: string;
    localPath: string;
    _id: string;
  };
  createdAt: string;
  isEmailVerified: boolean;
  loginType: "EMAIL_PASSWORD" | "GOOGLE" | "GITHUB";
  role: "ADMIN" | "USER";
  updatedAt: string;
  username: string;
  __v: number;
}

const CurrentUserContext = React.createContext<CurrentUserContextProps>({
  currentUser: null,
  setCurrentUser: () => null,
});

export function UserProvider({ children }: React.PropsWithChildren) {
  const [currentUser, setCurrentUser] = React.useState<User | null>(null);

  return (
    <CurrentUserContext.Provider value={{ currentUser, setCurrentUser }}>
      {children}
    </CurrentUserContext.Provider>
  );
}

export function useCurrentUserContext() {
  const context = React.useContext(CurrentUserContext);
  if (!context) {
    throw new Error("Context not found!");
  }
  return context;
}
