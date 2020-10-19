import React, { useState, useEffect } from "react";
import { auth } from "./config/firebese";

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // 現在ログインしているユーザーを取得
    // ユーザーの切替を監視
    auth.onAuthStateChanged((user) => {
      setUser(user);
    });
  }, []);

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
};
