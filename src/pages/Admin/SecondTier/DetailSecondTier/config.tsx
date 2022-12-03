import { useMemo } from "react";

import { ColumnsType } from "antd/lib/table";

import { DeleteFilled } from "@ant-design/icons";
import Button from "antd-button-color";
import FInput from "src/components/form/FInput";
import FInputNumber from "src/components/form/FInputNumber";
import * as yup from "yup";

const mappingApprove = {
  not_yet: "Not Yet",
  approved: "Approved",
  decline: "Decline",
};

export const useTableLineColumns = (remove, offset) => {
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
          render: (_, record, idx) => {
            return (
              <FInputNumber
                key={record.id}
                name={`incident_details.${idx + offset}.qty`}
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
              />
            );
          },
        },
        {
          key: "approve_wh",
          dataIndex: "approve_wh",
          title: "Approve WH",
          width: 150,
          render: (v) => {
            return mappingApprove[v];
          },
        },
        {
          key: "action",
          title: "Action",
          width: 100,
          render: (_, _record, idx) => {
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
    [offset, remove]
  );
  return columns;
};

export const secondTierSchema = yup.object().shape({
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
