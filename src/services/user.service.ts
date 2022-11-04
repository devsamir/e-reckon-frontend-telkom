import { useMutation, useQueryClient } from '@tanstack/react-query';
import { notification } from 'antd';
import { useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { usePaginationProps } from 'src/components/Pagination';
import useGetUser from 'src/data/useGetUser';
import ApiCall from './ApiCall';

interface UserData {
  id?: number;
  username: string;
  password: string;
  fullname: string;
  level: number;
}

export const useUserService = ({
  limit,
  offset,
  domain,
  sort,
}: usePaginationProps) => {
  const [cookies] = useCookies();

  const qUser = useGetUser({
    limit,
    offset,
    domain,
    sort,
  });

  const createMutation = useMutation({
    mutationFn: (data: UserData) =>
      ApiCall.post('/user/create', data, {
        headers: { token: cookies?.['token'] },
      }),
  });

  const updateMutation = useMutation({
    mutationFn: (data: UserData) =>
      ApiCall.patch(`/user/write/${data?.id}`, data, {
        headers: { token: cookies?.['token'] },
      }),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) =>
      ApiCall.delete(`/user/delete/${id}`, {
        headers: { token: cookies?.['token'] },
      }),
  });

  useEffect(() => {
    if (qUser.error) {
      notification.error({
        message: qUser.error?.response?.data?.message as string,
      });
    }
  }, [qUser.error]);

  return { qUser, createMutation, updateMutation, deleteMutation };
};
