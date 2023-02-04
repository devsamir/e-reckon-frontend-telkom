import React, { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup";
import { useQueryClient } from "@tanstack/react-query";
import { Breadcrumb, Button, Modal, notification } from "antd";
import Pagination, { usePagination } from "src/components/Pagination";
import TableExtended from "src/components/TableExtended";
import FInput from "src/components/form/FInput";
import FInputPassword from "src/components/form/FInputPassword";
import FSelect from "src/components/form/FSelect";
import { removeFalsyValue } from "src/helpers/utils";
import { useUserService } from "src/services/user.service";

import { createUserSchema, useUserColumns } from "./config";
import FilterUser, { roleOptions } from "./partials/FilterUser";

const User = () => {
  const pagination = usePagination();
  const queryClient = useQueryClient();
  const { qUser, createMutation, updateMutation, deleteMutation } =
    useUserService(pagination);
  const [id, setId] = useState();
  const [showModal, setShowModal] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);

  const userSchema = createUserSchema(id ? "update" : "create");
  const form = useForm({ resolver: yupResolver(userSchema) });

  const prepareCreate = () => {
    setShowModal(true);
    setId(null);
    form.reset({ username: null, fullname: null, role: null });
  };
  const prepareEdit = (record) => {
    setShowModal(true);
    setId(record?.id);
    form.reset({
      username: record?.username,
      fullname: record?.fullname,
      role: record?.role,
    });
  };
  const prepareDelete = (record) => {
    setConfirmDelete(true);
    setId(record?.id);
  };

  const columns = useUserColumns(prepareEdit, prepareDelete);
  const onSubmit = async (values) => {
    // Remove Null Value
    const newValues: any = removeFalsyValue(values);
    if (!!id) {
      await updateMutation.mutateAsync(
        { ...newValues, id },
        {
          onSuccess: () => {
            queryClient.invalidateQueries(["getAllUser"]);
            notification.success({ message: "Berhasil update user" });
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
          queryClient.invalidateQueries(["getAllUser"]);
          notification.success({ message: "Berhasil tambah user" });
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
        queryClient.invalidateQueries(["getAllUser"]);
        notification.success({ message: "Berhasil hapus user" });
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
        <Breadcrumb.Item>User</Breadcrumb.Item>
      </Breadcrumb>
      <FilterUser setDomain={pagination.setDomain} />
      <div className="flex justify-between items-center gap-4 flex-wrap mb-4">
        <Pagination
          page={pagination.page}
          total={qUser.length}
          limit={pagination.limit}
          onChange={pagination.onChangePagination}
        />
        <Button type="primary" onClick={prepareCreate}>
          Tambah
        </Button>
      </div>
      <TableExtended
        columns={columns}
        dataSource={qUser.data}
        loading={
          qUser.isLoading ||
          qUser.isFetching ||
          createMutation.isLoading ||
          updateMutation.isLoading ||
          deleteMutation.isLoading
        }
        setSorter={pagination.setSort}
        rowKey="id"
      />
      <FormProvider {...form}>
        <Modal
          title={!!id ? "Edit User" : "Tambah User"}
          okText={!!id ? "Update" : "Create"}
          open={showModal}
          onOk={form.handleSubmit(onSubmit)}
          confirmLoading={createMutation.isLoading || updateMutation.isLoading}
          onCancel={setShowModal.bind(this, false)}
        >
          <div className="flex flex-col gap-1 mb-4">
            <label className="text-sm font-medium">Email</label>
            <FInput name="username" placeholder="Input" />
          </div>
          <div className="flex flex-col gap-1 mb-4">
            <label className="text-sm font-medium">Nama Lengkap</label>
            <FInput name="fullname" placeholder="Input" />
          </div>
          <div className="flex flex-col gap-1 mb-4">
            <label className="text-sm font-medium">Role</label>
            <FSelect name="role" placeholder="Select" options={roleOptions} />
          </div>
          <div className="flex flex-col gap-1 mb-4">
            <label className="text-sm font-medium">Password</label>
            <FInputPassword name="password" placeholder="Input" />
          </div>
        </Modal>
      </FormProvider>
      <Modal
        title={"Delete User"}
        okText={"Delete"}
        open={confirmDelete}
        okButtonProps={{
          style: { background: "rgb(239 68 68)", border: "none" },
        }}
        onOk={handleDelete}
        confirmLoading={deleteMutation.isLoading}
        onCancel={setConfirmDelete.bind(this, false)}
      >
        Yakin hapus data user ?
      </Modal>
    </>
  );
};

export default User;
