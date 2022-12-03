import React, { useRef } from "react";
import { useFormContext, useFieldArray } from "react-hook-form";

import { ExclamationCircleFilled } from "@ant-design/icons";
import Pagination, { usePagination } from "src/components/Pagination";
import TableExtended from "src/components/TableExtended";

import { useTableLineColumns } from "../config";

const TableLineItems = () => {
  const pagination = usePagination();
  const { control } = useFormContext();
  const { fields } = useFieldArray({
    control,
    name: "incident_details",
  });
  // FUNCTION

  const columns = useTableLineColumns(pagination.offset);
  //   Columns
  return (
    <>
      {/* <div className="flex justify-end mb-4">
        <Button type="ghost" onClick={handleOpenItemModal}>
          Tambah Item
        </Button>
      </div> */}
      <div className="mb-4">
        <Pagination
          limit={pagination.limit}
          onChange={pagination.onChangePagination}
          page={pagination.page}
          total={fields.length}
        />
      </div>
      <TableExtended
        columns={columns}
        dataSource={fields
          .filter((item: any) => item.orm_code !== "delete")
          .slice(pagination.offset, pagination.offset + pagination.limit)}
        selection={false}
      />
      {!fields.length && (
        <div className="text-red-500 flex items-center gap-2">
          <ExclamationCircleFilled />
          <small className="text-sm">Material item dibutuhkan</small>
        </div>
      )}
    </>
  );
};

export default TableLineItems;
