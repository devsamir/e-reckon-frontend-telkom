import React from 'react';
import { Input, InputProps } from 'antd';
import {
  ExclamationCircleFilled,
  EyeTwoTone,
  EyeInvisibleOutlined,
} from '@ant-design/icons';
import { useFormContext, Controller } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';

interface Props extends InputProps {
  name: string;
  defaultValue?: string;
}

const FInputPassword: React.FC<Props> = ({
  name,
  defaultValue = '',
  ...props
}) => {
  const {
    formState: { errors },

    control,
  } = useFormContext();
  return (
    <Controller
      name={name}
      defaultValue={defaultValue}
      control={control}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <React.Fragment>
          <Input.Password
            {...props}
            onChange={onChange}
            value={value}
            status={error?.message && 'error'}
            iconRender={(visible) =>
              visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
            }
          />
          <ErrorMessage
            errors={errors}
            name={name}
            render={({ message }) => (
              <div className="text-red-500 flex items-center gap-2">
                <ExclamationCircleFilled />
                <small className="text-sm">{message}</small>
              </div>
            )}
          />
        </React.Fragment>
      )}
    />
  );
};

export default FInputPassword;
