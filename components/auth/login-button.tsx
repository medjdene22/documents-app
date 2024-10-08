"use client"

import { useRouter } from "next/navigation";

type LoginButtonProps = {
    children: React.ReactNode;
    mode?: "model" | "redirect"
    asChild?: boolean
}


export function LoginButton({
    children,
    mode = "redirect",
    asChild
}: LoginButtonProps) {

    const router = useRouter() 


    const onClick = () =>{
        router.push("/login")
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
