import { useMemo } from "react";

import type { ColumnsType } from "antd/es/table";

import { EditFilled, DeleteFilled } from "@ant-design/icons";
import Button from "antd-button-color";
import { formatCurrency } from "src/helpers/utils";
import * as yup from "yup";

export const useItemColumns = (prepareEdit?: any, prepareDelete?: any) => {
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
          key: "item_code",
          dataIndex: "item_code",
          title: "Kode Item",
          width: 150,
          sorter: true,
        },
        {
          key: "material_designator",
          dataIndex: "material_designator",
          title: "Material Designator",
          width: 175,
          sorter: true,
        },
        {
          key: "service_designator",
          dataIndex: "service_designator",
          title: "Jasa Designator",
          width: 175,
          sorter: true,
        },
        {
          key: "unit_id.unit_name",
          dataIndex: "unit_id.unit_name",
          title: "Unit",
          width: 100,
          sorter: true,
          render: (_, record) => {
            return record?.unit_id?.unit_name;
          },
        },
      ] as ColumnsType<any>,
    [prepareEdit, prepareDelete]
  );

  return columns;
};

export const itemSchema = yup.object().shape({
  item_code: yup
    .string()
    .typeError("Item code harus diisi")
    .required("Item code harus diisi")
    .max(100, "Item code tidak boleh lebih dari 100 karakter"),
  material_designator: yup
    .string()
    .typeError("Material designator harus diisi")
    .required("Material designator harus diisi")
    .max(100, "Material designator tidak boleh lebih dari 100 karakter"),
  service_designator: yup
    .string()
    .typeError("Jasa designator harus diisi")
    .required("Jasa designator harus diisi")
    .max(100, "Jasa designator tidak boleh lebih dari 100 karakter"),
  unit_id: yup
    .number()
    .typeError("Unit harus diisi")
    .required("Unit harus diisi"),
});
