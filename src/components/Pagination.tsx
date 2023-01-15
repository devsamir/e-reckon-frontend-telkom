import React, { useState } from "react";

import { Pagination as AntdPagination } from "antd";

interface Props {
  total: number;
  page: number;
  limit: number;
  onChange: any;
}

export interface usePaginationProps {
  domain: any;
  limit: number;
  page: number;
  offset: number;
  sort: undefined;
  setDomain: any;
  setSort: any;
  setLimit: any;
  setPage: any;
  onChangePagination: any;
}

export const usePagination = (): usePaginationProps => {
  const [domain, setDomain] = useState([]);
  const [sort, setSort] = useState();
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);

  const offset = (page - 1) * limit;

  const onChangePagination = (newPage, newPageSize) => {
    setPage(newPage);
    setLimit(newPageSize);
  };

  return {
    domain,
    limit,
    page,
    offset,
    sort,
    setDomain,
    setSort,
    setLimit,
    setPage,
    onChangePagination,
  };
};

const Pagination: React.FC<Props> = ({ total, page, onChange, limit }) => {
  return (
    <AntdPagination
      size="small"
      style={{ margin: "1rem 0" }}
      current={page}
      total={total}
      pageSize={limit}
      onChange={onChange}
      showSizeChanger
      showTotal={(total) => `Total ${total} items`}
    />
  );
};

export default Pagination;
