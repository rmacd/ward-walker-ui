"use client";

import {useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import {Button, Container, Group, Paper, Progress, Table, Title, Text} from "@mantine/core";
import Link from "next/link";
import {HealthBoardDTO, SiteDTO, UserProfileDTO} from "@/app/DrsMessTypes";
import {fetchWithAuth} from "@/utils/fetchWithAuth";
import {useAppSelector} from "@/lib/hooks";
import {RootState} from "@/lib/store";
import LoadingSpinner from "@/components/LoadingSpinner";

export default function Home() {
    // const { logout } = useAuth();
    const router = useRouter();
    const [profile, setProfile] = useState<UserProfileDTO>({} as UserProfileDTO);
    const [nickname, setNickname] = useState<string | null>(null);
    const [healthBoard, setHealthBoard] = useState<HealthBoardDTO>({} as HealthBoardDTO);
    const [sites, setSites] = useState<SiteDTO[]>([]);
    const token = useAppSelector((state: RootState) => state.auth.accessToken);

    useEffect(() => {
        fetchWithAuth<UserProfileDTO>("/api/v1/profile", token).then((profileResponse) => {
            if (profileResponse) {
                setProfile(profileResponse);
                setNickname(profileResponse.nickname || '');
            }
        });
    }, []);

    useEffect(() => {
        if (profile.healthBoardId && profile.healthBoardId.length > 0) {
            fetchWithAuth<HealthBoardDTO>(`/api/v1/health-boards/${profile.healthBoardId}`, token).then((healthBoardResponse) => {
                if (healthBoardResponse) {
                    setHealthBoard(healthBoardResponse);
                }
            });

            fetchWithAuth<SiteDTO[]>(`/api/v1/health-boards/${profile.healthBoardId}/sites`, token).then((hospitalsResponse) => {
                if (hospitalsResponse) {
                    setSites(hospitalsResponse);
                }
            })
        }
    }, [profile]);

    useEffect(() => {
        if (!token || token.length == 0) {
            router.push('/login');
            return;
        }
    }, [token]);

    const handleRowClick = (healthBoardId: string, siteId: string) => {
        console.debug(`Navigating ${nickname} to hospital: ${healthBoardId}/${siteId}`);
        router.push(`/boards/${healthBoardId}/sites/${siteId}`);
    };

    if (!token || token.length == 0) {
        return <LoadingSpinner/>
    }

    if (profile.cognitoId && !(profile?.nickname)) {
        return (
            <>
                <Text mb={"md"}>You need to set up your profile first</Text>
                <Button component={Link} href={"/profile"}>Edit profile</Button>
            </>
        )
    }

    return (
        <Container size={"md"} py={"xl"}>

            {/*<Text>Welcome, {nickname ? nickname : "Guest"}</Text>*/}

            <Paper shadow={"xs"} p={"xl"} mb={"xl"}>
                <Title order={2} mb="xs">Ward Walks: {healthBoard.name}</Title>
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
                        <Table.Tr key={site.siteId} style={{cursor: "pointer"}} onClick={() => handleRowClick(healthBoard.hbId || '', site.siteId || '')}>
                            <Table.Td>{site.name}</Table.Td>
                            <Table.Td>
                                <Progress.Root size="xl">
                                    <Progress.Section value={site.percentWalked3m || 0} color="green">
                                        <Progress.Label>{Math.round(site.percentWalked3m || 0)}%</Progress.Label>
                                    </Progress.Section>
                                    <Progress.Section value={(100 - (site.percentWalked3m || 0))} color="red">
                                        <Progress.Label>{Math.round(100 - (site.percentWalked3m || 0))}% remaining</Progress.Label>
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
