
import { toast } from "sonner";
import { InferRequestType, InferResponseType } from "hono";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { client } from "@/lib/hono";

type ResponseType = InferResponseType<typeof client.api.specialties[":id"]["$patch"]>
type RequestType = InferRequestType<typeof client.api.specialties[":id"]["$patch"]>["json"]



export const useEditSpecialties = (id?: string) => {

    const queryClient = useQueryClient();
    
    const mutation = useMutation<ResponseType, Error, RequestType>({
        mutationFn: async (json) => {

            const response = await client.api.specialties[":id"]["$patch"]({param : {id}, json}) 
            return await response.json()
        },
        onSuccess: () => {
            toast.success("Specialties updated successfully")
            queryClient.invalidateQueries({ queryKey: ["specialties", {id}]})
            queryClient.invalidateQueries({ queryKey: ["specialties"]})
        },
        onError: () => {
            toast.error("Failed to edit specialties")
        },
    })

    return mutation;
}