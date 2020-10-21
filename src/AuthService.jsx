import React, { useState, useEffect } from "react";
import { auth } from "./config/firebese";

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 現在ログインしているユーザーを取得
    // ユーザーの切替を監視
    auth.onAuthStateChanged((dbUser) => {
      setUser(dbUser);
      if (dbUser == null) setLoading(false);
    });
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, setLoading }}>
      {children}
    </AuthContext.Provider>
  );
};
