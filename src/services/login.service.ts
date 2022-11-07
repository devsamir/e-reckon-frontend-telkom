import { useMutation } from "@tanstack/react-query";

import ApiCall from "./ApiCall";

interface LoginData {
  username: string;
  password: string;
}

export const useLoginService = () => {
  const loginMutation = useMutation({
    mutationFn: (data: LoginData) => ApiCall.post("/auth/login", data),
  });
  return { loginMutation };
};
