"use client"

import Link from "next/link";
import { Button } from "../ui/button"


type BackButtonProps = {
    label: string;
    herf: string;
}


export function BackButton({ label, herf}: BackButtonProps){

    return(
        <Button variant="link" className="font-normal w-full" size="sm" asChild>
            <Link href={herf}>
                {label}
            </Link>
        </Button>

    )

}