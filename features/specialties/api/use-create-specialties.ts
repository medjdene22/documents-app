
import { toast } from "sonner";
import { InferRequestType, InferResponseType } from "hono";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { client } from "@/lib/hono";

type ResponseType = InferResponseType<typeof client.api.specialties.$post>
type RequestType = InferRequestType<typeof client.api.specialties.$post>["json"]



export const useCreateSpecialties = () => {

    const queryClient = useQueryClient();
    
    const mutation = useMutation<ResponseType, Error, RequestType>({
        mutationFn: async (json) => {

            const response = await client.api.specialties.$post({json}) 
            return await response.json()
        },
        onSuccess: () => {
            toast.success("Specialties created successfully")
            queryClient.invalidateQueries({ queryKey: ["specialties"]})
        },
        onError: () => {
            toast.error("Failed to create Specialties")
        },
    })

    return mutation;
}