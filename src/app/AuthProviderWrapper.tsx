"use client";

import React from "react";
// import dynamic from "next/dynamic";
import {CognitoProvider} from "@rmacd/mantine-cognito";

// const MantineAuth = dynamic(
//     () => import('@espresso-lab/mantine-cognito').then((mod) => mod.MantineAuth),
//     { ssr: false } // Ensure it's client-side only
// );

export function AuthProviderWrapper({ children }: { children: React.ReactNode }) {
    return (
        <CognitoProvider
            cognitoIdentityPoolID={''}
            cognitoUserPoolID={"eu-west-2_jZ9lnDbja"}
            cognitoClientID={"2p70vqn3mbdldgb1rqq7kr7p41"}>
            {children}
        </CognitoProvider>
    )
}