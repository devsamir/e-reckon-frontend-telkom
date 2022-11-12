import React, { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";

import { SelectProps, Spin } from "antd";
import useMitraSearchRead from "src/data/useMitraSearchRead";
import { transformList, uniqBy } from "src/helpers/utils";

import FSelect from "../form/FSelect";

interface Props extends SelectProps {
  name: string;
  defaultValue?: string;
}

const MitraSelector: React.FC<Props> = ({ name, ...props }) => {
  const [searchText, setSearchText] = useState("");
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { watch } = useFormContext();

  const value = watch(name);

  const searchedData = useMitraSearchRead({
    fields: ["id", "fullname", "shortname"],
    limit: 20,
    domain: {
      OR: [
        { fullname: { contains: search } },
        { shortname: { contains: search } },
      ],
    },
  });

  const selectedData = useMitraSearchRead({
    fields: ["id", "fullname", "shortname"],
    domain: {
      id: { in: [value] },
    },
    options: {
      enabled: !!value,
    },
  });

  const options = uniqBy(
    [
      ...(searchedData.data || []),
      ...((!searchText && selectedData.data) || []),
    ].map((item) => ({
      label: `(${item?.shortname}) ${item?.fullname}`,
      value: item?.id,
    })),
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

export default MitraSelector;
