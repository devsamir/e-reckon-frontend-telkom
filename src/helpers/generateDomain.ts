interface Params {
  domain: any;
  like?: string[];
  numberRange?: string[];
  dateRange?: string[];
}
const generateDomain = ({
  domain,
  like = [],
  numberRange = [],
  dateRange = [],
}: Params) => {
  return Object.keys(domain).reduce((acc, key) => {
    const value = domain?.[key];
    if (like.includes(key) && value) {
      acc[key] = { contains: value };
    } else if (numberRange.includes(key) && value) {
      if (typeof value?.min === "number") acc[key] = { gte: value?.min };
      if (typeof value?.max === "number")
        acc[key] = { ...(acc[key] || {}), lte: value?.max };
      return acc;
    } else if (dateRange.includes(key) && Array.isArray(value)) {
      acc[key] = {
        gte: new Date(
          new Date(value?.[0]).setUTCHours(0, 0, 0, 0)
        ).toISOString(),
        lte: new Date(
          new Date(value?.[1]).setUTCHours(23, 59, 59, 999)
        ).toISOString(),
      };
    } else if (value) {
      acc[key] = value;
    }
    return acc;
  }, {});
};

export default generateDomain;
