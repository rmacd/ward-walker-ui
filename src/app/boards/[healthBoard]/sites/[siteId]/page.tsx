"use client";

import {useParams} from 'next/navigation';
import {Button, Container, Group, Paper, Title} from "@mantine/core";
import Link from "next/link";
import {useRouter} from "next/navigation";
import {useEffect, useState} from "react";
import {fetchWithAuth} from "@/app/profile/page";
import {SiteDTO, WardDTO} from "@/app/DrsMessTypes";

import sortBy from 'lodash/sortBy';
import dayjs from 'dayjs';
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

import '@mantine/core/styles.layer.css';
import 'mantine-datatable/styles.layer.css';
import '@/app/layout-data-table.css';
import {DataTable, DataTableSortStatus} from "mantine-datatable";

export default function About() {

    const router = useRouter();
    const params = useParams();

    const [site, setSite] = useState<SiteDTO>({});

    useEffect(() => {
        if (params && params.healthBoard) {
            fetchWithAuth<SiteDTO>(`/api/v1/health-boards/${params.healthBoard}/sites/${params.siteId}`).then((hospitalResponse) => {
                if (hospitalResponse) {
                    setSite(hospitalResponse);
                    const data = sortBy(hospitalResponse.wards, sortStatus.columnAccessor) as WardDTO[];
                    setRecords(sortStatus.direction === 'desc' ? data.reverse() : data);
                }
            })
        }
    }, [params]);

    const [sortStatus, setSortStatus] = useState<DataTableSortStatus<WardDTO>>({
        columnAccessor: 'name',
        direction: 'asc',
    });
    const [records, setRecords] = useState(sortBy(site.wards, 'name'));

    // Apply sorting when sortStatus changes
    useEffect(() => {
        if (site) {
            const sortedData = sortBy(site.wards, sortStatus.columnAccessor);
            setRecords(sortStatus.direction === 'desc' ? sortedData.reverse() : sortedData);
        }
    }, [sortStatus, site]);

    const now = dayjs();

    const handleRowClick = (wardCode: string) => {
        console.debug(`Navigating to ward: ${params?.healthBoard}/${params?.siteId}/${wardCode}`);
        router.push(`/boards/${params?.healthBoard}/sites/${params?.siteId}/${wardCode}`);
    };

    return (
        <>
            <Container size={"md"} py={"xl"}>

                {/*<Text>Welcome, {nickname ? nickname : "Guest"}</Text>*/}

                <Paper shadow={"xs"} p={"xl"} mb={"xl"}>
                    <Title order={2} mb="xs">Details: {site.name}</Title>
                </Paper>

                <DataTable
                    verticalSpacing={"sm"}
                    highlightOnHover
                    records={records || []}
                    onRowClick={({ record }) => {
                        handleRowClick(record.code || '')
                    }}
                    columns={[
                        {
                            accessor: 'code',
                            title: 'code',
                            width: 80,
                        },
                        {
                            accessor: 'name',
                            title: 'name',
                            textAlign: 'left',
                            sortable: true,
                        },
                        {
                            accessor: 'lastWalked',
                            title: 'Last Walked',
                            sortable: true,
                            render: ({lastWalked}) => {
                                return (<>{(lastWalked) ? dayjs(lastWalked).fromNow() : 'never'}</>)
                            }
                        }
                    ]}
                    sortStatus={sortStatus}
                    onSortStatusChange={setSortStatus}
                />

                <Group mt="lg">
                    {/*<Button onClick={logout} variant="filled">Log Out</Button>*/}
                    <Button component={Link} href={"/"} variant="outline">Back</Button>
                </Group>
            </Container>

        </>
    )

}
