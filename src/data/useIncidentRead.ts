import { useCookies } from "react-cookie";

import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import ApiCall from "src/services/ApiCall";

interface Params {
  id: number;
  options?: UseQueryOptions<any>;
}

const useIncidentRead = (params: Params) => {
  const [cookies] = useCookies();
  const { id, options } = params;
  const queryKey = [`getOneIncident`, id];

  const query = useQuery(
    queryKey,
    () =>
      ApiCall.get(`/incident/read/${id}`, {
        headers: { token: cookies?.["token"] },
      }),
    { ...options, keepPreviousData: true }
  );
  return {
    ...query,
    error: query.error as any,
    data: query?.data?.data,
  };
};

export default useIncidentRead;
