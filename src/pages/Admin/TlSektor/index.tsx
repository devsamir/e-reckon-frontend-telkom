import React, { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup";
import { useQueryClient } from "@tanstack/react-query";
import { Breadcrumb, Button, Modal, notification } from "antd";
import Pagination, { usePagination } from "src/components/Pagination";
import TableExtended from "src/components/TableExtended";
import FInput from "src/components/form/FInput";
import FSelect from "src/components/form/FSelect";
import { pick, removeFalsyValue } from "src/helpers/utils";
import { useIncidentService } from "src/services/incident.service";

import { formTLSchema, useFormTLColumns } from "./config";
import FilterTLSektor from "./partials/FilterTLSektor";

const jobTypeOpt = [
  {
    label: "PEMBENAHAN",
    value: "PEMBENAHAN",
  },
  {
    label: "GAMAS",
    value: "GAMAS",
  },
  {
    label: "LAINNYA",
    value: "LAINNYA",
  },
];

const TlSektor = () => {
  const pagination = usePagination();
  const queryClient = useQueryClient();
  const { qIncident, createMutation, updateMutation, deleteMutation } =
    useIncidentService(pagination);
  const [id, setId] = useState();
  const [showModal, setShowModal] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);

  const form = useForm({ resolver: yupResolver(formTLSchema) });

  // Function for Crud Preparation
  const prepareCreate = () => {
    setShowModal(true);
    setId(null);
    form.reset({
      incident: "",
      summary: "",
      job_type: "PEMBENAHAN",
    });
  };
  const prepareEdit = (record) => {
    setShowModal(true);
    setId(record?.id);
    form.reset(pick(record, ["incident", "summary", "job_type"]));
  };
  const prepareDelete = (record) => {
    setConfirmDelete(true);
    setId(record?.id);
  };
  const columns = useFormTLColumns(prepareEdit, prepareDelete);

  // Function for Crud Action
  const onSubmit = async (values) => {
    const newValues: any = removeFalsyValue(values);

    if (!!id) {
      await updateMutation.mutateAsync(
        { ...newValues, id },
        {
          onSuccess: () => {
            queryClient.invalidateQueries(["getAllIncident"]);
            notification.success({ message: "Berhasil update incident" });
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
          queryClient.invalidateQueries(["getAllIncident"]);
          notification.success({ message: "Berhasil tambah incident" });
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
        queryClient.invalidateQueries(["getAllIncident"]);
        notification.success({ message: "Berhasil hapus incident" });
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
        <Breadcrumb.Item>Form TL Sektor</Breadcrumb.Item>
      </Breadcrumb>
      <FilterTLSektor setDomain={pagination.setDomain} />
      <div className="flex justify-between items-center gap-4 flex-wrap">
        <Pagination
          page={pagination.page}
          total={qIncident.length}
          limit={pagination.limit}
          onChange={pagination.onChangePagination}
        />
        <Button type="primary" onClick={prepareCreate}>
          Tambah
        </Button>
      </div>
      <TableExtended
        columns={columns}
        dataSource={qIncident.data}
        loading={
          qIncident.isLoading ||
          qIncident.isFetching ||
          createMutation.isLoading ||
          updateMutation.isLoading ||
          deleteMutation.isLoading
        }
        setSorter={pagination.setSort}
        rowKey="id"
      />

      <FormProvider {...form}>
        <Modal
          title={!!id ? "Edit Incident" : "Tambah Incident"}
          okText={!!id ? "Update" : "Create"}
          open={showModal}
          onOk={form.handleSubmit(onSubmit)}
          confirmLoading={createMutation.isLoading || updateMutation.isLoading}
          onCancel={setShowModal.bind(this, false)}
        >
          <div className="flex flex-col gap-1 mb-4">
            <label className="text-sm font-medium">Tiket Gamas</label>
            <FInput name="incident" placeholder="Input" />
          </div>
          <div className="flex flex-col gap-1 mb-4">
            <label className="text-sm font-medium">Summary</label>
            <FInput name="summary" placeholder="Input" isTextArea rows={3} />
          </div>
          <div className="flex flex-col gap-1 mb-4">
            <label className="text-sm font-medium">Jenis Pekerjaan</label>
            <FSelect
              name="job_type"
              placeholder="Select"
              options={jobTypeOpt}
            />
          </div>
        </Modal>
      </FormProvider>
      <Modal
        title={"Delete Incident"}
        okText={"Delete"}
        open={confirmDelete}
        okButtonProps={{
          style: { background: "rgb(239 68 68)", border: "none" },
        }}
        onOk={handleDelete}
        confirmLoading={deleteMutation.isLoading}
        onCancel={setConfirmDelete.bind(this, false)}
      >
        Yakin hapus data Incident ?
      </Modal>
    </>
  );
};

export default TlSektor;
