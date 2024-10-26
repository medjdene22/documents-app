
import { create} from "zustand"

type NewRequestsState = {
    isOpen: boolean,
    onOpen: () => void,
    onClose: () => void,
};


export const useNewrequests = create<NewRequestsState>((set) => ({
    isOpen : false,
    onOpen : () => set({isOpen : true}),
    onClose : () => set({isOpen : false}),
}));

   
