import React from "react";
import { useFormContext, Controller } from "react-hook-form";

import generatePicker from "antd/es/date-picker/generatePicker";
import "antd/es/date-picker/style/index";
import { RangePickerProps } from "antd/lib/date-picker";

import { ExclamationCircleFilled } from "@ant-design/icons";
import { ErrorMessage } from "@hookform/error-message";
import { DatePickerProps } from "antd";
import dateFnsGenerateConfig from "rc-picker/lib/generate/dateFns";

export const DatePicker = generatePicker<Date>(dateFnsGenerateConfig);

const { RangePicker } = DatePicker;

const FDatePicker: React.FC<
  DatePickerProps & {
    name: string;
    defaultValue?: string;
  }
> = ({ name, defaultValue = null, ...props }) => {
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
          <DatePicker
            {...(props as any)}
            onChange={(value, options) => {
              onChange(value, options);
              if (props.onChange) props.onChange(value as any, options);
            }}
            value={value}
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

export const FRangePicker: React.FC<
  RangePickerProps & {
    name: string;
    defaultValue?: string;
  }
> = ({ name, defaultValue = null, ...props }) => {
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
          <RangePicker
            {...(props as any)}
            onChange={(value, formatString) => {
              onChange(value, formatString);
              if (props.onChange) props.onChange(value as any, formatString);
            }}
            value={value}
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

export default FDatePicker;
