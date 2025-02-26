"use client";

import {useParams} from 'next/navigation';
import {Button, Container, Group, Paper, Table, Title} from "@mantine/core";
import Link from "next/link";
import {useEffect, useState} from "react";
import {fetchWithAuth} from "@/app/profile/page";
import {SiteDTO, WardDTO} from "@/app/DrsMessTypes";


export default function About() {

    const params = useParams();

    const [site, setSite] = useState<SiteDTO>({});

    useEffect(() => {
        if (params && params.healthBoard) {

            fetchWithAuth<SiteDTO>(`/api/v1/health-boards/${params.healthBoard}/sites/${params.siteId}`).then((hospitalResponse) => {
                if (hospitalResponse) {
                    setSite(hospitalResponse);
                }
            })
        }
    }, [params]);

    //
    // return <p>Post: {params?.healthBoard} / {params?.siteId}</p>

    return (
        <>
            <Container size={"md"} py={"xl"}>

                {/*<Text>Welcome, {nickname ? nickname : "Guest"}</Text>*/}

                <Paper shadow={"xs"} p={"xl"} mb={"xl"}>
                    <Title order={2} mb="xs">Details: {site.name}</Title>
                </Paper>

                <Table highlightOnHover verticalSpacing={"md"}>
                    <Table.Thead>
                        <Table.Tr>
                            <Table.Th>Ward</Table.Th>
                            <Table.Th>Last walked</Table.Th>
                        </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>
                        {site.wards?.map((ward: WardDTO) => (
                            <Table.Tr key={ward.code} style={{cursor: "pointer"}}>
                                <Table.Td>{ward.name}</Table.Td>
                                <Table.Td></Table.Td>
                            </Table.Tr>
                        ))}
                    </Table.Tbody>
                </Table>

                <Group mt="lg">
                    {/*<Button onClick={logout} variant="filled">Log Out</Button>*/}
                    <Button component={Link} href={"/"} variant="outline">Back</Button>
                </Group>
            </Container>


        </>
    )

}
