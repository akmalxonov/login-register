import { useQuery } from "@tanstack/react-query";
import { useAxios } from "../useAxios";

interface QueryType {
  pathname: string;
  url: string;
  params?: object;
}
export const useQueryHandler = <T>({ pathname, url, params }: QueryType) => {
  const axios = useAxios();
    return useQuery<T>({
    queryKey: [pathname],
    queryFn: async () => {
      const res = await axios({ url, params });
      return res.data;
    },
  });
};
