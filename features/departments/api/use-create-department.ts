
import { toast } from "sonner";
import { InferRequestType, InferResponseType } from "hono";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { client } from "@/lib/hono";

type ResponseType = InferResponseType<typeof client.api.departments.$post>
type RequestType = InferRequestType<typeof client.api.departments.$post>["json"]



export const useCreateDepartment = () => {

    const queryClient = useQueryClient();
    
    const mutation = useMutation<ResponseType, Error, RequestType>({
        mutationFn: async (json) => {

            const response = await client.api.departments.$post({json}) 
            return await response.json()
        },
        onSuccess: () => {
            toast.success("Department created")
            queryClient.invalidateQueries({ queryKey: ["departments"]})
        },
        onError: () => {
            toast.error("failed to create department")
        },
    })

    return mutation;
}