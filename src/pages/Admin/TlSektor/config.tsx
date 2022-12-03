import { useMemo } from "react";

import type { ColumnsType } from "antd/es/table";

import { EditFilled, DeleteFilled } from "@ant-design/icons";
import Button from "antd-button-color";
import { format, differenceInDays, differenceInHours } from "date-fns";
import * as yup from "yup";

export const useFormTLColumns = (prepareEdit, prepareDelete) => {
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
                <Button type="warning" onClick={() => prepareEdit(record)}>
                  <EditFilled />
                </Button>
                <Button type="danger" onClick={() => prepareDelete(record)}>
                  <DeleteFilled />
                </Button>
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
            return (
              <span className="uppercase">{val.replaceAll("_", " ")}</span>
            );
          },
        },
        {
          key: "status_on_tier",
          dataIndex: "status_on_tier",
          title: "Status",
          width: 150,
          render: (_, record) => {
            if (record.on_tier === "tier_1")
              return (
                <span className="uppercase">
                  {record.status_tier_1?.replaceAll("_", " ")}
                </span>
              );
            if (record.on_tier === "tier_2")
              return (
                <span className="uppercase">
                  {record.status_tier_2?.replaceAll("_", " ")}
                </span>
              );
            if (record.on_tier === "tier_3")
              return (
                <span className="uppercase">
                  {record.status_tier_3?.replaceAll("_", " ")}
                </span>
              );
            if (record.on_tier === "wh")
              return (
                <span className="uppercase">
                  {record.status_wh?.replaceAll("_", " ")}
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
          key: "open_at",
          title: "Tanggal Masuk",
          dataIndex: "open_at",
          sorter: true,
          width: 150,
          render: (val) => {
            return val ? (
              <span>{format(new Date(val), "dd/MM/yyyy HH:mm")}</span>
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
              <span>{format(new Date(val), "dd/MM/yyyy HH:mm")}</span>
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
    [prepareEdit, prepareDelete]
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
