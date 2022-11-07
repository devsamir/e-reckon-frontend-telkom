import React, { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";

import { SelectProps, Spin } from "antd";
import useUnitSearchRead from "src/data/useUnitSearchRead";
import { transformList, uniqBy } from "src/helpers/utils";

import FSelect from "../form/FSelect";

interface Props extends SelectProps {
  name: string;
  defaultValue?: string;
}

const UnitSelector: React.FC<Props> = ({ name, ...props }) => {
  const [searchText, setSearchText] = useState("");
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { watch } = useFormContext();

  const value = watch(name);

  const searchedData = useUnitSearchRead({
    fields: ["id", "unit_name"],
    limit: 20,
    domain: {
      unit_name: { contains: search },
    },
    options: {
      keepPreviousData: true,
    },
  });

  const selectedData = useUnitSearchRead({
    fields: ["id", "unit_name"],
    domain: {
      id: { in: [value] },
    },
    options: {
      enabled: !!value,
      keepPreviousData: true,
    },
  });

  const options = uniqBy(
    transformList(
      [
        ...(searchedData.data || []),
        ...((!searchText && selectedData.data) || []),
      ],
      "id",
      "unit_name"
    ),
    "value"
  );

  const fetching =
    searchedData.isFetching || selectedData.isFetching || isLoading;
  useEffect(() => {
    setIsLoading(true);
    const onSearch = setTimeout(() => {
      setSearch(searchText);
      setIsLoading(false);
    }, 400);
    return () => {
      clearTimeout(onSearch);
      setIsLoading(false);
    };
  }, [searchText]);

  return (
    <FSelect
      {...props}
      loading={fetching}
      name={name}
      showSearch
      allowClear
      onClear={() => setSearchText("")}
      onSearch={(val) => setSearchText(val)}
      notFoundContent={fetching ? <Spin size="small" /> : null}
      filterOption={false}
      options={!fetching ? options : []}
    />
  );
};

export default UnitSelector;
