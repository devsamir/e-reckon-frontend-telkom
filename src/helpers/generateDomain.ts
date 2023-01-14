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
  const formattedDomain = [];
  Object.keys(domain)
    .filter((key) => !!domain?.[key])
    .forEach((key) => {
      const value = domain?.[key];
      if (like.includes(key)) {
        formattedDomain.push([key, "like", value]);
      } else if (numberRange.includes(key)) {
        if (typeof value?.min === "number")
          formattedDomain.push([key, "gte", value?.min]);
        if (typeof value?.max === "number")
          formattedDomain.push([key, "lte", value?.max]);
      } else if (dateRange.includes(key) && Array.isArray(value)) {
        formattedDomain.push(
          [key, "gte", value?.[0]],
          [key, "lte", value?.[1]]
        );
      } else {
        formattedDomain.push([key, "=", value]);
      }
    });

  return formattedDomain;
};

export default generateDomain;
