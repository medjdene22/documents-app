import { useQuery } from "@tanstack/react-query";
import { client } from "@/lib/hono";

export const useGetDepartments = () => {

    const query = useQuery({
        queryKey: ["departments"],
        queryFn: async () => {

            const response = await client.api.departments.$get();
            if (!response.ok) {
                throw new Error("faild to fetch departments");
             }
             const {data} = await response.json(); 
            return data;
        }
    })
    return query;
}