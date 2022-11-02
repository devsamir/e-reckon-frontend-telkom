import React, { useContext } from 'react';
import { Button, notification } from 'antd';
import FInput from 'src/components/form/FInput';
import { useForm, FormProvider } from 'react-hook-form';
import { useCookies } from 'react-cookie';
import { yupResolver } from '@hookform/resolvers/yup';
import FInputPassword from '../../components/form/FInputPassword';
import { loginSchema } from './config';
import { useLoginService } from '../../services/login.service';
import { AuthContext } from '../../contexts/AuthContext';

const Login = () => {
  const { setIsLogin } = useContext(AuthContext);

  const form = useForm({ resolver: yupResolver(loginSchema) });
  const [_cookies, setCookie] = useCookies();
  const { loginMutation } = useLoginService();

  const handleSubmit = (values) => {
    loginMutation.mutateAsync(values, {
      onSuccess: (res) => {
        setCookie('token', res.data.token, { path: '/' });
        setIsLogin(true);
        notification.success({ message: 'Berhasil login' });
      },
      onError: (error: any) => {
        notification.error({
          message: error?.response?.data?.message || error?.message,
        });
      },
    });
  };

  return (
    <div className="w-screen h-screen flex justify-center items-center relative bg-gray-100">
      <div className="w-full max-w-lg md:max-w-md p-4 bg-white rounded-lg mx-2">
        <div className="flex items-center my-4 gap-2 px-16">
          <img
            src={require('../../assets/telkom_logo.png')}
            alt="Logo Telkom"
            className="w-32 p-4"
          />
          <span className="text-xl text-center text-gray-800 leading-[3rem] uppercase font-bold">
            E-Reckon
          </span>
        </div>
        <FormProvider {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="flex flex-col mx-auto max-w-xs"
          >
            <div className="flex flex-col gap-1 mb-4">
              <label className="text-sm font-medium">Username</label>
              <FInput name="username" placeholder="Masukan email anda" />
            </div>
            <div className="flex flex-col gap-1 mb-4">
              <label className="text-sm font-medium">Password</label>
              <FInputPassword
                name="password"
                placeholder="Masukan password anda"
              />
            </div>
            <div>
              <Button
                type="primary"
                htmlType="submit"
                color="primary"
                className="w-full"
                loading={loginMutation.isLoading}
              >
                Login
              </Button>
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  );
};

export default Login;
