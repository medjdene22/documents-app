import { useQuery } from "@tanstack/react-query";
import { client } from "@/lib/hono";

export const useGetRequests = () => {

    const query = useQuery({
        queryKey: ["requests"],
        queryFn: async () => {

            const response = await client.api.requests.$get();
            if (!response.ok) {
                throw new Error("faild to fetch requests");
            }
            const {data} = await response.json(); 
            return data
        }
    })
    return query;
}