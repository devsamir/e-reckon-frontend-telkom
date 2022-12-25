import React from "react";

import FilterContainer from "src/components/filters/FilterContainer";
import UnitSelector from "src/components/filters/UnitSelector";
import FInput from "src/components/form/FInput";
import generateDomain from "src/helpers/generateDomain";

interface Props {
  setDomain: any;
}

const FilterItem = ({ setDomain }: Props, ref: React.Ref<any>) => {
  const handleSearch = (values) => {
    const newDomain = generateDomain({
      domain: values,
      like: ["item_code", "material_designator", "service_designator"],
    });
    setDomain(newDomain);
  };
  return (
    <FilterContainer
      ref={ref}
      title="Filter Item"
      onFind={handleSearch}
      filterFields={[
        {
          label: "Kode Item",
          component: <FInput name="item_code" placeholder="Input" allowClear />,
        },
        {
          label: "Material Designator",
          component: (
            <FInput name="material_designator" placeholder="Input" allowClear />
          ),
        },
        {
          label: "Service Designator",
          component: (
            <FInput name="service_designator" placeholder="Input" allowClear />
          ),
        },
        {
          label: "Unit",
          component: <UnitSelector name="unit_id" placeholder="Select" />,
        },
      ]}
    />
  );
};

export default React.forwardRef(FilterItem);
