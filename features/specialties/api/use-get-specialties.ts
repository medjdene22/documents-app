import { dataTagSymbol, useQuery } from "@tanstack/react-query";
import { client } from "@/lib/hono";
import { useSearchParams } from "next/navigation";

export const useGetSpecialties = () => {

    const params = useSearchParams();
    const departmentId = params.get("accountId") || "" ;

    const query = useQuery({
        queryKey: ["specialties", { departmentId}],
        queryFn: async () => {

            const response = await client.api.specialties.$get({
                query: {departmentId},
            });
            if (!response.ok) {
                throw new Error("faild to fetch specialties");
            }
            const {data} = await response.json(); 
            return data
        }
    })
    return query;
}