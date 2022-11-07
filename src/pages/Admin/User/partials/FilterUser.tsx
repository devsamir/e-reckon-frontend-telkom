import React from "react";

import FilterContainer from "src/components/filters/FilterContainer";
import FInput from "src/components/form/FInput";
import generateDomain from "src/helpers/generateDomain";

interface Props {
  setDomain: any;
}

const FilterUser: React.FC<Props> = ({ setDomain }) => {
  const handleSearch = (values) => {
    const newDomain = generateDomain({
      domain: { ...values, level: Number(values?.level) },
      like: ["username", "fullname"],
    });
    setDomain(newDomain);
  };
  return (
    <FilterContainer
      title="Filter User"
      onFind={handleSearch}
      filterFields={[
        {
          label: "Username",
          component: <FInput name="username" placeholder="Input" allowClear />,
        },
        {
          label: "Full name",
          component: <FInput name="fullname" placeholder="Input" allowClear />,
        },
        {
          label: "Role",
          component: (
            <FInput type="number" name="level" placeholder="Input" allowClear />
          ),
        },
      ]}
    />
  );
};

export default FilterUser;
