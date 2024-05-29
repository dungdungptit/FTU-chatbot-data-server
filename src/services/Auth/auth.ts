import { data } from '@/utils/data';
import axios from '@/utils/axios';
import { ip } from '@/utils/ip';
import { Login } from './typings';

export const login = async (payload: FormData) => {
  console.log(payload);
  const data = {
    identifier: payload.get('username'),
    password: payload.get('password'),
  };
  const res = await axios.post(`${ip}/api/auth/local`, data);
  console.log(res);
  return res;
};

export async function getInfo() {
  return axios.get(`${ip}/api/users/me`);
}

export async function getInfoAdmin() {
  return axios.get(`${ip}/api/users/me`);
}
