import React, { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup";
import { useQueryClient } from "@tanstack/react-query";
import { Breadcrumb, Button, Modal, notification } from "antd";
import Pagination, { usePagination } from "src/components/Pagination";
import TableExtended from "src/components/TableExtended";
import FInput from "src/components/form/FInput";
import { removeFalsyValue } from "src/helpers/utils";
import { useJobTypeService } from "src/services/jobType.service";

import { jobTypeSchema, useJobTypeColumns } from "./config";
import FilterUnit from "./partials/FilterJobType";

const JobType = () => {
  const pagination = usePagination();
  const queryClient = useQueryClient();
  const { qJobType, createMutation, updateMutation, deleteMutation } =
    useJobTypeService(pagination);
  const [id, setId] = useState();
  const [showModal, setShowModal] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);

  const form = useForm({ resolver: yupResolver(jobTypeSchema) });

  // Function for Crud Preparation
  const prepareCreate = () => {
    setShowModal(true);
    setId(null);
    form.reset({ name: "" });
  };
  const prepareEdit = (record) => {
    setShowModal(true);
    setId(record?.id);
    form.reset({
      name: record?.name,
    });
  };
  const prepareDelete = (record) => {
    setConfirmDelete(true);
    setId(record?.id);
  };
  const columns = useJobTypeColumns(prepareEdit, prepareDelete);

  // Function for Crud Action
  const onSubmit = async (values) => {
    const newValues: any = removeFalsyValue(values);

    if (!!id) {
      await updateMutation.mutateAsync(
        { ...newValues, id },
        {
          onSuccess: () => {
            queryClient.invalidateQueries(["getAllJobType"]);
            notification.success({
              message: "Berhasil update jenis pekerjaan",
            });
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
          queryClient.invalidateQueries(["getAllJobType"]);
          notification.success({ message: "Berhasil tambah jenis pekerjaan" });
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
        queryClient.invalidateQueries(["getAllJobType"]);
        notification.success({ message: "Berhasil hapus jenis pekerjaan" });
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
        <Breadcrumb.Item>Jenis Pekerjaan</Breadcrumb.Item>
      </Breadcrumb>
      <FilterUnit setDomain={pagination.setDomain} />
      <div className="flex justify-between items-center gap-4 flex-wrap mb-4">
        <Pagination
          page={pagination.page}
          total={qJobType.length}
          limit={pagination.limit}
          onChange={pagination.onChangePagination}
        />
        <Button type="primary" onClick={prepareCreate}>
          Tambah
        </Button>
      </div>
      <TableExtended
        columns={columns}
        dataSource={qJobType.data}
        loading={
          qJobType.isLoading ||
          qJobType.isFetching ||
          createMutation.isLoading ||
          updateMutation.isLoading ||
          deleteMutation.isLoading
        }
        setSorter={pagination.setSort}
        rowKey="id"
      />
      <FormProvider {...form}>
        <Modal
          title={!!id ? "Edit Jenis Pekerjaan" : "Tambah Jenis Pekerjaan"}
          okText={!!id ? "Update" : "Create"}
          open={showModal}
          onOk={form.handleSubmit(onSubmit)}
          confirmLoading={createMutation.isLoading || updateMutation.isLoading}
          onCancel={setShowModal.bind(this, false)}
        >
          <div className="flex flex-col gap-1 mb-4">
            <label className="text-sm font-medium">Jenis Pekerjaan</label>
            <FInput name="name" placeholder="Input" />
          </div>
        </Modal>
      </FormProvider>
      <Modal
        title={"Delete Jenis Pekerjaan"}
        okText={"Delete"}
        open={confirmDelete}
        okButtonProps={{
          style: { background: "rgb(239 68 68)", border: "none" },
        }}
        onOk={handleDelete}
        confirmLoading={deleteMutation.isLoading}
        onCancel={setConfirmDelete.bind(this, false)}
      >
        Yakin hapus data jenis pekerjaan ?
      </Modal>
    </>
  );
};

export default JobType;
