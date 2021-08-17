import axios from 'axios';
import { useMutation, useQuery, useQueryClient } from 'react-query';

import { configOptions } from '@config/index';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

type LoginDetails = {
  username: string;
  password: string;
};

interface LoginRefreshDetails extends LoginDetails {
  refreshToken: string;
}

const useLogin = () =>
  useMutation((values: LoginDetails) =>
    axios.post(`${API_URL}/login`, values).then((res) => res.data),
  );

const useCheckUser = () =>
  useQuery(
    'checkUser',
    () => axios.get(`${API_URL}/check-user`, configOptions()),
    { retry: false },
  );

const useRefreshToken = () =>
  useMutation((values: LoginRefreshDetails) =>
    axios
      .post(`${API_URL}/auth/refresh`, values, configOptions())
      .then((res) => res.data),
  );

const useDataGroupByField = (field: string) =>
  useQuery(['getBioData', field], ({ queryKey }) =>
    axios.get(`${API_URL}/bio-data/?field=${queryKey[1]}`, configOptions()),
  );

const useAllData = () =>
  useQuery(['getBioData'], () =>
    axios.get(`${API_URL}/bio-data`, configOptions()),
  );

const useAllAdmin = () =>
  useQuery(['getAdmin'], () => axios.get(`${API_URL}/admin`, configOptions()));

const useRevokeAccess = () => {
  const queryClient = useQueryClient();

  return useMutation(
    (username: string) =>
      axios
        .patch(`${API_URL}/revoke-access`, { username }, configOptions())
        .then((res) => res.data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('getAdmin');
      },
    },
  );
};

const useLogOut = () =>
  useMutation(() =>
    axios
      .post(`${API_URL}/logout`, {}, configOptions())
      .then((res) => res.data),
  );

export {
  useLogin,
  useCheckUser,
  useRefreshToken,
  useDataGroupByField,
  useAllData,
  useAllAdmin,
  useRevokeAccess,
  useLogOut,
};
