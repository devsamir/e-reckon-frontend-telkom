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
  include?: string[];
}

const useItemSearchRead = (params: Params) => {
  const [cookies] = useCookies();
  const { domain, fields, limit, offset, sort, options, include } = params;
  const queryKey = [`getAllItem`, domain, limit, offset, sort, fields, include];

  const query = useQuery(
    queryKey,
    () =>
      ApiCall.post(
        "/item/search_read",
        {
          domain,
          fields,
          limit,
          offset,
          sort,
          include,
        },
        {
          headers: { token: cookies?.["token"] },
        }
      ),
    { ...options }
  );
  return {
    ...query,
    error: query.error as any,
    length: query?.data?.data?.length,
    data: query?.data?.data?.data,
  };
};

export default useItemSearchRead;
