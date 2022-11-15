import { useMemo } from "react";

import { ColumnsType } from "antd/lib/table";

import { DeleteFilled } from "@ant-design/icons";
import Button from "antd-button-color";
import FInput from "src/components/form/FInput";
import FInputNumber from "src/components/form/FInputNumber";
import FSelect from "src/components/form/FSelect";
import * as yup from "yup";

export const useTableLineColumns = (remove, offset) => {
  const columns = useMemo(
    () =>
      [
        {
          key: "item_code",
          dataIndex: "item_code",
          title: "Kode Item",
          width: 125,
          render: (_, record, idx) => {
            return (
              <FInput
                key={record.id}
                name={`incident_details.${idx + offset}.item_code`}
                disabled
              />
            );
          },
        },
        {
          key: "material_designator",
          dataIndex: "material_designator",
          title: "Material Designator",
          width: 150,
          render: (_, record, idx) => {
            return (
              <FInput
                key={record.id}
                name={`incident_details.${idx + offset}.material_designator`}
                disabled
              />
            );
          },
        },
        {
          key: "service_designator",
          dataIndex: "service_designator",
          title: "Service Designator",
          width: 150,
          render: (_, record, idx) => {
            return (
              <FInput
                key={record.id}
                name={`incident_details.${idx + offset}.service_designator`}
                disabled
              />
            );
          },
        },
        {
          key: "unit_name",
          dataIndex: "unit_name",
          title: "Unit",
          width: 100,
          render: (_, record, idx) => {
            return (
              <FInput
                key={record.id}
                name={`incident_details.${idx + offset}.unit_name`}
                disabled
              />
            );
          },
        },
        {
          key: "qty",
          dataIndex: "qty",
          title: "Qty",
          width: 150,
          render: (_, record, idx) => {
            return (
              <FInputNumber
                key={record.id}
                name={`incident_details.${idx + offset}.qty`}
                disabled
              />
            );
          },
        },
        {
          key: "job_detail",
          dataIndex: "job_detail",
          title: "Uraian Pekerjaan",
          width: 250,
          render: (_, record, idx) => {
            return (
              <FInput
                key={record.id}
                name={`incident_details.${idx + offset}.job_detail`}
                isTextArea
                rows={1}
                disabled
              />
            );
          },
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
        // {
        //   key: "action",
        //   title: "Action",
        //   width: 100,
        //   render: (_, record, idx) => {
        //     return (
        //       <div className="flex justify-center">
        //         <Button type="danger" onClick={() => remove(idx + offset)}>
        //           <DeleteFilled />
        //         </Button>
        //       </div>
        //     );
        //   },
        // },
      ] as ColumnsType<any>,
    [offset, remove]
  );
  return columns;
};

export const warehouseTierSchema = yup.object().shape({
  assigned_mitra: yup
    .number()
    .typeError("Mitra harus diisi")
    .required("Mitra harus diisi"),
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
