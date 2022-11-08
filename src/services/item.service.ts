import { useEffect } from "react";
import { useCookies } from "react-cookie";

import { useMutation } from "@tanstack/react-query";
import { notification } from "antd";
import { usePaginationProps } from "src/components/Pagination";
import useItemSearchRead from "src/data/useItemSearchRead";

import ApiCall from "./ApiCall";

interface ItemData {
  id?: number;
  item_code: string;
  material_designator: string;
  service_designator: string;
  unit_id: number;
  material_price_telkom: number;
  service_price_telkom: number;
  material_price_mitra: number;
  service_price_mitra: number;
}

export const useItemService = ({
  limit,
  offset,
  domain,
  sort,
}: usePaginationProps) => {
  const [cookies] = useCookies();

  const qItem = useItemSearchRead({
    limit,
    offset,
    domain,
    sort,
    include: ["unit"],
  });

  const createMutation = useMutation({
    mutationFn: (data: ItemData) =>
      ApiCall.post("/item/create", data, {
        headers: { token: cookies?.["token"] },
      }),
  });

  const updateMutation = useMutation({
    mutationFn: (data: ItemData) =>
      ApiCall.patch(`/item/write/${data?.id}`, data, {
        headers: { token: cookies?.["token"] },
      }),
  });

  const deleteMutation = useMutation({
    mutationFn: (ids: number[]) =>
      ApiCall.post(
        `/item/delete`,
        { ids },
        {
          headers: { token: cookies?.["token"] },
        }
      ),
  });

  useEffect(() => {
    if (qItem.error) {
      notification.error({
        message: qItem.error?.response?.data?.message as string,
      });
    }
  }, [qItem.error]);

  return { qItem, createMutation, updateMutation, deleteMutation };
};
