
import { create} from "zustand"

type OpenSpecialtiesState = {
    id?: string,
    isOpen: boolean,
    onOpen: (id: string) => void,
    onClose: () => void,
};


export const useOpenSpecialties = create<OpenSpecialtiesState>((set) => ({
    id: undefined,
    isOpen : false,
    onOpen : (id: string) => set({isOpen : true, id}),
    onClose : () => set({isOpen : false, id:undefined}),
}));

   
