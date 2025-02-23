"use client";

import React from "react";
import {MantineAuth} from "@espresso-lab/mantine-cognito";

export function AuthProviderWrapper({ children }: { children: React.ReactNode }) {
    return (
        <MantineAuth cognitoUserPoolId={"eu-west-2_jZ9lnDbja"} cognitoClientId={"2p70vqn3mbdldgb1rqq7kr7p41"}>
            {children}
        </MantineAuth>
    )
}