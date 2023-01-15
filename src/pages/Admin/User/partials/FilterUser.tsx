import React from "react";

import FilterContainer from "src/components/filters/FilterContainer";
import FInput from "src/components/form/FInput";
import FSelect from "src/components/form/FSelect";
import generateDomain from "src/helpers/generateDomain";

interface Props {
  setDomain: any;
}

export const roleOptions = [
  {
    label: "Admin",
    value: "admin",
  },
  {
    label: "Mitra",
    value: "mitra",
  },
  {
    label: "Commerce",
    value: "commerce",
  },
  {
    label: "WH",
    value: "wh",
  },
  {
    label: "Telkom",
    value: "telkom",
  },
  {
    label: "TL",
    value: "tl",
  },
  {
    label: "Tier 1",
    value: "first_tier",
  },
];

const FilterUser: React.FC<Props> = ({ setDomain }) => {
  const handleSearch = (values) => {
    const newDomain = generateDomain({
      domain: { ...values },
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
            <FSelect
              name="role"
              placeholder="Select"
              options={roleOptions}
              allowClear
            />
          ),
        },
      ]}
    />
  );
};

export default FilterUser;
