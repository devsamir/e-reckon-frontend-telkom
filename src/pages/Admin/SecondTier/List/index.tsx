import React, { useContext } from "react";

import { Breadcrumb } from "antd";
import Pagination, { usePagination } from "src/components/Pagination";
import TableExtended from "src/components/TableExtended";
import { AuthContext } from "src/contexts/AuthContext";
import useIncidentSearchRead from "src/data/useIncidentSearchRead";

import { useSecondTierColumns } from "./config";
import FilterSecondTier from "./partials/FilterSecondTier";

const SecondTier = () => {
  const { limit, offset, domain, sort, ...pagination } = usePagination();
  const { user } = useContext(AuthContext);
  const qIncident = useIncidentSearchRead({
    limit,
    offset,
    domain: [
      ...domain,
      ["on_tier", "=", "Mitra"],
      ...(user.role !== "admin" ? [["assigned_mitra", "=", user?.id]] : []),
    ],
    sort,
    include: ["assigned_mitra", "datel_id", "job_type_id"],
    options: { enabled: !!user?.id },
  });
  const columns = useSecondTierColumns();

  return (
    <>
      <Breadcrumb>
        <Breadcrumb.Item>Admin</Breadcrumb.Item>
        <Breadcrumb.Item>Tier 2</Breadcrumb.Item>
      </Breadcrumb>
      <FilterSecondTier setDomain={pagination.setDomain} />
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

export default SecondTier;
