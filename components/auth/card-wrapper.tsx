"use client"

import { Card, CardContent, CardHeader, CardFooter } from "../ui/card";
import { BackButton } from "./back-button";
import { Header } from "./header";
import { Social } from "./social";

type LoginButtonProps = {
    children: React.ReactNode;
    headerLabel: string;
    backButtonLabel: string;
    backButtonHerf: string;
    showSocial?: boolean;
}


export function CardWarrper({
    children,
    headerLabel,
    backButtonLabel,
    backButtonHerf,
    showSocial,
}: LoginButtonProps) {




  return (
    <Card className="w-[400px] shadow-md mx-8">
        <CardHeader>
            <Header label={headerLabel}/>
        </CardHeader>
        <CardContent>{children}</CardContent>
        {showSocial && (
            <CardFooter>
                <Social/>
            </CardFooter>
        )}
        <CardFooter>
            <BackButton label={backButtonLabel} herf={backButtonHerf}/>
        </CardFooter>
    </Card>
  );
}
