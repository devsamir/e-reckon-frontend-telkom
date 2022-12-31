import { useMemo } from "react";

import type { ColumnsType } from "antd/es/table";

import { EditFilled, DeleteFilled } from "@ant-design/icons";
import Button from "antd-button-color";
import * as yup from "yup";

export const useJobTypeColumns = (prepareEdit, prepareDelete) => {
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
                <Button type="warning" onClick={() => prepareEdit(record)}>
                  <EditFilled />
                </Button>
                <Button
                  danger
                  type="primary"
                  onClick={() => prepareDelete(record)}
                >
                  <DeleteFilled />
                </Button>
              </div>
            );
          },
        },
        {
          key: "name",
          dataIndex: "name",
          title: "Jenis Pekerjaan",
          sorter: true,
          width: 150,
        },
      ] as ColumnsType<any>,
    [prepareEdit, prepareDelete]
  );

  return columns;
};

export const jobTypeSchema = yup.object().shape({
  name: yup
    .string()
    .typeError("Nama jenis pekerjaan harus diisi")
    .required("Nama jenis pekerjaan harus diisi"),
});
