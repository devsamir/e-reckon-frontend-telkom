import React, { useMemo } from "react";

import DatelSelector from "src/components/filters/DatelSelector";
import FilterContainer from "src/components/filters/FilterContainer";
import JobSypeSelector from "src/components/filters/JobSypeSelector";
import MitraSelector from "src/components/filters/MitraSelector";
import { FRangePicker } from "src/components/form/FDatePicker";
import FInput from "src/components/form/FInput";
import FSelect from "src/components/form/FSelect";
import generateDomain from "src/helpers/generateDomain";
import { omit } from "src/helpers/utils";

interface Props {
  setDomain: any;
}

const FilterSecondTier: React.FC<Props> = ({ setDomain }) => {
  const handleSearch = (values) => {
    const newValues = { ...values };
    if (values.status) {
      newValues[`status_tier_2`] = values.status;
    }
    const newDomain = generateDomain({
      domain: omit(newValues, ["status"]),
      like: ["incident_code", "incident"],
      dateRange: ["open_at", "close_at"],
      relations: [
        ["datel_id", "id"],
        ["job_type_id", "id"],
        ["assigned_mitra", "id"],
      ],
    });
    setDomain(newDomain);
  };

  const optStatus = useMemo(
    () => [
      {
        label: "Open",
        value: "Open",
      },
      {
        label: "Mitra Done",
        value: "Mitra Done",
      },
      {
        label: "Closed Pekerjaan",
        value: "Closed Pekerjaan",
      },
      {
        label: "Return by Tier 1",
        value: "Return by Tier 1",
      },
    ],
    []
  );

  const filterFields = useMemo(
    () => [
      {
        label: "Datel",
        component: (
          <DatelSelector name="datel_id" placeholder="Select" allowClear />
        ),
      },
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
        label: "Jenis Pekerjaan",
        component: (
          <JobSypeSelector name="job_type_id" placeholder="Select" allowClear />
        ),
      },
      {
        label: "Status",
        component: (
          <FSelect
            className="flex-1"
            name="status"
            placeholder="Select"
            options={optStatus || []}
            allowClear
          />
        ),
      },
      {
        label: "Mitra",
        component: <MitraSelector name="assigned_mitra" placeholder="Select" />,
      },
      {
        label: "Tanggal Masuk",
        component: <FRangePicker name="open_at" />,
      },
      {
        label: "Tanggal Closed",
        component: <FRangePicker name="close_at" />,
      },
    ],
    [optStatus]
  );

  return (
    <FilterContainer
      title="Filter Mitra"
      onFind={handleSearch}
      filterFields={filterFields}
    />
  );
};

export default FilterSecondTier;
