import { useEffect } from "react";
import { useCookies } from "react-cookie";

import { useMutation } from "@tanstack/react-query";
import { notification } from "antd";
import { usePaginationProps } from "src/components/Pagination";
import useIncidentSearchRead from "src/data/useIncidentSearchRead";

import ApiCall from "./ApiCall";

interface IncidentData {
  id?: number;
  incident: string;
  summary: string;
  job_type: string;
}

export const useIncidentService = ({
  limit,
  offset,
  domain,
  sort,
}: usePaginationProps) => {
  const [cookies] = useCookies();

  const qIncident = useIncidentSearchRead({
    limit,
    offset,
    domain,
    sort,
  });

  const createMutation = useMutation({
    mutationFn: (data: IncidentData) =>
      ApiCall.post("/incident/create", data, {
        headers: { token: cookies?.["token"] },
      }),
  });

  const updateMutation = useMutation({
    mutationFn: (data: IncidentData) =>
      ApiCall.patch(`/incident/write/${data?.id}`, data, {
        headers: { token: cookies?.["token"] },
      }),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) =>
      ApiCall.delete(`/incident/delete/${id}`, {
        headers: { token: cookies?.["token"] },
      }),
  });

  useEffect(() => {
    if (qIncident.error) {
      notification.error({
        message: qIncident.error?.response?.data?.message as string,
      });
    }
  }, [qIncident.error]);

  return { qIncident, createMutation, updateMutation, deleteMutation };
};
