import React, { useRef } from "react";
import { useFormContext, useFieldArray } from "react-hook-form";

import { ExclamationCircleFilled } from "@ant-design/icons";
import Button from "antd-button-color";
import Pagination, { usePagination } from "src/components/Pagination";
import TableExtended from "src/components/TableExtended";

import { useTableLineColumns } from "../config";
import ModalSelectItem from "./ModalSelectItem";

const TableLineItems = () => {
  const modalRef = useRef(null);
  const pagination = usePagination();
  const { control } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "incident_details",
  });
  // FUNCTION
  const handleOpenItemModal = () => {
    modalRef.current?.openModal(true);
  };
  const handleSelect = (values) => {
    values.forEach((value) => {
      append({
        item_id: value.id,
        item_code: value.item_code,
        material_designator: value.material_designator,
        service_designator: value.service_designator,
        unit_name: value.unit?.unit_name,
        qty: null,
        approve_wh: "not_yet",
        job_detail: null,
        orm_code: "create",
      });
    });
  };

  const columns = useTableLineColumns(remove, pagination.offset);
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
      />
      {!fields.length && (
        <div className="text-red-500 flex items-center gap-2">
          <ExclamationCircleFilled />
          <small className="text-sm">Material item dibutuhkan</small>
        </div>
      )}

      <ModalSelectItem ref={modalRef} handleSelect={handleSelect} />
    </>
  );
};

export default TableLineItems;
