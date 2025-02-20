import { useQuery } from "@tanstack/react-query";
import { User } from "../types";
import { api } from "../services/api";

interface UseUsersReturn {
  users: User[];
  loading: boolean;
  error: string;
  refetch: () => Promise<void>;
}

const USERS_QUERY_KEY = ["users"] as const;

export const useUsers = (): UseUsersReturn => {
  const {
    data: users = [],
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: USERS_QUERY_KEY,
    queryFn: api.getUsersOld,
  });

  return {
    users,
    loading: isLoading,
    error: error?.message || "",
    refetch: async () => {
      await refetch();
    },
  };
};
