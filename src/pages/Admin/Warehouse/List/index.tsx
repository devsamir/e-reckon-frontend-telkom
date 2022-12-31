import React from "react";

import { Breadcrumb } from "antd";
import Pagination, { usePagination } from "src/components/Pagination";
import TableExtended from "src/components/TableExtended";
import useIncidentSearchRead from "src/data/useIncidentSearchRead";

import { useWarehouseTierColumns } from "./config";
import FilterWarehouseTier from "./partials/FilterWarehouseTier";

const WarehouseTier = () => {
  const { limit, offset, domain, sort, ...pagination } = usePagination();

  const qIncident = useIncidentSearchRead({
    limit,
    offset,
    domain: {
      ...domain,
      OR: [
        { on_tier: "tier_2" },
        { on_tier: "tier_1", NOT: { status_tier_1: "open" } },
      ],
    },
    sort,
    include: ["assignedMitra"],
  });
  const columns = useWarehouseTierColumns();

  return (
    <>
      <Breadcrumb>
        <Breadcrumb.Item>Admin</Breadcrumb.Item>
        <Breadcrumb.Item>Tier WH</Breadcrumb.Item>
      </Breadcrumb>
      <FilterWarehouseTier setDomain={pagination.setDomain} />
      <div className="flex justify-between items-center gap-4 flex-wrap mb-4">
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

export default WarehouseTier;
