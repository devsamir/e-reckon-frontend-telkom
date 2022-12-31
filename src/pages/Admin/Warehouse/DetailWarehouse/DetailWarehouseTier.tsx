import React, { useEffect } from "react";
import { useForm, FormProvider, useWatch } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { yupResolver } from "@hookform/resolvers/yup";
import { Breadcrumb, Button, Col, Descriptions, Row, Space, Spin } from "antd";
import { format } from "date-fns";
import useIncidentRead from "src/data/useIncidentRead";
import useUrlQuery from "src/helpers/useUrlQuery";

import { warehouseTierSchema } from "./config";
import TableLineItems from "./partials/TableLineItems";

const DetailWarehouseTier = () => {
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

  const form = useForm({
    resolver: yupResolver(warehouseTierSchema),
  });

  // USEEFFECT
  useEffect(() => {
    form.reset({
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
          <Breadcrumb.Item>Tier WH</Breadcrumb.Item>
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
                  {incident?.[`status_${incident?.on_tier}`]?.toUpperCase()}
                </Descriptions.Item>
                <Descriptions.Item label="Tanggal Masuk">
                  {incident?.open_at
                    ? format(new Date(incident?.open_at), "dd/MM/yyyy hh:mm")
                    : ""}
                </Descriptions.Item>
                <Descriptions.Item label="Mitra">
                  {incident?.assignedMitra?.fullname}
                </Descriptions.Item>
                <Descriptions.Item label="Summary">
                  {incident?.summary}
                </Descriptions.Item>
              </Descriptions>
            </Col>
            <Col span={24} className="flex">
              <Space>
                <Button onClick={() => navigate("/admin/warehouse/order")}>
                  Back to list
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

export default DetailWarehouseTier;
