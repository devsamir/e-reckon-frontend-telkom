import { useMemo } from "react";

import { ColumnsType } from "antd/lib/table";

import FSelect from "src/components/form/FSelect";
import * as yup from "yup";

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
          render: (_, record, idx) => {
            return (
              <FSelect
                key={record.id}
                name={`incident_details.${idx + offset}.approve_wh`}
                className="w-full"
                options={[
                  {
                    label: "Not Yet",
                    value: "not_yet",
                  },
                  {
                    label: "Approved",
                    value: "approved",
                  },
                  {
                    label: "Decline",
                    value: "decline",
                  },
                ]}
              />
            );
          },
        },
        {
          key: "action",
          title: "Action",
          width: 100,
          render: (_, record, idx) => {
            return (
              <div className="flex justify-center">
                <Button type="danger" onClick={() => remove(idx + offset)}>
                  <DeleteFilled />
                </Button>
              </div>
            );
          },
        },
      ] as ColumnsType<any>,
    [offset]
  );
  return columns;
};

export const warehouseTierSchema = yup.object().shape({
  incident_details: yup
    .array()
    .of(
      yup.object().shape({
        item_id: yup
          .number()
          .typeError("Item ID harus diisi")
          .required("Item ID harus diisi"),
        qty: yup
          .number()
          .typeError("Qty harus diisi")
          .required("Qty harus diisi"),
      })
    )
    .required("Material item dibutuhkan")
    .min(1, "Material item dibutuhkan"),
});
