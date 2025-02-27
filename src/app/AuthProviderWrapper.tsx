"use client";

import React from "react";
import {CognitoProvider} from "@rmacd/mantine-cognito";

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