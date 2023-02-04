import React from "react";

import FilterContainer from "src/components/filters/FilterContainer";
import UnitSelector from "src/components/filters/UnitSelector";
import FInput from "src/components/form/FInput";
import FInputNumberRange from "src/components/form/FInputNumberRange";
import generateDomain from "src/helpers/generateDomain";

interface Props {
  setDomain: any;
}

const FilterItem = ({ setDomain }: Props, ref: React.Ref<any>) => {
  const handleSearch = (values) => {
    const newDomain = generateDomain({
      domain: values,
      like: ["item_code", "material_designator", "service_designator"],
      numberRange: [
        "material_price_telkom",
        "service_price_telkom",
        "material_price_mitra",
        "service_price_mitra",
      ],
      relations: [["unit_id", "id"]],
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
          label: "Jasa Designator",
          component: (
            <FInput name="service_designator" placeholder="Input" allowClear />
          ),
        },
        {
          label: "Unit",
          component: <UnitSelector name="unit_id.id" placeholder="Select" />,
        },
        {
          label: "Harga Material Telkom",
          component: <FInputNumberRange name="material_price_telkom" />,
        },
        {
          label: "Harga Jasa Telkom",
          component: <FInputNumberRange name="service_price_telkom" />,
        },
        {
          label: "Harga Material Mitra",
          component: <FInputNumberRange name="material_price_mitra" />,
        },
        {
          label: "Harga Jasa Mitra",
          component: <FInputNumberRange name="service_price_mitra" />,
        },
      ]}
    />
  );
};

export default React.forwardRef(FilterItem);
