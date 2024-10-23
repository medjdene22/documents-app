
import { toast } from "sonner";
import { InferResponseType } from "hono";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { client } from "@/lib/hono";

type ResponseType = InferResponseType<typeof client.api.specialties[":id"]["$delete"]>



export const useDeleteSpecialties = (id?: string) => {

    const queryClient = useQueryClient();
    
    const mutation = useMutation<ResponseType, Error>({
        mutationFn: async () => {

            const response = await client.api.specialties[":id"]["$delete"]({param : {id}}) 
            return await response.json()
        },
        onSuccess: () => {
            toast.success("Specialties deleted successfully")
            queryClient.invalidateQueries({ queryKey: ["specialties", {id}]})
            queryClient.invalidateQueries({ queryKey: ["specialties"]})
        },
        onError: () => {
            toast.error("Failed to delete specialties")
        },
    })

    return mutation;
}