import { useQuery } from "@tanstack/react-query";
import { client } from "@/lib/hono";

export const useGetSpecialtie = (id?: string) => {

    const query = useQuery({
        enabled: !!id,
        queryKey: ["specialties", {id}],
        queryFn: async () => {

            const response = await client.api.specialties[":id"].$get({
                param: {id},
            });
            if (!response.ok) {
                throw new Error("faild to fetch specialties");
            }
            const {data} = await response.json();
            return data;
        }
    })
    return query;
}