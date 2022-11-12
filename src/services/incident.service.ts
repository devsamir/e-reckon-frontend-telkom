import { useEffect } from "react";
import { useCookies } from "react-cookie";

import { useMutation } from "@tanstack/react-query";
import { notification } from "antd";
import { usePaginationProps } from "src/components/Pagination";
import useIncidentSearchRead from "src/data/useIncidentSearchRead";

import ApiCall from "./ApiCall";

interface IncidentData {
  id?: number;
  incident?: string;
  summary?: string;
  job_type?: string;
  assigned_mitra?: number;
  incident_details?: any[];
}

type UseIncidentParams = Partial<usePaginationProps> & {
  enableFetch?: boolean;
};

export const useIncidentService = ({
  limit,
  offset,
  domain,
  sort,
  enableFetch = true,
}: UseIncidentParams) => {
  const [cookies] = useCookies();

  const qIncident = useIncidentSearchRead({
    limit,
    offset,
    domain,
    sort,
    options: {
      enabled: enableFetch,
    },
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
    mutationFn: (ids: number[]) =>
      ApiCall.post(
        `/incident/delete`,
        { ids },
        {
          headers: { token: cookies?.["token"] },
        }
      ),
  });

  const confirmFirstTierMutation = useMutation({
    mutationFn: (id: number) =>
      ApiCall.post(
        `/incident/confirm-first-tier`,
        { id },
        {
          headers: { token: cookies?.["token"] },
        }
      ),
  });

  useEffect(() => {
    if (qIncident.error) {
      notification.error({
        message: qIncident.error?.response?.data?.message as string,
      });
    }
  }, [qIncident.error]);

  return {
    qIncident,
    createMutation,
    updateMutation,
    deleteMutation,
    confirmFirstTierMutation,
  };
};
