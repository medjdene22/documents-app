
import { create} from "zustand"

type OpenDepartmentState = {
    id?: string,
    isOpen: boolean,
    onOpen: (id: string) => void,
    onClose: () => void,
};


export const useOpenDepartment = create<OpenDepartmentState>((set) => ({
    id: undefined,
    isOpen : false,
    onOpen : (id: string) => set({isOpen : true, id}),
    onClose : () => set({isOpen : false, id:undefined}),
}));

   
