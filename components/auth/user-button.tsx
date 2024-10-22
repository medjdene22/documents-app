"use client"

import { FaUser } from "react-icons/fa"

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { LogoutButton } from "./logout-button"
import { ExitIcon } from "@radix-ui/react-icons"

export const UserButton = ({image} : {image: string | null | undefined}) => {

    
    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <Avatar className="w-8 h-8">
                    <AvatarImage src={image || ""} />
                    <AvatarFallback className="bg-sky-500">
                        <FaUser className="text-white"/>
                    </AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-32 rounded-xl bg-white p-2 shadow-md">
                <LogoutButton>
                    <DropdownMenuItem>
                        <div className="flex items-center gap-x-2 cursor-pointer">
                            <ExitIcon className="h-4 w-4"/>
                            <span>Logout</span>
                        </div>
                    </DropdownMenuItem>
                </LogoutButton>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}