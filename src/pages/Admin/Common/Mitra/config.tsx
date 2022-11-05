import { useMemo } from 'react';
import type { ColumnsType } from 'antd/es/table';
import * as yup from 'yup';
import { EditFilled, DeleteFilled } from '@ant-design/icons';
import Button from 'antd-button-color';

export const useItemColumns = (prepareEdit, prepareDelete) => {
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
          key: 'shortname',
          dataIndex: 'shortname',
          title: 'Nama Pendek Mitra',
          width: 150,
          sorter: true,
        },
        {
          key: 'fullname',
          dataIndex: 'fullname',
          title: 'Nama Mitra',
          width: 175,
          sorter: true,
        },
      ] as ColumnsType<any>,
    [prepareEdit, prepareDelete]
  );

  return columns;
};

export const itemSchema = yup.object().shape({
  shortname: yup
    .string()
    .typeError('Nama Pendek Mitra harus diisi')
    .required('Nama Pendek Mitra harus diisi')
    .max(15, 'Nama Pendek Mitra tidak boleh lebih dari 15 karakter'),
  fullname: yup
    .string()
    .typeError('Nama Mitra harus diisi')
    .required('Nama Mitra harus diisi')
    .max(100, 'Nama Mitra tidak boleh lebih dari 100 karakter'),
});
