import { useMemo } from "react";

import type { ColumnsType } from "antd/es/table";

import { EditFilled, DeleteFilled } from "@ant-design/icons";
import Button from "antd-button-color";
import * as yup from "yup";

export const useUserColumns = (prepareEdit, prepareDelete) => {
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
          key: "username",
          dataIndex: "username",
          title: "Username",
          sorter: true,
          width: 200,
        },
        {
          key: "fullname",
          dataIndex: "fullname",
          title: "Full name",
          sorter: true,
          width: 150,
        },
        {
          key: "role",
          dataIndex: "role",
          title: "Role",
          sorter: true,
          width: 100,
          render: (v) => {
            return <span className="capitalize">{v.replaceAll("_", " ")}</span>;
          },
        },
      ] as ColumnsType<any>,
    [prepareEdit, prepareDelete]
  );

  return columns;
};

export const createUserSchema = (formStatus) => {
  return yup.object().shape({
    ...(formStatus === "create" || formStatus === "update"
      ? {
          username: yup
            .string()
            .typeError("Username lengkap harus diisi")
            .required("Username lengkap harus diisi"),
          role: yup
            .string()
            .typeError("Role harus diisi")
            .required("Role harus diisi")
            .oneOf(
              [
                "admin",
                "mitra",
                "commerce",
                "wh",
                "telkom",
                "first_tier",
                "tl",
              ],
              "Role tidak valid"
            ),
          fullname: yup
            .string()
            .typeError("Fullname lengkap harus diisi")
            .required("Fullname lengkap harus diisi"),
          password: yup
            .string()
            .nullable()
            .transform((o, c) => (o === "" ? null : c))
            .min(6, "Password minimal harus terdiri dari 6 karakter"),
        }
      : {}),
    ...(formStatus === "create"
      ? {
          password: yup
            .string()
            .required("Password harus diisi")
            .min(6, "Password minimal harus terdiri dari 6 karakter"),
        }
      : {}),
  });
};
