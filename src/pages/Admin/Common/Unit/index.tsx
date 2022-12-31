import React, { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup";
import { useQueryClient } from "@tanstack/react-query";
import { Breadcrumb, Button, Modal, notification } from "antd";
import Pagination, { usePagination } from "src/components/Pagination";
import TableExtended from "src/components/TableExtended";
import FInput from "src/components/form/FInput";
import { removeFalsyValue } from "src/helpers/utils";
import { useUnitService } from "src/services/unit.service";

import { unitSchema, useUnitColumns } from "./config";
import FilterUnit from "./partials/FilterUnit";

const Unit = () => {
  const pagination = usePagination();
  const queryClient = useQueryClient();
  const { qUnit, createMutation, updateMutation, deleteMutation } =
    useUnitService(pagination);
  const [id, setId] = useState();
  const [showModal, setShowModal] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);

  const form = useForm({ resolver: yupResolver(unitSchema) });

  // Function for Crud Preparation
  const prepareCreate = () => {
    setShowModal(true);
    setId(null);
    form.reset({ unit_name: "" });
  };
  const prepareEdit = (record) => {
    setShowModal(true);
    setId(record?.id);
    form.reset({
      unit_name: record?.unit_name,
    });
  };
  const prepareDelete = (record) => {
    setConfirmDelete(true);
    setId(record?.id);
  };
  const columns = useUnitColumns(prepareEdit, prepareDelete);

  // Function for Crud Action
  const onSubmit = async (values) => {
    const newValues: any = removeFalsyValue(values);

    if (!!id) {
      await updateMutation.mutateAsync(
        { ...newValues, id },
        {
          onSuccess: () => {
            queryClient.invalidateQueries(["getAllUnit"]);
            notification.success({ message: "Berhasil update unit" });
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
          queryClient.invalidateQueries(["getAllUnit"]);
          notification.success({ message: "Berhasil tambah unit" });
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
        queryClient.invalidateQueries(["getAllUnit"]);
        notification.success({ message: "Berhasil hapus unit" });
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
        <Breadcrumb.Item>Unit</Breadcrumb.Item>
      </Breadcrumb>
      <FilterUnit setDomain={pagination.setDomain} />
      <div className="flex justify-between items-center gap-4 flex-wrap mb-4">
        <Pagination
          page={pagination.page}
          total={qUnit.length}
          limit={pagination.limit}
          onChange={pagination.onChangePagination}
        />
        <Button type="primary" onClick={prepareCreate}>
          Tambah
        </Button>
      </div>
      <TableExtended
        columns={columns}
        dataSource={qUnit.data}
        loading={
          qUnit.isLoading ||
          qUnit.isFetching ||
          createMutation.isLoading ||
          updateMutation.isLoading ||
          deleteMutation.isLoading
        }
        setSorter={pagination.setSort}
        rowKey="id"
      />
      <FormProvider {...form}>
        <Modal
          title={!!id ? "Edit Unit" : "Tambah Unit"}
          okText={!!id ? "Update" : "Create"}
          open={showModal}
          onOk={form.handleSubmit(onSubmit)}
          confirmLoading={createMutation.isLoading || updateMutation.isLoading}
          onCancel={setShowModal.bind(this, false)}
        >
          <div className="flex flex-col gap-1 mb-4">
            <label className="text-sm font-medium">Unit</label>
            <FInput name="unit_name" placeholder="Input" />
          </div>
        </Modal>
      </FormProvider>
      <Modal
        title={"Delete Unit"}
        okText={"Delete"}
        open={confirmDelete}
        okButtonProps={{
          style: { background: "rgb(239 68 68)", border: "none" },
        }}
        onOk={handleDelete}
        confirmLoading={deleteMutation.isLoading}
        onCancel={setConfirmDelete.bind(this, false)}
      >
        Yakin hapus data unit ?
      </Modal>
    </>
  );
};

export default Unit;
