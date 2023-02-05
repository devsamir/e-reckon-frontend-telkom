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
          render: (_, record) => {
            return (
              <div className="flex items-center gap-2 flex-wrap">
                <Button
                  type="warning"
                  onClick={() => prepareEdit(record)}
                  disabled={record?.assigned_mitra && record?.status_tier_2}
                >
                  <EditFilled />
                </Button>
                <Button
                  type="primary"
                  danger
                  onClick={() => prepareDelete(record)}
                  disabled={record?.assigned_mitra && record?.status_tier_2}
                >
                  <DeleteFilled />
                </Button>
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
          render: (val) => {
            return <span>{val}</span>;
          },
        },
        {
          key: "status_on_tier",
          dataIndex: "status_on_tier",
          title: "Status",
          width: 150,
          render: (_, record) => {
            // temporary
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
          key: "open_at",
          title: "Tanggal Masuk",
          dataIndex: "open_at",
          sorter: true,
          width: 150,
          render: (val) => {
            return val ? (
              <span>{format(new Date(val), "dd/MM/yyyy")}</span>
            ) : null;
          },
        },
        {
          key: "close_at",
          dataIndex: "close_at",
          title: "Tanggal Closed",
          sorter: true,
          width: 150,
          render: (val, record) => {
            return val ? (
              <span>{format(new Date(val), "dd/MM/yyyy")}</span>
            ) : null;
          },
        },
        {
          key: "duration",
          dataIndex: "duration",
          title: "Durasi",
          width: 100,
          render: (val, record) => {
            if (record.created_at && record.close_at) {
              const diff = differenceInDays(
                new Date(record.close_at),
                new Date(record.open_at)
              );
              if (diff >= 1) {
                return `${diff} Hari`;
              } else {
                return `${differenceInHours(
                  new Date(record.close_at),
                  new Date(record.open_at)
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
  job_type_id: yup
    .number()
    .typeError("Jenis pekerjaan harus diisi")
    .required("Jenis pekerjaan harus diisi"),
  datel_id: yup
    .number()
    .typeError("Datel harus diisi")
    .required("Datel harus diisi"),
});
