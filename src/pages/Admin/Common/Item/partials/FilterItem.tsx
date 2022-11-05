import React from 'react';
import FInput from 'src/components/form/FInput';
import FilterContainer from 'src/components/filters/FilterContainer';
import generateDomain from 'src/helpers/generateDomain';
import UnitSelector from 'src/components/filters/UnitSelector';
import FInputNumberRange from 'src/components/form/FInputNumberRange';

interface Props {
  setDomain: any;
}

const FilterItem: React.FC<Props> = ({ setDomain }) => {
  const handleSearch = (values) => {
    const newDomain = generateDomain({
      domain: values,
      like: ['item_code', 'material_designator', 'service_designator'],
      numberRange: [
        'material_price_telkom',
        'service_price_telkom',
        'material_price_mitra',
        'service_price_mitra',
      ],
    });
    setDomain(newDomain);
  };
  return (
    <FilterContainer
      title="Filter Item"
      onFind={handleSearch}
      filterFields={[
        {
          label: 'Kode Item',
          component: <FInput name="item_code" placeholder="Input" allowClear />,
        },
        {
          label: 'Material Designator',
          component: (
            <FInput name="material_designator" placeholder="Input" allowClear />
          ),
        },
        {
          label: 'Service Designator',
          component: (
            <FInput name="service_designator" placeholder="Input" allowClear />
          ),
        },
        {
          label: 'Unit',
          component: <UnitSelector name="unit_id" placeholder="Select" />,
        },
        {
          label: 'Harga Material Telkom',
          component: <FInputNumberRange name="material_price_telkom" />,
        },
        {
          label: 'Harga Service Telkom',
          component: <FInputNumberRange name="service_price_telkom" />,
        },
        {
          label: 'Harga Material Mitra',
          component: <FInputNumberRange name="material_price_mitra" />,
        },
        {
          label: 'Harga Service Mitra',
          component: <FInputNumberRange name="service_price_mitra" />,
        },
      ]}
    />
  );
};

export default FilterItem;
