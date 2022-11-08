import { useEffect } from "react";
import { useCookies } from "react-cookie";

import { useMutation } from "@tanstack/react-query";
import { notification } from "antd";
import { usePaginationProps } from "src/components/Pagination";
import useUnitSearchRead from "src/data/useUnitSearchRead";

import ApiCall from "./ApiCall";

interface UnitData {
  id?: number;
  unit_name: string;
}

export const useUnitService = ({
  limit,
  offset,
  domain,
  sort,
}: usePaginationProps) => {
  const [cookies] = useCookies();

  const qUnit = useUnitSearchRead({
    limit,
    offset,
    domain,
    sort,
  });

  const createMutation = useMutation({
    mutationFn: (data: UnitData) =>
      ApiCall.post("/unit/create", data, {
        headers: { token: cookies?.["token"] },
      }),
  });

  const updateMutation = useMutation({
    mutationFn: (data: UnitData) =>
      ApiCall.patch(`/unit/write/${data?.id}`, data, {
        headers: { token: cookies?.["token"] },
      }),
  });

  const deleteMutation = useMutation({
    mutationFn: (ids: number[]) =>
      ApiCall.post(
        `/unit/delete`,
        { ids },
        {
          headers: { token: cookies?.["token"] },
        }
      ),
  });

  useEffect(() => {
    if (qUnit.error) {
      notification.error({
        message: qUnit.error?.response?.data?.message as string,
      });
    }
  }, [qUnit.error]);

  return { qUnit, createMutation, updateMutation, deleteMutation };
};
