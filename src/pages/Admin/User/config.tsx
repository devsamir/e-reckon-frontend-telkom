import { useMemo } from 'react';
import type { ColumnsType } from 'antd/es/table';
import * as yup from 'yup';
import { EditFilled, DeleteFilled } from '@ant-design/icons';
import Button from 'antd-button-color';

export const useUserColumns = (prepareEdit, prepareDelete) => {
  const columns = useMemo(
    () =>
      [
        {
          key: 'action',
          title: 'Action',
          width: 125,
          fixed: 'left',
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
          key: 'username',
          dataIndex: 'username',
          title: 'Username',
          sorter: true,
        },
        {
          key: 'fullname',
          dataIndex: 'fullname',
          title: 'Full name',
          sorter: true,
        },
        {
          key: 'level',
          dataIndex: 'level',
          title: 'Role',
          sorter: true,
        },
      ] as ColumnsType<any>,
    [prepareEdit, prepareDelete]
  );

  return columns;
};

export const createUserSchema = (formStatus) => {
  return yup.object().shape({
    ...(formStatus === 'create' || formStatus === 'update'
      ? {
          username: yup
            .string()
            .typeError('Username lengkap harus diisi')
            .required('Username lengkap harus diisi'),
          level: yup
            .number()
            .typeError('Role harus diisi')
            .required('Role harus diisi'),
          fullname: yup
            .string()
            .typeError('Fullname lengkap harus diisi')
            .required('Fullname lengkap harus diisi'),
          password: yup
            .string()
            .nullable()
            .transform((o, c) => (o === '' ? null : c))
            .min(6, 'Password minimal harus terdiri dari 6 karakter'),
        }
      : {}),
    ...(formStatus === 'create'
      ? {
          password: yup
            .string()
            .required('Password harus diisi')
            .min(6, 'Password minimal harus terdiri dari 6 karakter'),
        }
      : {}),
  });
};
