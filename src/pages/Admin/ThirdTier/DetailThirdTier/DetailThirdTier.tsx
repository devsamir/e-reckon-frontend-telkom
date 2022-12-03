import React, { useEffect } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { useNavigate } from "react-router-dom";

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
import FInput from "src/components/form/FInput";
import useIncidentRead from "src/data/useIncidentRead";
import useUrlQuery from "src/helpers/useUrlQuery";
import { useIncidentService } from "src/services/incident.service";

import TableLineItems from "./partials/TableLineItems";

const DetailThirdTier = () => {
  const navigate = useNavigate();
  const query = useUrlQuery();
  const {
    data: incident = {},
    isLoading,
    isFetching,
  } = useIncidentRead({
    id: query?.id,
    options: { enabled: !!query?.id },
  });

  const { returnToSecondTierMutation, closeIncidentMutation } =
    useIncidentService({
      enableFetch: false,
    });
  const form = useForm();

  const handleReturnTier2 = async () => {
    try {
      await returnToSecondTierMutation.mutateAsync(Number(query?.id), {
        onSuccess: () => {
          navigate("/admin/third-tier");
          notification.success({ message: "Berhasil update data" });
        },
      });
    } catch (err) {
      notification.error({
        message: err?.response?.data?.message || err?.message,
      });
    }
  };
  const handleCloseIncident = async () => {
    try {
      await closeIncidentMutation.mutateAsync(Number(query?.id), {
        onSuccess: () => {
          navigate("/admin/third-tier");
          notification.success({ message: "Berhasil update data" });
        },
      });
    } catch (err) {
      notification.error({
        message: err?.response?.data?.message || err?.message,
      });
    }
  };
  //
  // USEEFFECT
  useEffect(() => {
    form.reset({
      incident_code: incident?.incident_code,
      incident: incident?.incident,
      summary: incident?.summary,
      on_tier: incident?.on_tier.replaceAll("_", " ").toUpperCase(),
      status: incident?.[`status_${incident?.on_tier}`].toUpperCase(),
      assigned_mitra: incident?.assigned_mitra,
      created_at: incident?.created_at
        ? format(new Date(incident?.created_at), "dd/MM/yyyy HH:mm")
        : incident?.created_at,

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
        orm_code: "update",
      })),
    });
  }, [incident, form]);

  return (
    <>
      <FormProvider {...form}>
        <Breadcrumb className="mb-8">
          <Breadcrumb.Item>Admin</Breadcrumb.Item>
          <Breadcrumb.Item>Tier 3</Breadcrumb.Item>
          <Breadcrumb.Item>Detail</Breadcrumb.Item>
        </Breadcrumb>
        <Spin spinning={isLoading || isFetching}>
          <Row gutter={[32, 32]}>
            <Col span={24}>
              <Descriptions
                bordered
                size="default"
                layout="horizontal"
                column={1}
                labelStyle={{
                  background: "rgb(30, 64, 175)",
                  color: "white",
                  margin: "0 1rem",
                }}
                contentStyle={{ background: "#fff" }}
              >
                <Descriptions.Item label="ID">
                  {incident?.incident_code}
                </Descriptions.Item>
                <Descriptions.Item label="Tiket Gamas">
                  {incident?.incident}
                </Descriptions.Item>
                <Descriptions.Item label="Summary">
                  {incident?.summary}
                </Descriptions.Item>
                <Descriptions.Item label="Posisi">
                  {incident?.on_tier?.replaceAll("_", " ")?.toUpperCase()}
                </Descriptions.Item>
                <Descriptions.Item label="Status">
                  {incident?.[`status_${incident?.on_tier}`]?.toUpperCase()}
                </Descriptions.Item>
                <Descriptions.Item label="Tanggal Masuk">
                  {incident?.open_at
                    ? format(new Date(incident?.open_at), "dd/MM/yyyy hh:mm")
                    : ""}
                </Descriptions.Item>
                <Descriptions.Item label="Mitra">
                  {`(${incident?.assignedMitra?.shortname}) ${incident?.assignedMitra?.fullname}`}
                </Descriptions.Item>
              </Descriptions>
            </Col>
            <Col span={24} className="flex">
              <Space>
                <Button
                  type="primary"
                  loading={
                    closeIncidentMutation.isLoading ||
                    returnToSecondTierMutation.isLoading
                  }
                  onClick={handleReturnTier2}
                >
                  Return to Tier 2
                </Button>
                <Button
                  type="primary"
                  loading={
                    closeIncidentMutation.isLoading ||
                    returnToSecondTierMutation.isLoading
                  }
                  onClick={handleCloseIncident}
                >
                  Close Tiket
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

export default DetailThirdTier;
