import axios from 'axios';
import { useMutation } from 'react-query';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const useLogin = () =>
  useMutation((values) =>
    axios.post(`${API_URL}/login`, values).then((res) => res.data),
  );

export { useLogin };
