import axios from 'axios';
import { useMutation, useQuery } from 'react-query';

import { getToken } from '@config/index';

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

const useCheckUser = () => {
  const config = getToken();
  return useQuery('checkUser', () =>
    axios.get(`${API_URL}/check-user`, config),
  );
};

const useRefreshToken = () => {
  const config = getToken();
  return useMutation((values: LoginRefreshDetails) =>
    axios
      .post(`${API_URL}/auth/refresh`, values, config)
      .then((res) => res.data),
  );
};

const useDataGroupByField = (field: string) => {
  const config = getToken();
  return useQuery(['getBioData', field], ({ queryKey }) =>
    axios.get(`${API_URL}/bio-data/?field=${queryKey[1]}`, config),
  );
};

export { useLogin, useCheckUser, useRefreshToken, useDataGroupByField };
