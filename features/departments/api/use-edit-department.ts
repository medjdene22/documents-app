
import { toast } from "sonner";
import { InferRequestType, InferResponseType } from "hono";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { client } from "@/lib/hono";

type ResponseType = InferResponseType<typeof client.api.departments[":id"]["$patch"]>
type RequestType = InferRequestType<typeof client.api.departments[":id"]["$patch"]>["json"]



export const useEditDepartment = (id?: string) => {

    const queryClient = useQueryClient();
    
    const mutation = useMutation<ResponseType, Error, RequestType>({
        mutationFn: async (json) => {

            const response = await client.api.departments[":id"]["$patch"]({param : {id}, json}) 
            return await response.json()
        },
        onSuccess: () => {
            toast.success("Department updated")
            queryClient.invalidateQueries({ queryKey: ["departments", {id}]})
            queryClient.invalidateQueries({ queryKey: ["departments"]})
        },
        onError: () => {
            toast.error("Failed to edit department")
        },
    })

    return mutation;
}