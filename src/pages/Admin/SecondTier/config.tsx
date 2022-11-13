import { useMemo } from "react";
import { Link } from "react-router-dom";

import type { ColumnsType } from "antd/es/table";

import Button from "antd-button-color";
import { format, differenceInDays, differenceInHours } from "date-fns";
import * as yup from "yup";

export const useSecondTierColumns = () => {
  const columns = useMemo(
    () =>
      [
        {
          key: "action",
          title: "Action",
          width: 125,
          fixed: "left",
          render: (_, record) => {
            return (
              <div className="flex items-center gap-2 flex-wrap">
                <Link to={`/admin/second-tier/detail?id=${record.id}`}>
                  <Button type="info">Detail</Button>
                </Link>
              </div>
            );
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
          key: "on_tier",
          dataIndex: "on_tier",
          title: "Posisi",
          width: 100,
          sorter: true,
          render: (val) => {
            return <span className="uppercase">{val.replace("_", " ")}</span>;
          },
        },
        {
          key: "status_on_tier",
          dataIndex: "status_on_tier",
          title: "Status",
          width: 100,
          render: (_, record) => {
            if (record.on_tier === "tier_1")
              return (
                <span className="uppercase">
                  {record.status_tier_1?.replace("_", " ")}
                </span>
              );
            if (record.on_tier === "tier_2")
              return (
                <span className="uppercase">
                  {record.status_tier_2?.replace("_", " ")}
                </span>
              );
            if (record.on_tier === "tier_3")
              return (
                <span className="uppercase">
                  {record.status_tier_3?.replace("_", " ")}
                </span>
              );
            if (record.on_tier === "wh")
              return (
                <span className="uppercase">
                  {record.status_wh?.replace("_", " ")}
                </span>
              );
          },
        },
        {
          key: "assignedMitra.fullname",
          dataIndex: "assignedMitra.fullname",
          title: "Mitra",
          width: 175,
          sorter: true,
          render: (_, record) => {
            if (
              record?.assignedMitra?.shortname &&
              record?.assignedMitra?.fullname
            ) {
              return `(${record?.assignedMitra?.shortname}) ${record?.assignedMitra?.fullname}`;
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
              <span>{format(new Date(val), "dd/MM/yyyy mm:hh")}</span>
            ) : null;
          },
        },
        {
          key: "closed_at",
          dataIndex: "closed_at",
          title: "Tanggal Closed",
          sorter: true,
          width: 150,
          render: (val) => {
            return val ? (
              <span>{format(new Date(val), "dd/MM/yyyy  mm:hh")}</span>
            ) : null;
          },
        },
        {
          key: "duration",
          dataIndex: "duration",
          title: "Durasi",
          width: 100,
          render: (val, record) => {
            if (record.created_at && record.closed_at) {
              const diff = differenceInDays(
                new Date(record.closed_at),
                new Date(record.created_at)
              );
              if (diff >= 1) {
                return `${diff} Hari`;
              } else {
                return `${differenceInHours(
                  new Date(record.closed_at),
                  new Date(record.created_at)
                )} Jam`;
              }
            }
            return null;
          },
        },
      ] as ColumnsType<any>,
    []
  );

  return columns;
};

export const formTLSchema = yup.object().shape({
  incident: yup
    .string()
    .typeError("Tiket incident harus diisi")
    .required("Tiket incident harus diisi")
    .max(100, "Tiket incident tidak boleh lebih dari 100 karakter"),
  summary: yup
    .string()
    .typeError("Summary harus diisi")
    .required("Summary harus diisi"),
  job_type: yup
    .string()
    .typeError("Jenis pekerjaan harus diisi")
    .required("Jenis pekerjaan harus diisi")
    .oneOf(["PEMBENAHAN", "GAMAS", "LAINNYA"], "Jenis pekerjaan tidak valid"),
});
