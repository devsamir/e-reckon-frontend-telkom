import { useMemo } from "react";

import { ColumnType } from "antd/es/table";
import { ColumnsType } from "antd/lib/table";

const mappingApprove = {
  not_yet: "Not Yet",
  approved: "Approved",
  decline: "Decline",
};

export const useTableLineColumns = (offset) => {
  const columns = useMemo(
    () =>
      [
        {
          key: "item_code",
          dataIndex: "item_code",
          title: "Kode Item",
          width: 125,
        },
        {
          key: "material_designator",
          dataIndex: "material_designator",
          title: "Material Designator",
          width: 150,
        },
        {
          key: "service_designator",
          dataIndex: "service_designator",
          title: "Service Designator",
          width: 150,
        },
        {
          key: "unit_name",
          dataIndex: "unit_name",
          title: "Unit",
          width: 100,
        },
        {
          key: "qty",
          dataIndex: "qty",
          title: "Qty",
          width: 150,
        },
        {
          key: "job_detail",
          dataIndex: "job_detail",
          title: "Uraian Pekerjaan",
          width: 250,
        },
        {
          key: "approve_wh",
          dataIndex: "approve_wh",
          title: "Approve WH",
          width: 150,
          render: (v) => {
            return mappingApprove[v];
          },
        },
      ].map(
        (col) =>
          ({
            ...col,
            onCell: (data) => ({
              style: {
                background:
                  data?.approve_wh === "decline" ? "rgb(252 165 165)" : "#fff",
              },
            }),
          } as ColumnType<any>)
      ) as ColumnsType<any>,
    []
  );

  return columns;
};
