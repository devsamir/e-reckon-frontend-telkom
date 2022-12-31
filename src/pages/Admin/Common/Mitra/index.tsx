import React, { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup";
import { useQueryClient } from "@tanstack/react-query";
import { Breadcrumb, Button, Modal, notification } from "antd";
import Pagination, { usePagination } from "src/components/Pagination";
import TableExtended from "src/components/TableExtended";
import FInput from "src/components/form/FInput";
import { pick, removeFalsyValue } from "src/helpers/utils";
import { useMitraService } from "src/services/mitra.service";

import { itemSchema, useMitraColumn } from "./config";
import FilterMitra from "./partials/FilterMitra";

const Mitra = () => {
  const pagination = usePagination();
  const queryClient = useQueryClient();
  const { qMitra, createMutation, updateMutation, deleteMutation } =
    useMitraService(pagination);
  const [id, setId] = useState();
  const [showModal, setShowModal] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);

  const form = useForm({ resolver: yupResolver(itemSchema) });

  // Function for Crud Preparation
  const prepareCreate = () => {
    setShowModal(true);
    setId(null);
    form.reset({
      shortname: "",
      fullname: "",
    });
  };
  const prepareEdit = (record) => {
    setShowModal(true);
    setId(record?.id);
    form.reset(pick(record, ["shortname", "fullname"]));
  };
  const prepareDelete = (record) => {
    setConfirmDelete(true);
    setId(record?.id);
  };
  const columns = useMitraColumn(prepareEdit, prepareDelete);

  // Function for Crud Action
  const onSubmit = async (values) => {
    const newValues: any = removeFalsyValue(values);

    if (!!id) {
      await updateMutation.mutateAsync(
        { ...newValues, id },
        {
          onSuccess: () => {
            queryClient.invalidateQueries(["getAllMitra"]);
            notification.success({ message: "Berhasil update mitra" });
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
          queryClient.invalidateQueries(["getAllMitra"]);
          notification.success({ message: "Berhasil tambah mitra" });
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
        queryClient.invalidateQueries(["getAllMitra"]);
        notification.success({ message: "Berhasil hapus mitra" });
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
        <Breadcrumb.Item>Mitra</Breadcrumb.Item>
      </Breadcrumb>
      <FilterMitra setDomain={pagination.setDomain} />
      <div className="flex justify-between items-center gap-4 flex-wrap mb-4">
        <Pagination
          page={pagination.page}
          total={qMitra.length}
          limit={pagination.limit}
          onChange={pagination.onChangePagination}
        />
        <Button type="primary" onClick={prepareCreate}>
          Tambah
        </Button>
      </div>
      <TableExtended
        columns={columns}
        dataSource={qMitra.data}
        loading={
          qMitra.isLoading ||
          qMitra.isFetching ||
          createMutation.isLoading ||
          updateMutation.isLoading ||
          deleteMutation.isLoading
        }
        setSorter={pagination.setSort}
        rowKey="id"
      />
      <FormProvider {...form}>
        <Modal
          title={!!id ? "Edit Mitra" : "Tambah Mitra"}
          okText={!!id ? "Update" : "Create"}
          open={showModal}
          onOk={form.handleSubmit(onSubmit)}
          confirmLoading={createMutation.isLoading || updateMutation.isLoading}
          onCancel={setShowModal.bind(this, false)}
        >
          <div className="flex flex-col gap-1 mb-4">
            <label className="text-sm font-medium">Nama Pendek Mitra</label>
            <FInput name="shortname" placeholder="Input" />
          </div>
          <div className="flex flex-col gap-1 mb-4">
            <label className="text-sm font-medium">Nama Mitra</label>
            <FInput name="fullname" placeholder="Input" />
          </div>
        </Modal>
      </FormProvider>
      <Modal
        title={"Delete Mitra"}
        okText={"Delete"}
        open={confirmDelete}
        okButtonProps={{
          style: { background: "rgb(239 68 68)", border: "none" },
        }}
        onOk={handleDelete}
        confirmLoading={deleteMutation.isLoading}
        onCancel={setConfirmDelete.bind(this, false)}
      >
        Yakin hapus data mitra ?
      </Modal>
    </>
  );
};

export default Mitra;
