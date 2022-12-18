import React from "react";

import FilterContainer from "src/components/filters/FilterContainer";
import FInput from "src/components/form/FInput";
import generateDomain from "src/helpers/generateDomain";

interface Props {
  setDomain: any;
}

const FilterJobType: React.FC<Props> = ({ setDomain }) => {
  const handleSearch = (values) => {
    const newDomain = generateDomain({
      domain: values,
      like: ["unit_name"],
    });
    setDomain(newDomain);
  };
  return (
    <FilterContainer
      title="Filter Jenis Pekerjaan"
      onFind={handleSearch}
      filterFields={[
        {
          label: "Jenis Pekerjaan",
          component: <FInput name="name" placeholder="Input" allowClear />,
        },
      ]}
    />
  );
};

export default FilterJobType;
