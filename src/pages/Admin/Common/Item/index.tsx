import React, { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup";
import { useQueryClient } from "@tanstack/react-query";
import { Breadcrumb, Button, Modal, notification } from "antd";
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
  const [confirmDelete, setConfirmDelete] = useState(false);

  const form = useForm({ resolver: yupResolver(itemSchema) });

  // Function for Crud Preparation
  const prepareCreate = () => {
    setShowModal(true);
    setId(null);
    form.reset({
      item_code: "",
      material_designator: "",
      service_designator: "",
      unit_id: "",
      material_price_telkom: "",
      service_price_telkom: "",
      material_price_mitra: "",
      service_price_mitra: "",
    });
  };
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
  const prepareDelete = (record) => {
    setConfirmDelete(true);
    setId(record?.id);
  };
  const columns = useItemColumns(prepareEdit, prepareDelete);

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
  const handleDelete = async () => {
    await deleteMutation.mutateAsync([id], {
      onSuccess: () => {
        queryClient.invalidateQueries(["getAllItem"]);
        notification.success({ message: "Berhasil hapus item" });
      },
      onError: (error: any) => {
        notification.error({
          message: error?.response?.data?.message || error?.message,
        });
      },
      onSettled: () => {
        setConfirmDelete(false);
      },
    });
  };
  return (
    <>
      <Breadcrumb>
        <Breadcrumb.Item>Admin</Breadcrumb.Item>
        <Breadcrumb.Item>Common</Breadcrumb.Item>
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
        <Button type="primary" onClick={prepareCreate}>
          Tambah
        </Button>
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
          title={!!id ? "Edit Item" : "Tambah Item"}
          okText={!!id ? "Update" : "Create"}
          open={showModal}
          onOk={form.handleSubmit(onSubmit)}
          confirmLoading={createMutation.isLoading || updateMutation.isLoading}
          onCancel={setShowModal.bind(this, false)}
        >
          <div className="flex flex-col gap-1 mb-4">
            <label className="text-sm font-medium">Kode Item</label>
            <FInput name="item_code" placeholder="Input" />
          </div>
          <div className="flex flex-col gap-1 mb-4">
            <label className="text-sm font-medium">Material Designator</label>
            <FInput name="material_designator" placeholder="Input" />
          </div>
          <div className="flex flex-col gap-1 mb-4">
            <label className="text-sm font-medium">Service Designator</label>
            <FInput name="service_designator" placeholder="Input" />
          </div>
          <div className="flex flex-col gap-1 mb-4">
            <label className="text-sm font-medium">Unit</label>
            <UnitSelector name="unit_id" placeholder="Select" />
          </div>
          <div className="flex flex-col gap-1 mb-4">
            <label className="text-sm font-medium">Harga Material Telkom</label>
            <FInputNumber
              name="material_price_telkom"
              placeholder="Input Number"
            />
          </div>
          <div className="flex flex-col gap-1 mb-4">
            <label className="text-sm font-medium">Harga Service Telkom</label>
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
            <label className="text-sm font-medium">Harga Service Mitra</label>
            <FInputNumber
              name="service_price_mitra"
              placeholder="Input Number"
            />
          </div>
        </Modal>
      </FormProvider>
      <Modal
        title={"Delete Item"}
        okText={"Delete"}
        open={confirmDelete}
        okButtonProps={{
          style: { background: "rgb(239 68 68)", border: "none" },
        }}
        onOk={handleDelete}
        confirmLoading={deleteMutation.isLoading}
        onCancel={setConfirmDelete.bind(this, false)}
      >
        Yakin hapus data item ?
      </Modal>
    </>
  );
};

export default Item;
