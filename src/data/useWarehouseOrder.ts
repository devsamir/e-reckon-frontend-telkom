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
  show_all?: boolean;
}

const useWarehouseOrder = (params: Params) => {
  const [cookies] = useCookies();
  const { domain, fields, limit, offset, sort, options, include, show_all } =
    params;
  const queryKey = [
    `getWarehouseOrder`,
    domain,
    limit,
    offset,
    sort,
    fields,
    include,
    show_all,
  ];

  const query = useQuery(
    queryKey,
    () =>
      ApiCall.post(
        "/incident/get_warehouse_order",
        {
          domain,
          fields,
          limit,
          offset,
          sort,
          include,
          show_all,
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

export default useWarehouseOrder;
