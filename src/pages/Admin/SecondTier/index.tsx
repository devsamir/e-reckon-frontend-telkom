import React from "react";
import { Link } from "react-router-dom";

import { Breadcrumb, Button } from "antd";
import Pagination, { usePagination } from "src/components/Pagination";
import TableExtended from "src/components/TableExtended";
import useIncidentSearchRead from "src/data/useIncidentSearchRead";

import { useSecondTierColumns } from "./config";
import FilterFirstTier from "./partials/FilterFirstTier";

const SecondTier = () => {
  const { limit, offset, domain, sort, ...pagination } = usePagination();

  const qIncident = useIncidentSearchRead({
    limit,
    offset,
    domain: { ...domain, on_tier: "tier_2" },
    sort,
    include: ["assignedMitra"],
  });
  const columns = useSecondTierColumns();

  return (
    <>
      <Breadcrumb>
        <Breadcrumb.Item>Admin</Breadcrumb.Item>
        <Breadcrumb.Item>Tier 2</Breadcrumb.Item>
      </Breadcrumb>
      <FilterFirstTier setDomain={pagination.setDomain} />
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

export default SecondTier;
