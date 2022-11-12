import { useLocation } from "react-router-dom";

export default function useUrlQuery() {
  const { search } = useLocation();
  if (search.startsWith("?")) {
    return search
      .slice(1)
      .split("&")
      .reduce((acc, curr) => {
        const val = curr.split("=");
        if (val.length === 2) {
          acc[val[0]] = val[1];
        }
        return acc;
      }, {}) as any;
  }
  return {} as any;
}
