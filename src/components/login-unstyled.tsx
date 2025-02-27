"use client";

import {signIn, signOut, useSession} from "next-auth/react"
import {UnstyledButton} from "@mantine/core";
import Link from "next/link";
import classes from "./login-unstyled.module.css";

export default function LoginUnstyled() {
    const session = useSession();
    if (session) {
        return (
            <>
                <UnstyledButton
                    component={Link} href={'/profile'} className={classes.control}
                    onClick={() => {
                        signOut();
                    }}>Logout</UnstyledButton>
            </>
        )
    }
    return (
        <>
            <UnstyledButton
                component={Link} href={'/profile'} className={classes.control}
                onClick={() => {
                    signIn("cognito");
                }}>Login</UnstyledButton>
        </>
    )
}