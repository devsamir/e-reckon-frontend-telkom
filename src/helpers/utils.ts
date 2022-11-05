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
