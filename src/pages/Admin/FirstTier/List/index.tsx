import React from "react";
import { Link } from "react-router-dom";

import { Breadcrumb, Button } from "antd";
import Pagination, { usePagination } from "src/components/Pagination";
import TableExtended from "src/components/TableExtended";
import { useIncidentService } from "src/services/incident.service";

import { useFirstTierColumn } from "./config";
import FilterFirstTier from "./partials/FilterFirstTier";

const FirstTier = () => {
  const pagination = usePagination();
  const { qIncident } = useIncidentService({
    ...pagination,
    domain: { ...pagination.domain, on_tier: "tier_1" },
  });

  const columns = useFirstTierColumn();

  return (
    <>
      <Breadcrumb>
        <Breadcrumb.Item>Admin</Breadcrumb.Item>
        <Breadcrumb.Item>Tier 1</Breadcrumb.Item>
      </Breadcrumb>
      <FilterFirstTier setDomain={pagination.setDomain} />
      <div className="flex justify-between items-center gap-4 flex-wrap">
        <Pagination
          page={pagination.page}
          total={qIncident.length}
          limit={pagination.limit}
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

export default FirstTier;
