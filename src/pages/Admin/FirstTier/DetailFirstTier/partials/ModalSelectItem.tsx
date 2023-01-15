import React, { useImperativeHandle, useRef, useState } from "react";
import { useFormContext, useWatch } from "react-hook-form";

import { Modal } from "antd";
import Pagination, { usePagination } from "src/components/Pagination";
import TableExtended from "src/components/TableExtended";
import useItemSearchRead from "src/data/useItemSearchRead";
import { useItemColumns } from "src/pages/Admin/Commerce/ItemPrice/config";
import FilterItem from "src/pages/Admin/Commerce/ItemPrice/partials/FilterItem";

interface Props {
  handleSelect: any;
}

const ModalSelectItem = ({ handleSelect }: Props, ref: React.Ref<any>) => {
  const filterRef = useRef(null);
  const { control } = useFormContext<any>();

  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState([]);
  const columns = useItemColumns();
  const { limit, offset, domain, sort, ...pagination } = usePagination();

  const incidentDetails = useWatch({
    control,
    name: "incident_details",
    exact: true,
    defaultValue: [],
  });

  const qItem = useItemSearchRead({
    limit,
    offset,
    domain: [
      [
        "id",
        "not in",
        incidentDetails
          .filter((item) => item.orm_code !== "delete")
          .map((item) => item.item_id),
      ],
      ...domain,
    ],

    sort,
    include: ["unit_id"],
  });

  const openModal = (value) => {
    // reset everything
    setOpen(value);
    setSelected([]);
    pagination.setDomain([]);
    pagination.setPage(1);
    pagination.setLimit(10);
    filterRef.current?.resetForm();
  };
  const onSelect = () => {
    setOpen(false);
    handleSelect(selected?.[1]);
  };
  useImperativeHandle(ref, () => ({
    openModal,
  }));
  return (
    <Modal
      title={"Select Item"}
      okText={"Select"}
      open={open}
      width={1200}
      className="p-0"
      onCancel={setOpen.bind(this, false)}
      onOk={onSelect}
      okButtonProps={{ disabled: !selected?.[0]?.length }}
    >
      <div className="flex flex-col gap-4">
        <div className="-mt-8">
          <FilterItem setDomain={pagination.setDomain} ref={filterRef} />
        </div>
        <div className="mb-4">
          <Pagination
            page={pagination.page}
            total={qItem.length}
            limit={limit}
            onChange={pagination.onChangePagination}
          />
        </div>
        <TableExtended
          columns={columns.filter((col) => col.key !== "action")}
          dataSource={qItem.data}
          loading={qItem.isLoading || qItem.isFetching}
          setSorter={pagination.setSort}
          rowKey="id"
          onSelect={(keys, values) => {
            setSelected([keys, values]);
          }}
          selectedRows={selected?.[0]}
        />
      </div>
    </Modal>
  );
};

export default React.forwardRef(ModalSelectItem);
