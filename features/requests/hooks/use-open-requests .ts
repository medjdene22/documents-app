
import { create} from "zustand"

type OpenrequestsState = {
    id?: string,
    isOpen: boolean,
    onOpen: (id: string) => void,
    onClose: () => void,
};


export const useOpenrequests = create<OpenrequestsState>((set) => ({
    id: undefined,
    isOpen : false,
    onOpen : (id: string) => set({isOpen : true, id}),
    onClose : () => set({isOpen : false, id:undefined}),
}));


   
