"use client"

import { useRouter } from "next/navigation";

type LoginButtonProps = {
    children: React.ReactNode;
    mode?: "model" | "redirect"
}


export function LoginButton({
    children,
    mode = "redirect",
}: LoginButtonProps) {

    const router = useRouter() 

    const onClick = () =>{
        router.push("/auth/login")
        console.log("Login Button clicked")
    }

    if (mode === "model") {
        return(
            <span>Todo</span>
        )
        
    }

  return (
    <span onClick={onClick} className="cursor-pointer">
        {children}
    </span>
  );
}
