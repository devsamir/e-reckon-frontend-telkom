import { format } from "date-fns";

interface Params {
  domain: any;
  like?: string[];
  numberRange?: string[];
  dateRange?: string[];
  relations?: string[][];
}
const generateDomain = ({
  domain,
  like = [],
  numberRange = [],
  dateRange = [],
  relations = [],
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
          [key, "gte", format(new Date(value?.[0]), "yyyy-MM-dd")],
          [key, "lte", format(new Date(value?.[1]), "yyyy-MM-dd")]
        );
      } else if (relations.find((r) => r?.[0] === key) && value) {
        const r = relations.find((r) => r?.[0] === key);
        formattedDomain.push([key, "=", { [r?.[1]]: value }]);
      } else {
        formattedDomain.push([key, "=", value]);
      }
    });

  return formattedDomain;
};

export default generateDomain;
