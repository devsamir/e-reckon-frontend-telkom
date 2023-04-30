import React from "react";

import { Breadcrumb, Table } from "antd";
import { format } from "date-fns";
import { usePagination } from "src/components/Pagination";
import TableExtended from "src/components/TableExtended";
import useReportDashboard from "src/data/useReportDashboard";

import { useDashboardColumns } from "./config";
import FilterDashboard from "./partials/FilterDashboard";

const Dashboard = () => {
  const { domain, setDomain } = usePagination();

  const columns = useDashboardColumns();

  const qDashboard = useReportDashboard({
    domain: {
      datel_id: domain.datel_id || null,
      start_date: domain?.date?.[0]
        ? format(domain?.date?.[0], "yyyy-MM-dd")
        : null,
      end_date: domain?.date?.[1]
        ? format(domain?.date?.[1], "yyyy-MM-dd")
        : null,
    },
  });

  return (
    <>
      <Breadcrumb>
        <Breadcrumb.Item>Admin</Breadcrumb.Item>
        <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
      </Breadcrumb>
      <FilterDashboard setDomain={setDomain} />
      <div className="flex items-center gap-4 flex-wrap mb-4">
        <TableExtended
          columns={columns}
          dataSource={qDashboard.data}
          loading={qDashboard.isLoading || qDashboard.isFetching}
          rowKey="name"
          selection={false}
          summary={(data) => {
            return (
              <Table.Summary fixed>
                <Table.Summary.Row>
                  <Table.Summary.Cell index={0} className="font-bold">
                    Total
                  </Table.Summary.Cell>
                  <Table.Summary.Cell
                    index={1}
                    className="font-bold text-center"
                  >
                    {data.reduce(
                      (acc, curr) => acc + (curr?.tier_1?.open || 0),
                      0
                    )}
                  </Table.Summary.Cell>
                  <Table.Summary.Cell
                    index={2}
                    className="font-bold text-center"
                  >
                    {data.reduce(
                      (acc, curr) => acc + (curr?.tier_1?.mitra_done || 0),
                      0
                    )}
                  </Table.Summary.Cell>
                  <Table.Summary.Cell
                    index={3}
                    className="font-bold text-center"
                  >
                    {data.reduce(
                      (acc, curr) => acc + (curr?.tier_1?.closed || 0),
                      0
                    )}
                  </Table.Summary.Cell>
                  <Table.Summary.Cell
                    index={4}
                    className="font-bold text-center"
                  >
                    {data.reduce(
                      (acc, curr) => acc + (curr?.tier_2?.open || 0),
                      0
                    )}
                  </Table.Summary.Cell>
                  <Table.Summary.Cell
                    index={5}
                    className="font-bold text-center"
                  >
                    {data.reduce(
                      (acc, curr) => acc + (curr?.tier_2?.return || 0),
                      0
                    )}
                  </Table.Summary.Cell>
                  <Table.Summary.Cell
                    index={5}
                    className="font-bold text-center"
                  >
                    {data.reduce(
                      (acc, curr) => acc + (curr?.commerce?.not_filled || 0),
                      0
                    )}
                  </Table.Summary.Cell>
                  <Table.Summary.Cell
                    index={5}
                    className="font-bold text-center"
                  >
                    {data.reduce(
                      (acc, curr) => acc + (curr?.commerce?.filled || 0),
                      0
                    )}
                  </Table.Summary.Cell>
                </Table.Summary.Row>
              </Table.Summary>
            );
          }}
        />
      </div>
    </>
  );
};

export default Dashboard;
