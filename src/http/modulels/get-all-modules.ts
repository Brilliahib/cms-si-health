import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

import { api } from "@/lib/axios";
import { Modules } from "@/types/modules/modules";

interface GetAllModulesResponse {
  data: Modules[];
}

export const GetAllModulesHandler = async (
  type: string,
  token: string,
): Promise<GetAllModulesResponse> => {
  const { data } = await api.get<GetAllModulesResponse>(
    `/modules?type=${type}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return data;
};

export const useGetAllModules = (
  type: string,
  token: string,
  options?: Partial<UseQueryOptions<GetAllModulesResponse, AxiosError>>,
) => {
  return useQuery({
    queryKey: ["modules-list", type],
    queryFn: () => GetAllModulesHandler(type, token),
    ...options,
  });
};
