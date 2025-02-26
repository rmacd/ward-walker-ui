"use client";

import { useEffect, useState } from "react";
import { Button, Container, Group, Paper, Text, Title } from "@mantine/core";
import Link from "next/link";
import { useAuth } from "@espresso-lab/mantine-cognito";
import { getAccessToken } from "@espresso-lab/mantine-cognito";
import {HealthBoardDTO, UserProfileDTO} from "@/app/DrsMessTypes";

async function fetchWithAuth<T>(url: string, method: "GET" | "POST" | "PUT" = "GET"): Promise<T | null> {
    try {
        const token = await getAccessToken();
        const response = await fetch(url, {
            method,
            headers: {
                "Authorization": `Bearer ${token ?? ""}`,
                "Content-Type": "application/json",
            },
        });
        if (!response.ok) {
            throw new Error(`Failed to fetch from ${url}`);
        }
        return await response.json();
    } catch (error) {
        console.error(`Error fetching from ${url}:`, error);
        return null;
    }
}


export default function Home() {
    const { logout } = useAuth();
    const [profile, setProfile] = useState<UserProfileDTO>({});
    const [nickname, setNickname] = useState<string | null>(null);
    const [healthBoard, setHealthBoard] = useState<HealthBoardDTO>({});

    useEffect(() => {
        fetchWithAuth<UserProfileDTO>("/api/v1/profile").then((profileResponse) => {
            if (profileResponse) {
                setProfile(profileResponse);
                setNickname(profileResponse.nickname || '');
            }
        });
    }, []);

    useEffect(() => {
        if (profile.healthBoardId && profile.healthBoardId.length > 0) {
            fetchWithAuth<HealthBoardDTO>("/api/v1/health-boards/" + profile.healthBoardId).then((healthBoardResponse) => {
                if (healthBoardResponse) {
                    console.log(healthBoardResponse);
                    setHealthBoard(healthBoardResponse);
                }
            });
        }
    }, [profile]);

    return (
        <Container size={"md"} py={"xl"}>

            <Text>Welcome, {nickname ? nickname : "Guest"}</Text>

            <Paper shadow={"xs"} p={"xl"} mb={"xl"}>
                <Title order={2} mb="xs">Leaderboard: {healthBoard.name}</Title>


            </Paper>

            <Group mt="lg">
                <Button onClick={logout} variant="filled">Log Out</Button>
                <Button component={Link} href={"/about"} variant="outline">Learn More</Button>
            </Group>
        </Container>
    );
}
