import { useEffect } from "react";
import { useCookies } from "react-cookie";

import { useMutation } from "@tanstack/react-query";
import { notification } from "antd";
import { usePaginationProps } from "src/components/Pagination";
import useJobTypeSearchRead from "src/data/useJobTypeSearchRead";

import ApiCall from "./ApiCall";

interface JobTypeData {
  id?: number;
  name: string;
}

export const useJobTypeService = ({
  limit,
  offset,
  domain,
  sort,
}: usePaginationProps) => {
  const [cookies] = useCookies();

  const qJobType = useJobTypeSearchRead({
    limit,
    offset,
    domain,
    sort,
  });

  const createMutation = useMutation({
    mutationFn: (data: JobTypeData) =>
      ApiCall.post("/job-type/create", data, {
        headers: { token: cookies?.["token"] },
      }),
  });

  const updateMutation = useMutation({
    mutationFn: (data: JobTypeData) =>
      ApiCall.patch(`/job-type/write/${data?.id}`, data, {
        headers: { token: cookies?.["token"] },
      }),
  });

  const deleteMutation = useMutation({
    mutationFn: (ids: number[]) =>
      ApiCall.post(
        `/job-type/delete`,
        { ids },
        {
          headers: { token: cookies?.["token"] },
        }
      ),
  });

  useEffect(() => {
    if (qJobType.error) {
      notification.error({
        message: qJobType.error?.response?.data?.message as string,
      });
    }
  }, [qJobType.error]);

  return { qJobType, createMutation, updateMutation, deleteMutation };
};
