import React, { useMemo } from "react";

import FilterContainer from "src/components/filters/FilterContainer";
import MitraSelector from "src/components/filters/MitraSelector";
import { FRangePicker } from "src/components/form/FDatePicker";
import FInput from "src/components/form/FInput";
import FInputNumberRange from "src/components/form/FInputNumberRange";
import FSelect from "src/components/form/FSelect";
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

  const optOnTier = useMemo(
    () => [
      {
        value: "tier_1",
        label: "TIER 1",
      },
      {
        value: "tier_2",
        label: "TIER 2",
      },
      {
        value: "tier_3",
        label: "TIER 3",
      },
      {
        value: "wh",
        label: "WH",
      },
    ],
    []
  );

  const optStatus = useMemo(
    () => ({
      tier_1: [
        {
          label: "OPEN",
          value: "open",
        },
        {
          label: "CLOSED",
          value: "closed",
        },
      ],
      tier_2: [
        {
          label: "OPEN",
          value: "open",
        },
        {
          label: "CLOSED PEKERJAAN",
          value: "closed_pekerjaan",
        },
        {
          label: "CEK LIST BY WH",
          value: "cek_list_by_wh",
        },
        {
          label: "WH DONE",
          value: "wh_done",
        },
      ],
      tier_3: [
        {
          label: "OPEN",
          value: "open",
        },
        {
          label: "CLOSED PEKERJAAN",
          value: "closed_pekerjaan",
        },
        {
          label: "CEK LIST BY WH",
          value: "cek_list_by_wh",
        },
        {
          label: "WH DONE",
          value: "wh_done",
        },
      ],
      wh: [
        {
          label: "OPEN",
          value: "open",
        },
        {
          label: "RETURN",
          value: "return",
        },
        {
          label: "CLOSED",
          value: "closed",
        },
      ],
    }),
    []
  );

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
        label: "Posisi & Status",
        component: (form) => {
          const onTier = form.watch("on_tier");
          return (
            <div className="w-full flex gap-2 items-center">
              <FSelect
                className="flex-1"
                name="on_tier"
                placeholder="Select"
                options={optOnTier}
                allowClear
                onChange={() => {
                  form.setValue("status", null);
                }}
              />
              <FSelect
                className="flex-1"
                name="status"
                placeholder="Select"
                options={optStatus?.[onTier] || []}
                disabled={!onTier}
                allowClear
              />
            </div>
          );
        },
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
    [optOnTier, optStatus]
  );

  return (
    <FilterContainer
      title="Filter Tier 2"
      onFind={handleSearch}
      filterFields={filterFields}
    />
  );
};

export default FilterFirstTier;
