
import { toast } from "sonner";
import { InferRequestType, InferResponseType } from "hono";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { client } from "@/lib/hono";

type ResponseType = InferResponseType<typeof client.api.departments["bulk-delete"]["$post"]>
type RequestType = InferRequestType<typeof client.api.departments["bulk-delete"]["$post"]>["json"]



export const useBulkDeleteDepartments = () => {

    const queryClient = useQueryClient();
    
    const mutation = useMutation<ResponseType, Error, RequestType>({
        mutationFn: async (json) => {

            const response = await client.api.departments["bulk-delete"].$post({json}) 
            return await response.json()
        },
        onSuccess: () => {
            toast.success("Departments deleted")
            queryClient.invalidateQueries({ queryKey: ["departments"]})

        },
        onError: () => {
            toast.error("Failed to delete departments")
        },
    })

    return mutation;
}