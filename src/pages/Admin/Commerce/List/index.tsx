import React, { useState } from "react";
import { useCookies } from "react-cookie";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Breadcrumb, notification } from "antd";
import Pagination, { usePagination } from "src/components/Pagination";
import TableExtended from "src/components/TableExtended";
import useIncidentSearchRead from "src/data/useIncidentSearchRead";
import ApiCall from "src/services/ApiCall";

import { useCommerceOrderColumns } from "./config";
import FilterCommerceOrder from "./partials/FilterCommerceOrder";

const CommerceOrder = () => {
  const [cookies] = useCookies();
  const queryClient = useQueryClient();
  const { limit, offset, domain, sort, ...pagination } = usePagination();

  const [editedRow, setEditedRow] = useState(null);
  const [commerceInput, setCommerceInput] = useState("");

  const qIncident = useIncidentSearchRead({
    limit,
    offset,
    domain: [...domain, ["on_tier", "=", "Commerce"]],
    sort,
    include: ["assigned_mitra", "datel_id", "job_type_id"],
  });

  const closeIncidentMutation = useMutation({
    mutationFn: ({ id, commerce_code }: any) =>
      ApiCall.post(
        `/incident/update-commerce-code`,
        { id, commerce_code },
        {
          headers: { token: cookies?.["token"] },
        }
      ),
  });

  const handleSave = async () => {
    await closeIncidentMutation.mutateAsync(
      {
        id: editedRow,
        commerce_code: commerceInput,
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries(["getAllIncident"]);
          setCommerceInput("");
          setEditedRow(null);
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

  const columns = useCommerceOrderColumns({
    editedRow,
    setEditedRow,
    commerceInput,
    setCommerceInput,
    handleSave,
    updateLoading: closeIncidentMutation.isLoading,
  });

  return (
    <>
      <Breadcrumb>
        <Breadcrumb.Item>Admin</Breadcrumb.Item>
        <Breadcrumb.Item>Commerce</Breadcrumb.Item>
        <Breadcrumb.Item>Order</Breadcrumb.Item>
      </Breadcrumb>
      <FilterCommerceOrder setDomain={pagination.setDomain} />
      <div className="flex justify-between items-center gap-4 flex-wrap mb-4">
        <Pagination
          page={pagination.page}
          total={qIncident.length}
          limit={limit}
          onChange={pagination.onChangePagination}
        />
      </div>
      <TableExtended
        columns={columns}
        dataSource={qIncident.data}
        loading={qIncident.isLoading || qIncident.isFetching}
        setSorter={pagination.setSort}
        rowKey="id"
      />
    </>
  );
};

export default CommerceOrder;
