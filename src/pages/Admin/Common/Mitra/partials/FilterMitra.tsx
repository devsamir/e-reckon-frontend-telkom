import React from 'react';
import FInput from 'src/components/form/FInput';
import FilterContainer from 'src/components/filters/FilterContainer';
import generateDomain from 'src/helpers/generateDomain';

interface Props {
  setDomain: any;
}

const FilterMitra: React.FC<Props> = ({ setDomain }) => {
  const handleSearch = (values) => {
    console.log(values);
    const newDomain = generateDomain({
      domain: values,
      like: ['shortname', 'fullname'],
    });
    setDomain(newDomain);
  };
  return (
    <FilterContainer
      title="Filter Mitra"
      onFind={handleSearch}
      filterFields={[
        {
          label: 'Nama Pendek Mitra',
          component: <FInput name="shortname" placeholder="Input" allowClear />,
        },
        {
          label: 'Nama Mitra',
          component: <FInput name="fullname" placeholder="Input" allowClear />,
        },
      ]}
    />
  );
};

export default FilterMitra;
