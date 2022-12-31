import React, { useEffect } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { yupResolver } from "@hookform/resolvers/yup";
import {
  Breadcrumb,
  Col,
  Descriptions,
  notification,
  Row,
  Space,
  Spin,
} from "antd";
import Button from "antd-button-color";
import { format } from "date-fns";
import MitraSelector from "src/components/filters/MitraSelector";
import useIncidentRead from "src/data/useIncidentRead";
import useUrlQuery from "src/helpers/useUrlQuery";
import { useIncidentService } from "src/services/incident.service";

import { firstTierSchema } from "./config";
import TableLineItems from "./partials/TableLineItems";

const DetailFirstTier = () => {
  const navigate = useNavigate();
  const query = useUrlQuery();
  const {
    data: incident,
    isLoading,
    isFetching,
  } = useIncidentRead({
    id: query?.id,
    options: { enabled: !!query?.id },
  });
  console.log({ incident });
  const {
    updateMutation,
    confirmFirstTierMutation,
    returnToMitraMutation,
    closeIncidentMutation,
  } = useIncidentService({
    enableFetch: false,
  });
  const form = useForm({
    resolver: yupResolver(firstTierSchema),
  });

  // Handlers
  const generateDataSubmit = (values) => {
    const incidentDetails = (values?.incident_details || []).map((detail) => ({
      id: detail?.incidet_detail_id,
      item_id: detail?.item_id,
      job_detail: detail?.job_detail,
      qty: detail?.qty,
      approve_wh: detail?.approve_wh,
      orm_code: detail?.orm_code,
    }));

    const deletedIds = incident?.IncidentDetails.filter(
      (detail) =>
        !values?.incident_details.find((d) => d.incidet_detail_id === detail.id)
    ).map((d) => ({ id: d.id, orm_code: "delete" }));
    incidentDetails.push(...deletedIds);

    return {
      assigned_mitra: values?.assigned_mitra,
      incident_details: incidentDetails,
    };
  };

  const handleSaveDraft = async (values) => {
    const data = generateDataSubmit(values);
    await updateMutation.mutateAsync(
      {
        id: query?.id,
        ...data,
      },
      {
        onSuccess: () => {
          navigate("/admin/first-tier");
          notification.success({ message: "Berhasil update data" });
        },
        onError: (error: any) => {
          notification.error({
            message: error?.response?.data?.message || error?.message,
          });
        },
      }
    );
  };

  const handleSubmit = async (values) => {
    try {
      const data = generateDataSubmit(values);
      await updateMutation.mutateAsync({
        id: query?.id,
        ...data,
      });
      await confirmFirstTierMutation.mutateAsync(Number(query?.id), {
        onSuccess: () => {
          navigate("/admin/first-tier");
          notification.success({ message: "Berhasil update data" });
        },
      });
    } catch (err) {
      notification.error({
        message: err?.response?.data?.message || err?.message,
      });
    }

    // onSuccess: () => {
    //   navigate("/admin/first-tier");
    //   notification.success({ message: "Berhasil update data" });
    // },
  };

  const handleReturnToMitra = async (values) => {
    try {
      const data = generateDataSubmit(values);
      await updateMutation.mutateAsync({
        id: query?.id,
        ...data,
      });
      await returnToMitraMutation.mutateAsync(Number(query?.id), {
        onSuccess: () => {
          navigate("/admin/first-tier");
          notification.success({ message: "Berhasil update data" });
        },
      });
    } catch (err) {
      notification.error({
        message: err?.response?.data?.message || err?.message,
      });
    }
  };

  const handleCloseIncident = async (values) => {
    try {
      const data = generateDataSubmit(values);
      await updateMutation.mutateAsync({
        id: query?.id,
        ...data,
      });
      await closeIncidentMutation.mutateAsync(Number(query?.id), {
        onSuccess: () => {
          navigate("/admin/first-tier");
          notification.success({ message: "Berhasil update data" });
        },
      });
    } catch (err) {
      notification.error({
        message: err?.response?.data?.message || err?.message,
      });
    }

    // onSuccess: () => {
    //   navigate("/admin/first-tier");
    //   notification.success({ message: "Berhasil update data" });
    // },
  };

  // USEEFFECT
  useEffect(() => {
    form.reset({
      assigned_mitra: incident?.assigned_mitra,

      incident_details: incident?.IncidentDetails?.map((details) => ({
        incidet_detail_id: details?.id,
        item_id: details?.item_id,
        item_code: details?.item?.item_code,
        material_designator: details?.item?.material_designator,
        service_designator: details?.item?.service_designator,
        unit_name: details?.item?.unit?.unit_name,
        qty: details?.qty,
        approve_wh: details?.approve_wh,
        job_detail: details?.job_detail,
        actual_qty: details?.actual_qty,
        orm_code: "update",
      })),
    });
  }, [incident, form]);
  return (
    <>
      <FormProvider {...form}>
        <Breadcrumb className="mb-8">
          <Breadcrumb.Item>Admin</Breadcrumb.Item>
          <Breadcrumb.Item>Tier 1</Breadcrumb.Item>
          <Breadcrumb.Item>Detail</Breadcrumb.Item>
        </Breadcrumb>
        <Spin spinning={isLoading || isFetching}>
          <Row gutter={[32, 32]}>
            <Col span={24}>
              <Descriptions
                bordered
                size="middle"
                layout="horizontal"
                column={2}
                labelStyle={{
                  background: "#eee",
                  margin: "0 1rem",
                  fontWeight: "bold",
                }}
                contentStyle={{ background: "#fff" }}
              >
                <Descriptions.Item label="ID">
                  {incident?.incident_code}
                </Descriptions.Item>
                <Descriptions.Item label="Tiket Gamas">
                  {incident?.incident}
                </Descriptions.Item>
                <Descriptions.Item label="Posisi">
                  {incident?.on_tier?.replaceAll("_", " ")?.toUpperCase()}
                </Descriptions.Item>
                <Descriptions.Item label="Status">
                  {incident?.[`status_${incident?.on_tier}`]
                    ?.replaceAll("_", " ")
                    ?.toUpperCase()}
                </Descriptions.Item>
                <Descriptions.Item label="Tanggal Masuk">
                  {incident?.open_at
                    ? format(new Date(incident?.open_at), "dd/MM/yyyy hh:mm")
                    : ""}
                </Descriptions.Item>
                <Descriptions.Item
                  label="Mitra"
                  className="description-required"
                >
                  <MitraSelector
                    name="assigned_mitra"
                    className="w-full"
                    placeholder="Select"
                  />
                </Descriptions.Item>
                <Descriptions.Item label="Summary">
                  {incident?.summary}
                </Descriptions.Item>
              </Descriptions>
            </Col>
            <Col span={24} className="flex">
              <Space>
                <Button
                  loading={
                    updateMutation.isLoading ||
                    confirmFirstTierMutation.isLoading
                  }
                  onClick={form.handleSubmit(handleSaveDraft)}
                >
                  Save draft
                </Button>
                {incident?.status_tier_1 === "mitra_done" ? (
                  <Button
                    type="primary"
                    loading={
                      updateMutation.isLoading ||
                      confirmFirstTierMutation.isLoading
                    }
                    onClick={form.handleSubmit(handleReturnToMitra)}
                  >
                    Return to Mitra
                  </Button>
                ) : (
                  <Button
                    type="primary"
                    loading={
                      updateMutation.isLoading ||
                      confirmFirstTierMutation.isLoading
                    }
                    onClick={form.handleSubmit(handleSubmit)}
                  >
                    Send to Mitra
                  </Button>
                )}

                <Button
                  type="primary"
                  loading={
                    updateMutation.isLoading ||
                    confirmFirstTierMutation.isLoading
                  }
                  onClick={form.handleSubmit(handleCloseIncident)}
                >
                  Close Pekerjaan
                </Button>
              </Space>
            </Col>
          </Row>

          <TableLineItems />
        </Spin>
      </FormProvider>
    </>
  );
};

export default DetailFirstTier;
