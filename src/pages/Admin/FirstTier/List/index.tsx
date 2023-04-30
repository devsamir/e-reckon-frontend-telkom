import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";

import { Breadcrumb, Checkbox } from "antd";
import Pagination, { usePagination } from "src/components/Pagination";
import TableExtended from "src/components/TableExtended";
import { useIncidentService } from "src/services/incident.service";

import { useFirstTierColumn } from "./config";
import FilterFirstTier from "./partials/FilterFirstTier";

const FirstTier = () => {
  const pagination = usePagination();
  const [params] = useSearchParams();
  const show_all = params.get("show_all");
  const [showAll, setShowAll] = useState(!!show_all);
  const { qIncident } = useIncidentService({
    ...pagination,
    domain: [
      ...pagination.domain,
      ...(!showAll ? [["on_tier", "=", "Tier 1"]] : []),
    ],
  });

  const columns = useFirstTierColumn();

  return (
    <>
      <Breadcrumb>
        <Breadcrumb.Item>Admin</Breadcrumb.Item>
        <Breadcrumb.Item>Tier 1</Breadcrumb.Item>
      </Breadcrumb>
      <FilterFirstTier showAll={showAll} setDomain={pagination.setDomain} />
      <div className="flex items-center gap-4 flex-wrap mb-4">
        <Pagination
          page={pagination.page}
          total={qIncident.length}
          limit={pagination.limit}
          onChange={pagination.onChangePagination}
        />
        <Checkbox
          checked={showAll}
          onChange={(e) => setShowAll(e.target.checked)}
        >
          Tampilkan Semua Data
        </Checkbox>
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
