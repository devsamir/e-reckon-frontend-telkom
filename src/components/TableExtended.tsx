import React from "react";

import type { ColumnsType } from "antd/es/table";

import { Table, TablePaginationConfig } from "antd";

interface Props {
  dataSource: any[];
  columns: ColumnsType<any>;
  selection?: boolean;
  selectionType?: "checkbox" | "radio";
  selectedRows?: string[] | number[];
  rowKey?: string;
  onSelect?: (selectedRowKeys?: React.Key[], selectedRows?: any[]) => void;
  setSorter?: any;
  size?: "small" | "middle" | "large";
  loading?: boolean;
  scroll?: {
    x?: string | number | true;
    y?: string | number;
  };
}

const TableExtended: React.FC<Props> = ({
  dataSource = [],
  columns,
  selection = true,
  rowKey = "id",
  onSelect,
  selectionType = "checkbox",
  selectedRows,
  setSorter,
  size = "small",
  scroll = { x: "100%", y: "70vh" },
  loading,
}) => {
  const fixData = dataSource.map((item) => ({ ...item, key: item?.[rowKey] }));

  return (
    <Table
      columns={columns}
      dataSource={fixData}
      loading={loading}
      pagination={false}
      size={size}
      bordered
      onChange={(_pagination, _filters, sorter: any) => {
        if (setSorter && sorter?.column?.dataIndex)
          return setSorter(
            `${sorter?.column?.dataIndex} ${sorter?.order?.replace("end", "")}`
          );
        setSorter(null);
      }}
      scroll={{ x: scroll.x, y: scroll.y }}
      {...(selection
        ? {
            rowSelection: {
              type: selectionType,
              getCheckboxProps(record) {
                return {
                  disabled: record?.isDisabled,
                  style: {
                    ...(record?.isDisabled ? { display: "none" } : {}),
                  },
                };
              },
              selectedRowKeys: selectedRows,
              onChange: (selectedRowKeys: React.Key[], selectedRow: any[]) => {
                if (onSelect) onSelect(selectedRowKeys, selectedRow);
              },
            },
          }
        : {})}
    />
  );
};

export default TableExtended;
