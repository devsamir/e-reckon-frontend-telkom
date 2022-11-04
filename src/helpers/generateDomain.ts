interface Params {
  domain: any;
  like: string[];
}
const generateDomain = ({ domain, like }: Params) => {
  return Object.keys(domain).reduce((acc, key) => {
    if (like.includes(key) && domain?.[key]) {
      acc[key] = { contains: domain?.[key] };
    } else if (domain?.[key]) {
      acc[key] = domain?.[key];
    }
    return acc;
  }, {});
};

export default generateDomain;
