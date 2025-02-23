"use client";

import {useAuth} from "@espresso-lab/mantine-cognito";

export default function About() {

    const { logout, userAttributes } = useAuth();

    return (
        <div>About</div>
    )
}