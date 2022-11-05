interface Params {
  domain: any;
  like?: string[];
  numberRange?: string[];
}
const generateDomain = ({ domain, like = [], numberRange = [] }: Params) => {
  return Object.keys(domain).reduce((acc, key) => {
    const value = domain?.[key];
    if (like.includes(key) && value) {
      acc[key] = { contains: value };
    } else if (numberRange.includes(key) && value) {
      if (typeof value?.min === 'number') acc[key] = { gte: value?.min };
      if (typeof value?.max === 'number')
        acc[key] = { ...(acc[key] || {}), lte: value?.max };
      return acc;
    } else if (value) {
      acc[key] = value;
    }
    return acc;
  }, {});
};

export default generateDomain;
