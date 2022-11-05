import { useMemo } from 'react';
import type { ColumnsType } from 'antd/es/table';
import * as yup from 'yup';
import { EditFilled, DeleteFilled } from '@ant-design/icons';
import Button from 'antd-button-color';

export const useUnitColumns = (prepareEdit, prepareDelete) => {
  const columns = useMemo(
    () =>
      [
        {
          key: 'unit_name',
          dataIndex: 'unit_name',
          title: 'Nama Unit',
          sorter: true,
        },

        {
          key: 'action',
          title: 'Action',
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
      ] as ColumnsType<any>,
    []
  );

  return columns;
};

export const unitSchema = yup.object().shape({
  unit_name: yup
    .string()
    .typeError('Nama unit harus diisi')
    .required('Nama unit harus diisi'),
});
