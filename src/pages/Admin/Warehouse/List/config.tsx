import { useMemo } from "react";
import { Link } from "react-router-dom";

import type { ColumnsType } from "antd/es/table";

import Button from "antd-button-color";
import { format, differenceInDays, differenceInHours } from "date-fns";

export const useWarehouseTierColumns = () => {
  const columns = useMemo(
    () =>
      [
        {
          key: "action",
          title: "Action",
          width: 125,
          render: (_, record) => {
            return (
              <div className="flex items-center gap-2 flex-wrap">
                <Link to={`/admin/warehouse-tier/detail?id=${record.id}`}>
                  <Button type="info">Detail</Button>
                </Link>
              </div>
            );
          },
        },
        {
          key: "datel_id.name",
          dataIndex: "datel_id.name",
          title: "Datel",
          width: 150,
          sorter: true,
          render: (_, record) => {
            if (record?.datel_id?.name) {
              return record.datel_id.name;
            }
            return null;
          },
        },
        {
          key: "incident_code",
          dataIndex: "incident_code",
          title: "ID",
          width: 150,
          sorter: true,
        },
        {
          key: "incident",
          dataIndex: "incident",
          title: "Tiket Gamas",
          width: 175,
          sorter: true,
        },
        {
          key: "job_type_id.name",
          dataIndex: "job_type_id.name",
          title: "Jenis Pekerjaan",
          width: 150,
          sorter: true,
          render: (_, record) => {
            if (record?.job_type_id?.name) {
              return record.job_type_id.name;
            }
            return null;
          },
        },
        {
          key: "on_tier",
          dataIndex: "on_tier",
          title: "Posisi",
          width: 100,
          sorter: true,
        },
        {
          key: "status_on_tier",
          dataIndex: "status_on_tier",
          title: "Status",
          width: 150,
          render: (_, record) => {
            if (record.on_tier === "Tier 1" || record.on_tier === "Commerce")
              return <span>{record.status_tier_1}</span>;
            if (record.on_tier === "Mitra")
              return <span>{record.status_tier_2}</span>;
          },
        },
        {
          key: "assigned_mitra.fullname",
          dataIndex: "assigned_mitra.fullname",
          title: "Mitra",
          width: 175,
          sorter: true,
          render: (_, record) => {
            if (record?.assigned_mitra?.fullname) {
              return record?.assigned_mitra?.fullname;
            }
            return null;
          },
        },
        {
          key: "created_at",
          title: "Tanggal Masuk",
          dataIndex: "created_at",
          sorter: true,
          width: 150,
          render: (val) => {
            return val ? (
              <span>{format(new Date(val), "dd/MM/yyyy")}</span>
            ) : null;
          },
        },
        // {
        //   key: "closed_at",
        //   dataIndex: "closed_at",
        //   title: "Tanggal Closed",
        //   sorter: true,
        //   width: 150,
        //   render: (val) => {
        //     return val ? (
        //       <span>{format(new Date(val), "dd/MM/yyyy")}</span>
        //     ) : null;
        //   },
        // },
        // {
        //   key: "duration",
        //   dataIndex: "duration",
        //   title: "Durasi",
        //   width: 100,
        //   render: (val, record) => {
        //     if (record.created_at && record.closed_at) {
        //       const diff = differenceInDays(
        //         new Date(record.closed_at),
        //         new Date(record.created_at)
        //       );
        //       if (diff >= 1) {
        //         return `${diff} Hari`;
        //       } else {
        //         return `${differenceInHours(
        //           new Date(record.closed_at),
        //           new Date(record.created_at)
        //         )} Jam`;
        //       }
        //     }
        //     return null;
        //   },
        // },
      ] as ColumnsType<any>,
    []
  );

  return columns;
};
