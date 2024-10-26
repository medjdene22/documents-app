"use client"

import { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation"
import { CardWarrper } from "./card-wrapper";
import { BeatLoader } from "react-spinners";
import { verifyToken } from "@/actions/verification";
import { FormError } from "../form-error";
import { FormSuccess } from "../form-success";


export function VerifyForm(){

    const searchParams = useSearchParams()
    const token = searchParams.get("token")

    const [error, setError] = useState< string | undefined >("")
    const [success, setSuccess] = useState< string | undefined >("")

    const onSubmit = useCallback(() => {

        if (!token) {
            setError("messing token")
            return
        }
        verifyToken(token)
        .then(res => {
            setSuccess(res.success)
            setError(res.error)
        })
        return

    }, [token])

    useEffect(() => {
        onSubmit()
    }, [onSubmit, success, error])


    return(
        <CardWarrper  headerLabel={"Confirming your email"} backButtonLabel={"Back to login"} backButtonHerf={"/auth/login"}>
            <div className="flex items-center w-full justify-center">
                {!success && !error && (<BeatLoader/>)}
            </div>
            <div className="space-y-2 mt-4">
                <FormError message={error} />
                <FormSuccess message={success} />
            </div>
        </CardWarrper>
    )

}