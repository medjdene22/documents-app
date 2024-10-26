
import { toast } from "sonner";
import { InferResponseType } from "hono";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { client } from "@/lib/hono";

type ResponseType = InferResponseType<typeof client.api.specialties[":id"]["$delete"]>



export const useDeleteRequests = (id?: string) => {

    const queryClient = useQueryClient();
    
    const mutation = useMutation<ResponseType, Error>({
        mutationFn: async () => {

            const response = await client.api.specialties[":id"]["$delete"]({param : {id}}) 
            return await response.json()
        },
        onSuccess: () => {
            toast.success("Requests deleted successfully")
            queryClient.invalidateQueries({ queryKey: ["requests", {id}]})
            queryClient.invalidateQueries({ queryKey: ["requests"]})
        },
        onError: () => {
            toast.error("Failed to delete requests")
        },
    })

    return mutation;
}