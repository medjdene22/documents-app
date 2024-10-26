
import { toast } from "sonner";
import { InferResponseType } from "hono";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { client } from "@/lib/hono";

type ResponseType = InferResponseType<typeof client.api.departments[":id"]["$delete"]>



export const useDeleteDepartment = (id?: string) => {

    const queryClient = useQueryClient();
    
    const mutation = useMutation<ResponseType, Error>({
        mutationFn: async () => {

            const response = await client.api.departments[":id"]["$delete"]({param : {id}}) 
            return await response.json()
        },
        onSuccess: () => {
            toast.success("Department deleted")
            queryClient.invalidateQueries({ queryKey: ["departments", {id}]})
            queryClient.invalidateQueries({ queryKey: ["departments"]})

        },
        onError: () => {
            toast.error("Failed to delete department")
        },
    })

    return mutation;
}