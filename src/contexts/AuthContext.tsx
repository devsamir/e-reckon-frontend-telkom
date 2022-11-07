import { createContext, useEffect, useState, useCallback } from "react";
import { useCookies } from "react-cookie";

import { notification } from "antd";
import ApiCall from "src/services/ApiCall";

const AuthContext = createContext<any>(null);

const AuthProvider = ({ children }) => {
  const [cookies, _setCookies, removeCookie] = useCookies();
  const [initialLoading, setInitialLoading] = useState(true);
  const [isLogin, setIsLogin] = useState(false);

  const checkIsLogin = useCallback(async () => {
    try {
      setInitialLoading(true);
      await ApiCall.get("/user/me", {
        headers: { token: cookies["token"] },
      });
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
        setIsLogin,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };
