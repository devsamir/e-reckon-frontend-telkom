import { useCookies } from "react-cookie";

import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import ApiCall from "src/services/ApiCall";

interface Params {
  domain?: any;
  options?: UseQueryOptions<any>;
}

const useReportDashboard = (params: Params) => {
  const [cookies] = useCookies();
  const { domain, options } = params;
  const queryKey = [`getDashboardReport`, domain];

  const query = useQuery(
    queryKey,
    () =>
      ApiCall.post(
        "/report/dashboard",
        {
          ...domain,
        },
        {
          headers: { token: cookies?.["token"] },
        }
      ),
    { ...options, keepPreviousData: true }
  );
  return {
    ...query,
    error: query.error as any,
    data: query?.data?.data,
  };
};

export default useReportDashboard;
