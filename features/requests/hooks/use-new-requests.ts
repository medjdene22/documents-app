
import { create} from "zustand"

type NewSpecialtiesState = {
    isOpen: boolean,
    onOpen: () => void,
    onClose: () => void,
};


export const useNewSpecialties = create<NewSpecialtiesState>((set) => ({
    isOpen : false,
    onOpen : () => set({isOpen : true}),
    onClose : () => set({isOpen : false}),
}));

   
