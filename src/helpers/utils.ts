const formatter = new Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR",
  maximumFractionDigits: 0,
});
export const omit = (values: any, keys: string[]): any => {
  return Object.fromEntries(
    Object.entries(values).filter((key) => !keys.includes(key[0]))
  );
};

export const pick = (values: any, keys: string[]): any => {
  return Object.fromEntries(
    Object.entries(values).filter((key) => keys.includes(key[0]))
  );
};

export const removeFalsyValue = (values: any): any => {
  return Object.fromEntries(Object.entries(values).filter((key) => !!key[1]));
};

export const formatCurrency = (num: number) => {
  return formatter.format(num);
};

export const uniqBy = (data: any[], key: string) => {
  const newData = [];
  data.reduce((acc, curr) => {
    if (!acc?.[curr?.[key]]) {
      newData.push(curr);
      acc[curr?.[key]] = true;
    }
    return acc;
  }, {});

  return newData;
};

export const transformList = (data: any[], value: string, label: string) => {
  return data.map((item) => ({ label: item?.[label], value: item?.[value] }));
};
