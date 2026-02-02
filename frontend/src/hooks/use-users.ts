import useSWR from "swr";
import { fetchUsers, type TypicodeUser } from "@/lib/api";

export function useUsers() {
  const { data, error, isLoading, mutate } = useSWR<TypicodeUser[]>(
    "users",
    fetchUsers,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: true,
    },
  );

  return {
    users: data || [],
    isLoading,
    isError: error,
    mutate,
  };
}
