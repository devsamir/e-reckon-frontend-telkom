import { createContext, useEffect, useState, useCallback } from "react";
import { useCookies } from "react-cookie";

import { notification } from "antd";
import ApiCall from "src/services/ApiCall";

const AuthContext = createContext<any>(null);

const AuthProvider = ({ children }) => {
  const [cookies, _setCookies, removeCookie] = useCookies();
  const [initialLoading, setInitialLoading] = useState(true);
  const [isLogin, setIsLogin] = useState(false);
  const [user, setUser] = useState(null);

  const checkIsLogin = useCallback(async () => {
    try {
      setInitialLoading(true);
      const res = await ApiCall.get("/user/me", {
        headers: { token: cookies["token"] },
      });
      setUser(res.data);
      setIsLogin(true);
    } catch (err) {
    } finally {
      setInitialLoading(false);
    }
  }, [cookies]);

  const logout = useCallback(async () => {
    try {
      removeCookie("token", { path: "/" });
      setIsLogin(false);
      setUser(null);
    } catch (err) {
      notification.error({ message: err.message });
    }
  }, [removeCookie]);

  useEffect(() => {
    checkIsLogin();
  }, [checkIsLogin]);

  return (
    <AuthContext.Provider
      value={{
        token: cookies["token"],
        initialLoading,
        isLogin,
        user,
        setIsLogin,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };
