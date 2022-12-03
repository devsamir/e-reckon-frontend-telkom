import React, { useMemo } from "react";

import FilterContainer from "src/components/filters/FilterContainer";
import MitraSelector from "src/components/filters/MitraSelector";
import { FRangePicker } from "src/components/form/FDatePicker";
import FInput from "src/components/form/FInput";
import generateDomain from "src/helpers/generateDomain";
import { omit } from "src/helpers/utils";

interface Props {
  setDomain: any;
}

const FilterFirstTier: React.FC<Props> = ({ setDomain }) => {
  const handleSearch = (values) => {
    const newValues = { ...values };
    if (newValues.on_tier) {
      newValues[`status_${newValues.on_tier}`] = values.status;
    }
    const newDomain = generateDomain({
      domain: omit(newValues, ["status"]),
      like: ["incident_code", "incident"],
      dateRange: ["created_at", "closed_at"],
    });
    setDomain(newDomain);
  };

  const filterFields = useMemo(
    () => [
      {
        label: "ID",
        component: (
          <FInput name="incident_code" placeholder="Input" allowClear />
        ),
      },
      {
        label: "Tiket Gamas",
        component: <FInput name="incident" placeholder="Input" allowClear />,
      },
      {
        label: "Mitra",
        component: <MitraSelector name="assigned_mitra" placeholder="Select" />,
      },
      {
        label: "Tanggal Masuk",
        component: <FRangePicker name="created_at" />,
      },
      {
        label: "Tanggal Closed",
        component: <FRangePicker name="closed_at" />,
      },
    ],
    []
  );

  return (
    <FilterContainer
      title="Filter Tier 3"
      onFind={handleSearch}
      filterFields={filterFields}
    />
  );
};

export default FilterFirstTier;
