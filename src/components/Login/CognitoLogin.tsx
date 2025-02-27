"use client";

import {CognitoProvider, Login} from '@rmacd/mantine-cognito';
import {useAppDispatch} from "@/lib/hooks";
import {setAccessToken, setAuthenticated} from "@/lib/authSlice";
import {useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import LoadingSpinner from "@/components/LoadingSpinner";

export default function CognitoLogin() {

    const router = useRouter();
    // const accessToken = useAppSelector((state: RootState) => state.auth.accessToken);
    const dispatch = useAppDispatch();

    const [accessToken, setLocalAccessToken] = useState<string>('');
    const [loggingIn, setLoggingIn] = useState(false);

    useEffect(() => {
        if (!accessToken || accessToken.length === 0) return;
        dispatch(setAccessToken(accessToken));
        dispatch(setAuthenticated(true));
        router.push('/');
    }, [accessToken, dispatch, router]);

    return (
        <>
            <CognitoProvider
                cognitoIdentityPoolID={''}
                cognitoClientID={"2p70vqn3mbdldgb1rqq7kr7p41"}
                cognitoUserPoolID={"eu-west-2_jZ9lnDbja"}>

                {(loggingIn) && (
                    <LoadingSpinner/>
                )}
                {(!loggingIn) && (
                    <Login onLogin={(attributes) => {
                        setLoggingIn(true);
                        setLocalAccessToken(attributes.accessToken);
                    }}/>
                )}
            </CognitoProvider>
        </>
    )
}
