import React from 'react';
import { InputNumber, InputNumberProps } from 'antd';
import { ExclamationCircleFilled } from '@ant-design/icons';
import { useFormContext, Controller } from 'react-hook-form';

import { ErrorMessage } from '@hookform/error-message';

interface Props extends InputNumberProps {
  name: string;
  defaultValue?: string;
}
const formatterNumber = (val) => {
  if (!val) return '';
  return `${val}`
    .replace(/\B(?=(\d{3})+(?!\d))/g, '.')
    .replace(/\.(?=\d{0,2}$)/g, ',');
};

const parserNumber = (val) => {
  if (!val) return '';
  return Number.parseFloat(
    val.replace(/\$\s?|(\.*)/g, '').replace(/(\,{1})/g, '.')
  ).toFixed(2);
};
const FInputNumber: React.FC<Props> = ({
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
          <InputNumber
            className="w-full"
            {...props}
            formatter={formatterNumber}
            parser={parserNumber}
            onChange={onChange}
            value={value}
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

export default FInputNumber;
