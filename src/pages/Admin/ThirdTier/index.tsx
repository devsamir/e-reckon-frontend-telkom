import React from "react";

import { Breadcrumb } from "antd";
import Pagination, { usePagination } from "src/components/Pagination";
import TableExtended from "src/components/TableExtended";
import useIncidentSearchRead from "src/data/useIncidentSearchRead";

import { useThirdTierColumns } from "./config";
import FilterThirdTier from "./partials/FilterThirdTier";

const ThirdTier = () => {
  const { limit, offset, domain, sort, ...pagination } = usePagination();

  const qIncident = useIncidentSearchRead({
    limit,
    offset,
    domain: {
      ...domain,
      on_tier: "tier_3",
      NOT: {
        status_tier_3: "closed_pekerjaan",
      },
    },
    sort,
    include: ["assignedMitra"],
  });
  const columns = useThirdTierColumns();

  return (
    <>
      <Breadcrumb>
        <Breadcrumb.Item>Admin</Breadcrumb.Item>
        <Breadcrumb.Item>Tier 3</Breadcrumb.Item>
      </Breadcrumb>
      <FilterThirdTier setDomain={pagination.setDomain} />
      <div className="flex justify-between items-center gap-4 flex-wrap">
        <Pagination
          page={pagination.page}
          total={qIncident.length}
          limit={limit}
          onChange={pagination.onChangePagination}
        />
      </div>
      <TableExtended
        columns={columns}
        dataSource={qIncident.data}
        loading={qIncident.isLoading || qIncident.isFetching}
        setSorter={pagination.setSort}
        rowKey="id"
      />
    </>
  );
};

export default ThirdTier;
