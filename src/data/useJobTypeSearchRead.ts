import { useCookies } from "react-cookie";

import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import ApiCall from "src/services/ApiCall";

interface Params {
  domain?: any;
  limit?: number | false;
  offset?: number | false;
  sort?: string;
  fields?: string[];
  options?: UseQueryOptions<any>;
}

const useJobTypeSearchRead = (params: Params) => {
  const [cookies] = useCookies();
  const { domain, fields, limit, offset, sort, options } = params;
  const queryKey = [`getAllJobType`, domain, limit, offset, sort, fields];

  const query = useQuery(
    queryKey,
    () =>
      ApiCall.post(
        "/job-type/search_read",
        {
          domain,
          fields,
          limit,
          offset,
          sort,
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
    length: query?.data?.data?.length,
    data: query?.data?.data?.data,
  };
};

export default useJobTypeSearchRead;
