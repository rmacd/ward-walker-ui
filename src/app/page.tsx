"use client";

import { useEffect, useState } from "react";
import { Button, Container, Group, Paper, Text, Title } from "@mantine/core";
import Link from "next/link";
import { useAuth } from "@espresso-lab/mantine-cognito";
import { getAccessToken } from "@espresso-lab/mantine-cognito";
import {UserProfileDTO} from "@/app/DrsMessTypes";

async function fetchUserProfile(): Promise<UserProfileDTO | null> {
    try {
        const token = await getAccessToken();
        const response = await fetch("/api/v1/profile", {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token ?? ""}`,
            },
        });

        if (!response.ok) {
            throw new Error("Failed to fetch user profile");
        }

        return await response.json();
    } catch (error) {
        console.error("Error fetching user profile:", error);
        return null;
    }
}

export default function Home() {
    const { logout } = useAuth();
    const [nickname, setNickname] = useState<string | null>(null);

    useEffect(() => {
        fetchUserProfile().then((profile) => {
            if (profile) {
                setNickname(profile.nickname);
            }
        });
    }, []);

    return (
        <Container size={"md"} py={"xl"}>
            <Paper shadow={"xs"} p={"xl"} mb={"xl"}>
                <Title order={2}>Welcome, {nickname ? nickname : "Guest"}</Title>
            </Paper>

            <Paper shadow={"xs"} p={"xl"} mb={"xl"}>
                <Text mb="xs">Why use Ward Walker?</Text>
                <ul>
                    <li>See which wards have been covered.</li>
                    <li>Plan visits by reserving a ward.</li>
                    <li>Get a clear overview across the health board / trust.</li>
                </ul>
                <Text>
                    Note that only authorised and approved users are able to access the Ward Walker.
                </Text>
            </Paper>

            <Group mt="lg">
                <Button onClick={logout} variant="filled">Log Out</Button>
                <Button component={Link} href={"/about"} variant="outline">Learn More</Button>
            </Group>
        </Container>
    );
}
