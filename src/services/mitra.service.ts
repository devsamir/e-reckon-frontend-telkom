import { useEffect } from "react";
import { useCookies } from "react-cookie";

import { useMutation } from "@tanstack/react-query";
import { notification } from "antd";
import { usePaginationProps } from "src/components/Pagination";
import useMitraSearchRead from "src/data/useMitraSearchRead";

import ApiCall from "./ApiCall";

interface MitraData {
  id?: number;
  shortname: string;
  fullname: string;
}

export const useMitraService = ({
  limit,
  offset,
  domain,
  sort,
}: usePaginationProps) => {
  const [cookies] = useCookies();

  const qMitra = useMitraSearchRead({
    limit,
    offset,
    domain,
    sort,
  });

  const createMutation = useMutation({
    mutationFn: (data: MitraData) =>
      ApiCall.post("/mitra/create", data, {
        headers: { token: cookies?.["token"] },
      }),
  });

  const updateMutation = useMutation({
    mutationFn: (data: MitraData) =>
      ApiCall.patch(`/mitra/write/${data?.id}`, data, {
        headers: { token: cookies?.["token"] },
      }),
  });

  const deleteMutation = useMutation({
    mutationFn: (ids: number[]) =>
      ApiCall.post(
        `/mitra/delete`,
        { ids },
        {
          headers: { token: cookies?.["token"] },
        }
      ),
  });

  useEffect(() => {
    if (qMitra.error) {
      notification.error({
        message: qMitra.error?.response?.data?.message as string,
      });
    }
  }, [qMitra.error]);

  return { qMitra, createMutation, updateMutation, deleteMutation };
};
