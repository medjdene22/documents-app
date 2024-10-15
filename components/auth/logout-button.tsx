"use client"

import { Logout } from "@/actions/logout";

type Props = {
    children: React.ReactNode;
}

export function LogoutButton({
    children,
}: Props) {

    const onClick = () =>{
        Logout() 
    }

  return (
    <span onClick={onClick} className="cursor-pointer">
        {children}
    </span>
  );
}
