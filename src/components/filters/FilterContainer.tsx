import React, { useState } from 'react';
import { UpOutlined, DownOutlined } from '@ant-design/icons';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, FormProvider } from 'react-hook-form';
import { Button, Col, Row, Space } from 'antd';

interface FilterFields {
  label: string;
  component: JSX.Element;
}

interface Props {
  schema?: any;
  filterFields: FilterFields[];
  title?: string;
  onFind: any;
}

const FilterContainer: React.FC<Props> = ({
  schema,
  filterFields,
  title = 'Filter',
  onFind,
}) => {
  const form = useForm({
    resolver: schema ? yupResolver(schema) : yupResolver(yup.object({})),
  });
  const [expand, setExpand] = useState(false);
  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onFind)} className="p-4 my-4 bg-white">
        <div>
          <h4 className="text-sm tracking-wide uppercase font-bold">{title}</h4>
          <Row className="w-full" gutter={[16, 16]}>
            <Col span={24} lg={18} xl={20}>
              <Row className="w-full" gutter={[8, 8]}>
                {filterFields.map((filterField, index) => {
                  return (
                    <Col
                      span={24}
                      md={8}
                      style={{
                        display: index > 2 && !expand ? 'none' : 'block',
                      }}
                      key={index}
                    >
                      <span>{filterField.label}</span>
                      {filterField.component}
                    </Col>
                  );
                })}
              </Row>
            </Col>
            <Col span={24} lg={6} xl={4}>
              <div className="flex gap-2 flex-wrap items-center mt-5">
                {filterFields.length > 3 && (
                  <Button
                    onClick={setExpand.bind(this, !expand)}
                    style={{ display: 'flex', alignItems: 'center' }}
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

export default FilterContainer;
