import React from 'react';
import { Select, SelectProps } from 'antd';
import { ExclamationCircleFilled } from '@ant-design/icons';
import { useFormContext, Controller } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';

interface Props extends SelectProps {
  name: string;
  defaultValue?: string;
}

const FSelect: React.FC<Props> = ({ name, defaultValue = '', ...props }) => {
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
          <Select
            {...props}
            onChange={onChange}
            value={value || null}
            status={error?.message && 'error'}
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

export default FSelect;
