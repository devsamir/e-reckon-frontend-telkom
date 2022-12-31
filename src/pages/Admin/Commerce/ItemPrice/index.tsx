import React, { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup";
import { useQueryClient } from "@tanstack/react-query";
import { Breadcrumb, Modal, notification } from "antd";
import Pagination, { usePagination } from "src/components/Pagination";
import TableExtended from "src/components/TableExtended";
import UnitSelector from "src/components/filters/UnitSelector";
import FInput from "src/components/form/FInput";
import FInputNumber from "src/components/form/FInputNumber";
import { pick, removeFalsyValue } from "src/helpers/utils";
import { useItemService } from "src/services/item.service";

import { itemSchema, useItemColumns } from "./config";
import FilterItem from "./partials/FilterItem";

const Item = () => {
  const pagination = usePagination();
  const queryClient = useQueryClient();
  const { qItem, createMutation, updateMutation, deleteMutation } =
    useItemService(pagination);
  const [id, setId] = useState();
  const [showModal, setShowModal] = useState(false);

  const form = useForm({ resolver: yupResolver(itemSchema) });

  // Function for Crud Preparation

  const prepareEdit = (record) => {
    setShowModal(true);
    setId(record?.id);
    form.reset(
      pick(record, [
        "item_code",
        "material_designator",
        "service_designator",
        "unit_id",
        "material_price_telkom",
        "service_price_telkom",
        "material_price_mitra",
        "service_price_mitra",
      ])
    );
  };

  const columns = useItemColumns(prepareEdit);

  // Function for Crud Action
  const onSubmit = async (values) => {
    const newValues: any = removeFalsyValue(values);

    if (!!id) {
      await updateMutation.mutateAsync(
        { ...newValues, id },
        {
          onSuccess: () => {
            queryClient.invalidateQueries(["getAllItem"]);
            notification.success({ message: "Berhasil update item" });
            setShowModal(false);
          },
          onError: (error: any) => {
            notification.error({
              message: error?.response?.data?.message || error?.message,
            });
          },
        }
      );
    } else {
      await createMutation.mutateAsync(newValues, {
        onSuccess: () => {
          queryClient.invalidateQueries(["getAllItem"]);
          notification.success({ message: "Berhasil tambah item" });
          setShowModal(false);
        },
        onError: (error: any) => {
          notification.error({
            message: error?.response?.data?.message || error?.message,
          });
        },
      });
    }
  };

  return (
    <>
      <Breadcrumb>
        <Breadcrumb.Item>Admin</Breadcrumb.Item>
        <Breadcrumb.Item>Commerce</Breadcrumb.Item>
        <Breadcrumb.Item>Item</Breadcrumb.Item>
      </Breadcrumb>
      <FilterItem setDomain={pagination.setDomain} />
      <div className="flex justify-between items-center gap-4 flex-wrap">
        <Pagination
          page={pagination.page}
          total={qItem.length}
          limit={pagination.limit}
          onChange={pagination.onChangePagination}
        />
      </div>
      <TableExtended
        columns={columns}
        dataSource={qItem.data}
        loading={
          qItem.isLoading ||
          qItem.isFetching ||
          createMutation.isLoading ||
          updateMutation.isLoading ||
          deleteMutation.isLoading
        }
        setSorter={pagination.setSort}
        rowKey="id"
      />
      <FormProvider {...form}>
        <Modal
          title={"Edit Item Price"}
          okText={"Update Item Price"}
          open={showModal}
          onOk={form.handleSubmit(onSubmit)}
          confirmLoading={createMutation.isLoading || updateMutation.isLoading}
          onCancel={setShowModal.bind(this, false)}
        >
          <div className="flex flex-col gap-1 mb-4">
            <label className="text-sm font-medium">Kode Item</label>
            <FInput name="item_code" placeholder="Input" disabled />
          </div>
          <div className="flex flex-col gap-1 mb-4">
            <label className="text-sm font-medium">Material Designator</label>
            <FInput name="material_designator" placeholder="Input" disabled />
          </div>
          <div className="flex flex-col gap-1 mb-4">
            <label className="text-sm font-medium">Jasa Designator</label>
            <FInput name="service_designator" placeholder="Input" disabled />
          </div>
          <div className="flex flex-col gap-1 mb-4">
            <label className="text-sm font-medium">Unit</label>
            <UnitSelector name="unit_id" placeholder="Select" disabled />
          </div>
          <div className="flex flex-col gap-1 mb-4">
            <label className="text-sm font-medium">Harga Material Telkom</label>
            <FInputNumber
              name="material_price_telkom"
              placeholder="Input Number"
            />
          </div>
          <div className="flex flex-col gap-1 mb-4">
            <label className="text-sm font-medium">Harga Jasa Telkom</label>
            <FInputNumber
              name="service_price_telkom"
              placeholder="Input Number"
            />
          </div>
          <div className="flex flex-col gap-1 mb-4">
            <label className="text-sm font-medium">Harga Material Mitra</label>
            <FInputNumber
              name="material_price_mitra"
              placeholder="Input Number"
            />
          </div>
          <div className="flex flex-col gap-1 mb-4">
            <label className="text-sm font-medium">Harga Jasa Mitra</label>
            <FInputNumber
              name="service_price_mitra"
              placeholder="Input Number"
            />
          </div>
        </Modal>
      </FormProvider>
    </>
  );
};

export default Item;
