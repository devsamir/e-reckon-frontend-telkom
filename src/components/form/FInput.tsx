import React from "react";
import { useFormContext, Controller } from "react-hook-form";

import { TextAreaProps } from "antd/lib/input";

import { ExclamationCircleFilled } from "@ant-design/icons";
import { ErrorMessage } from "@hookform/error-message";
import { Input, InputProps } from "antd";

type Props = (TextAreaProps | InputProps) & {
  name: string;
  defaultValue?: string;
  isTextArea?: boolean;
};

const FInput: React.FC<Props> = ({
  name,
  defaultValue = "",
  isTextArea,
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
          {isTextArea ? (
            <Input.TextArea
              {...(props as TextAreaProps)}
              onChange={onChange}
              value={value}
              status={error?.message && "error"}
            />
          ) : (
            <Input
              {...(props as InputProps)}
              onChange={onChange}
              value={value}
              status={error?.message && "error"}
            />
          )}
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

export default FInput;
