import { shopApi } from '@/api/shopApi';
import type { AuthResponse, User } from '../interfaces';
import { isAxiosError } from 'axios';

interface LoginError {
  ok: false;
  message: string;
}
interface LoginSuccess {
  ok: true;
  token: string;
  user: User;
}

export const loginAction = async (
  email: string,
  password: string,
): Promise<LoginError | LoginSuccess> => {
  try {
    const { data } = await shopApi.post<AuthResponse>('/auth/login', { email, password });
    return {
      ok: true,
      token: data.token,
      user: data.user,
    };
  } catch (error) {
    if (isAxiosError(error) && error.response?.status === 401) {
      return {
        ok: false,
        message: 'Invalid email or password',
      };
    }
    console.log(error);
    throw new Error('No se pudo realizar la petición');
  }
};
