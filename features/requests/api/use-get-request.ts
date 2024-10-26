import { useQuery } from "@tanstack/react-query";
import { client } from "@/lib/hono";

export const useGetRequest = (id?: string) => {

    const query = useQuery({
        enabled: !!id,
        queryKey: ["requests", {id}],
        queryFn: async () => {

            const response = await client.api.requests[":id"].$get({
                param: {id},
            });
            if (!response.ok) {
                throw new Error("faild to fetch request");
            }
            const {data} = await response.json();
            return data;
        }
    })
    return query;
}