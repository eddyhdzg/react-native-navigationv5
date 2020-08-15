import React, { createContext, useState } from "react";
import { AsyncStorage } from "react-native";

export const AuthContext = createContext<{
  user: User;
  login: () => void;
  logout: () => void;
}>({
  user: null,
  login: () => {},
  logout: () => {},
});

interface IAuthProviderProps {}

type User = null | { username: string };

const AuthProvider: React.FC<IAuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User>(null);

  return (
    <AuthContext.Provider
      value={{
        user,
        login: () => {
          const fakeUser = { username: "bob" };
          setUser(fakeUser);
          AsyncStorage.setItem("user", JSON.stringify(fakeUser));
        },
        logout: () => {
          AsyncStorage.removeItem("user");
          setUser(null);
        },
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
