import React from "react";
import { useFormContext, Controller } from "react-hook-form";

import { ExclamationCircleFilled } from "@ant-design/icons";
import { ErrorMessage } from "@hookform/error-message";
import { Select, SelectProps } from "antd";

interface Props extends SelectProps {
  name: string;
  defaultValue?: string;
}

const FSelect: React.FC<Props> = ({ name, defaultValue = "", ...props }) => {
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
            onChange={(value, options) => {
              onChange(value, options);
              if (props.onChange) props.onChange(value, options);
            }}
            value={value || null}
            status={error?.message && "error"}
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
