import React, { useState, useImperativeHandle } from "react";
import {
  useForm,
  FormProvider,
  UseFormReturn,
  FieldValues,
} from "react-hook-form";

import { UpOutlined, DownOutlined } from "@ant-design/icons";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Col, Row } from "antd";
import * as yup from "yup";

interface FilterFields {
  label: string;
  component:
    | JSX.Element
    | ((form: UseFormReturn<FieldValues, any>) => JSX.Element);
}

interface Props {
  schema?: any;
  filterFields: FilterFields[];
  title?: string;
  onFind: any;
}

const FilterContainer = (
  { schema, filterFields, title = "Filter", onFind }: Props,
  ref: React.Ref<any>
) => {
  const form = useForm({
    resolver: schema ? yupResolver(schema) : yupResolver(yup.object({})),
  });
  const [expand, setExpand] = useState(false);

  useImperativeHandle(ref, () => ({
    resetForm: () => {
      form.reset(null);
    },
  }));

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onFind)} className="p-4 my-4 bg-white">
        <div>
          <h4 className="text-sm tracking-wide uppercase font-bold">{title}</h4>
          <Row className="w-full" gutter={[16, 16]}>
            <Col span={24}>
              <Row className="w-full" gutter={[10, 10]}>
                {filterFields.map((filterField, index) => {
                  return (
                    <Col
                      span={24}
                      md={8}
                      style={{
                        display: index > 2 && !expand ? "none" : "flex",
                      }}
                      className="flex-col gap-1"
                      key={index}
                    >
                      <span>{filterField.label}</span>
                      {typeof filterField.component === "function"
                        ? filterField.component(form)
                        : filterField.component}
                    </Col>
                  );
                })}
              </Row>
            </Col>
            <Col span={24}>
              <div className="flex gap-2 flex-wrap items-center mt-5">
                {filterFields.length > 3 && (
                  <Button
                    onClick={setExpand.bind(this, !expand)}
                    style={{ display: "flex", alignItems: "center" }}
                  >
                    {expand ? <UpOutlined /> : <DownOutlined />}
                    Expand
                  </Button>
                )}
                <Button
                  htmlType="submit"
                  type="primary"
                  className="bg-blue-500 border-blue-500 hover:bg-blue-600 hover:border-blue-600 transition-colors duration-300"
                >
                  Search
                </Button>
              </div>
            </Col>
          </Row>
        </div>
      </form>
    </FormProvider>
  );
};

export default React.forwardRef(FilterContainer);
