import React, { useEffect, useRef } from "react";

import DatelSelector from "src/components/filters/DatelSelector";
import FilterContainer from "src/components/filters/FilterContainer";
import { FRangePicker } from "src/components/form/FDatePicker";
import * as yup from "yup";

interface Props {
  setDomain: any;
}

const FilterDashboard: React.FC<Props> = ({ setDomain }) => {
  const filterRef = useRef(null);
  const handleSearch = (values) => {
    setDomain(values);
  };
  useEffect(() => {
    if (filterRef) {
      const date = new Date();
      const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
      const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
      filterRef.current?.setFormValue({ date: [firstDay, lastDay] });
      setDomain({ date: [firstDay, lastDay] });
    }
  }, [filterRef, setDomain]);
  return (
    <FilterContainer
      ref={filterRef}
      title="Filter Dashboard"
      onFind={handleSearch}
      schema={yup.object().shape({
        date: yup
          .array()
          .of(yup.date())
          .typeError("Tanggal harus diisi")
          .required("Tanggal harus diisi"),
      })}
      filterFields={[
        {
          label: "Tanggal",
          component: <FRangePicker name="date" />,
          required: true,
        },
        {
          label: "Datel",
          component: (
            <DatelSelector name="datel_id" placeholder="Select" allowClear />
          ),
        },
      ]}
    />
  );
};

export default FilterDashboard;
