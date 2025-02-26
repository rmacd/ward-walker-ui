"use client";

import { useEffect, useState } from "react";
import {useRouter} from "next/navigation";
import {Button, Container, Group, Paper, Progress, Table, Text, Title} from "@mantine/core";
import Link from "next/link";
import {HealthBoardDTO, SiteDTO, UserProfileDTO} from "@/app/DrsMessTypes";
import {fetchWithAuth} from "@/app/profile/page";

export default function Home() {
    // const { logout } = useAuth();
    const router = useRouter();
    const [profile, setProfile] = useState<UserProfileDTO>({});
    const [nickname, setNickname] = useState<string | null>(null);
    const [healthBoard, setHealthBoard] = useState<HealthBoardDTO>({});
    const [sites, setSites] = useState<SiteDTO[]>([]);

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
            fetchWithAuth<HealthBoardDTO>(`/api/v1/health-boards/${profile.healthBoardId}`).then((healthBoardResponse) => {
                if (healthBoardResponse) {
                    setHealthBoard(healthBoardResponse);
                }
            });

            fetchWithAuth<SiteDTO[]>(`/api/v1/health-boards/${profile.healthBoardId}/sites`).then((hospitalsResponse) => {
                if (hospitalsResponse) {
                    setSites(hospitalsResponse);
                }
            })
        }
    }, [profile]);

    const handleRowClick = (healthBoardId: string, siteId: string) => {
        console.debug(`Navigating to hospital: ${healthBoardId}/${siteId}`);
        router.push(`/boards/${healthBoardId}/sites/${siteId}`);
    };

    return (
        <Container size={"md"} py={"xl"}>

            {/*<Text>Welcome, {nickname ? nickname : "Guest"}</Text>*/}

            <Paper shadow={"xs"} p={"xl"} mb={"xl"}>
                <Title order={2} mb="xs">Leaderboard: {healthBoard.name}</Title>
            </Paper>

            <Table highlightOnHover verticalSpacing={"md"}>
                <Table.Thead>
                    <Table.Tr>
                        <Table.Th>Hospital name</Table.Th>
                        <Table.Th>% walked [last 3/12]</Table.Th>
                    </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                    {sites.map((site: SiteDTO) => (
                        <Table.Tr key={site.siteId} style={{cursor: "pointer"}} onClick={() => handleRowClick(healthBoard.hbId, site.siteId || '')}>
                            <Table.Td>{site.name}</Table.Td>
                            <Table.Td>
                                <Progress.Root size="xl">
                                    <Progress.Section value={site.percentWalked3m || 0} color="green">
                                        <Progress.Label>{site.percentWalked3m}%</Progress.Label>
                                    </Progress.Section>
                                    <Progress.Section value={(100 - (site.percentWalked3m || 0))} color="red">
                                        <Progress.Label>{site.percentWalked3m}%</Progress.Label>
                                    </Progress.Section>
                                </Progress.Root>
                            </Table.Td>
                        </Table.Tr>
                    ))}
                </Table.Tbody>
            </Table>

            <Group mt="lg">
                {/*<Button onClick={logout} variant="filled">Log Out</Button>*/}
                <Button component={Link} href={"/about"} variant="outline">Learn More</Button>
            </Group>
        </Container>
    );
}
