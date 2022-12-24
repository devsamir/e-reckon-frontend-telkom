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
          fixed: "left",
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
          title: "Service Designator",
          width: 175,
          sorter: true,
        },
        {
          key: "unit.unit_name",
          dataIndex: "unit.unit_name",
          title: "Unit",
          width: 100,
          sorter: true,
          render: (_, record) => {
            return record?.unit?.unit_name;
          },
        },
        // {
        //   key: "telkom_price",
        //   title: "Harga Telkom",
        //   colSpan: 2,
        //   children: [
        //     {
        //       key: "material_price_telkom",
        //       dataIndex: "material_price_telkom",
        //       title: "Material",
        //       width: 150,
        //       sorter: true,
        //       render: (val) => formatCurrency(val),
        //     },
        //     {
        //       key: "service_price_telkom",
        //       dataIndex: "service_price_telkom",
        //       title: "Service",
        //       width: 150,
        //       sorter: true,
        //       render: (val) => formatCurrency(val),
        //     },
        //   ],
        // },
        // {
        //   key: "mitra_price",
        //   title: "Harga Mitra",
        //   colSpan: 2,
        //   children: [
        //     {
        //       key: "material_price_mitra",
        //       dataIndex: "material_price_mitra",
        //       title: "Material",
        //       width: 150,
        //       sorter: true,
        //       render: (val) => formatCurrency(val),
        //     },
        //     {
        //       key: "service_price_mitra",
        //       dataIndex: "service_price_mitra",
        //       title: "Service",
        //       width: 150,
        //       sorter: true,
        //       render: (val) => formatCurrency(val),
        //     },
        //   ],
        // },
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
    .typeError("Service designator harus diisi")
    .required("Service designator harus diisi")
    .max(100, "Service designator tidak boleh lebih dari 100 karakter"),
  unit_id: yup
    .number()
    .typeError("Unit harus diisi")
    .required("Unit harus diisi"),
  // material_price_telkom: yup
  //   .number()
  //   .typeError("Harga material harus diisi")
  //   .required("Harga material harus diisi")
  //   .min(1, "Harga material tidak boleh 0"),
  // service_price_telkom: yup
  //   .number()
  //   .typeError("Harga service harus diisi")
  //   .required("Harga service harus diisi")
  //   .min(1, "Harga service tidak boleh 0"),
  // material_price_mitra: yup
  //   .number()
  //   .typeError("Harga material harus diisi")
  //   .required("Harga material harus diisi")
  //   .min(1, "Harga material tidak boleh 0"),
  // service_price_mitra: yup
  //   .number()
  //   .typeError("Harga service harus diisi")
  //   .required("Harga service harus diisi")
  //   .min(1, "Harga service tidak boleh 0"),
});
