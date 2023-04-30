import React, { useEffect, useMemo, useRef } from "react";
import { useSearchParams } from "react-router-dom";

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

const FilterTLSektor: React.FC<Props> = ({ setDomain }) => {
  const filterRef = useRef(null);
  const [params] = useSearchParams();
  const on_tier = params.get("on_tier");
  const status = params.get("status");
  const datel_id = params.get("datel_id");

  const handleSearch = (values) => {
    const newValues = { ...values };
    if (newValues.on_tier) {
      if (newValues.on_tier === "Tier 1")
        newValues[`status_tier_1`] = values.status;
      if (newValues.on_tier === "Mitra")
        newValues[`status_tier_2`] = values.status;

      if (newValues[`status_tier_1`] === "Closed")
        newValues[`on_tier`] = "Commerce";
    }
    const newDomain = generateDomain({
      domain: omit(newValues, ["status"]),
      like: ["incident_code", "incident", "status_tier_1", "status_tier_2"],
      dateRange: ["open_at", "close_at"],
      relations: [
        ["datel_id", "id"],
        ["job_type_id", "id"],
        ["assigned_mitra", "id"],
      ],
    });
    setDomain(newDomain);
  };

  const optOnTier = useMemo(
    () => [
      {
        value: "Tier 1",
        label: "Tier 1",
      },
      {
        value: "Mitra",
        label: "Mitra",
      },
    ],
    []
  );

  const optStatus = useMemo(
    () => ({
      "Tier 1": [
        {
          label: "Open",
          value: "Open",
        },
        {
          label: "Closed",
          value: "Closed",
        },
        {
          label: "Mitra Done",
          value: "Mitra Done",
        },
      ],
      Mitra: [
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
    }),
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
        component: <FRangePicker name="open_at" />,
      },
      {
        label: "Tanggal Closed",
        component: <FRangePicker name="close_at" />,
      },
    ],
    [optOnTier, optStatus]
  );

  useEffect(() => {
    if (filterRef.current?.setFormValue) {
      filterRef.current?.setFormValue({
        status,
        datel_id: Number(datel_id),
        on_tier,
      });
      setDomain(
        generateDomain({
          domain: {
            status_tier_1: on_tier === "Tier 1" ? status : null,
            status_tier_2: on_tier === "Mitra" ? status : null,
            datel_id: Number(datel_id),
            on_tier:
              status === "Closed" && on_tier === "Tier 1"
                ? "Commerce"
                : on_tier,
          },
          like: ["status_tier_1"],
          relations: [["datel_id", "id"]],
        })
      );
    }
  }, [status, datel_id, filterRef, setDomain, on_tier]);
  return (
    <FilterContainer
      ref={filterRef}
      title="Filter Order Warehouse"
      onFind={handleSearch}
      filterFields={filterFields}
    />
  );
};

export default FilterTLSektor;
