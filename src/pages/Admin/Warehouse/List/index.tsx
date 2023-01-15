import React from "react";

import { Breadcrumb } from "antd";
import Pagination, { usePagination } from "src/components/Pagination";
import TableExtended from "src/components/TableExtended";
import useWarehouseOrder from "src/data/useWarehouseOrder";

import { useWarehouseTierColumns } from "./config";
import FilterWarehouseTier from "./partials/FilterWarehouseTier";

const WarehouseTier = () => {
  const { limit, offset, domain, sort, ...pagination } = usePagination();

  const qIncident = useWarehouseOrder({
    limit,
    offset,
    domain,
    sort,
    include: ["assigned_mitra", "datel_id", "job_type_id"],
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
