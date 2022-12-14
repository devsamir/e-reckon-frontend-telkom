import { useMemo } from "react";

import type { ColumnsType } from "antd/es/table";

import { EditFilled, DeleteFilled } from "@ant-design/icons";
import Button from "antd-button-color";
import * as yup from "yup";

export const useUnitColumns = (prepareEdit, prepareDelete) => {
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
                  type="primary"
                  danger
                  onClick={() => prepareDelete(record)}
                >
                  <DeleteFilled />
                </Button>
              </div>
            );
          },
        },
        {
          key: "unit_name",
          dataIndex: "unit_name",
          title: "Nama Unit",
          sorter: true,
          width: 150,
        },
      ] as ColumnsType<any>,
    [prepareEdit, prepareDelete]
  );

  return columns;
};

export const unitSchema = yup.object().shape({
  unit_name: yup
    .string()
    .typeError("Nama unit harus diisi")
    .required("Nama unit harus diisi"),
});
