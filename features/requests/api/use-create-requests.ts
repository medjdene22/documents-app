
import { toast } from "sonner";
import { InferRequestType, InferResponseType } from "hono";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { client } from "@/lib/hono";

type ResponseType = InferResponseType<typeof client.api.requests.$post>
type RequestType = InferRequestType<typeof client.api.requests.$post>["json"]


export const useCreateRequests = () => {

    const queryClient = useQueryClient();
    
    const mutation = useMutation<ResponseType, Error, RequestType>({
        mutationFn: async (json) => {

            const response = await client.api.requests.$post({json}) 
            return await response.json()
        },
        onSuccess: () => {
            toast.success("request created successfully")
            queryClient.invalidateQueries({ queryKey: ["requests"]})
        },
        onError: (error) => {
            toast.error(error.message)
        },
    })

    return mutation;
}