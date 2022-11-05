import React from 'react';
import FInput from 'src/components/form/FInput';
import FilterContainer from 'src/components/filters/FilterContainer';
import generateDomain from 'src/helpers/generateDomain';

interface Props {
  setDomain: any;
}

const FilterUser: React.FC<Props> = ({ setDomain }) => {
  const handleSearch = (values) => {
    const newDomain = generateDomain({
      domain: values,
      like: ['unit_name'],
    });
    setDomain(newDomain);
  };
  return (
    <FilterContainer
      title="Filter Unit"
      onFind={handleSearch}
      filterFields={[
        {
          label: 'Nama Unit',
          component: <FInput name="unit_name" placeholder="Input" allowClear />,
        },
      ]}
    />
  );
};

export default FilterUser;
