"use client";

import {useParams} from 'next/navigation';
import {Button, Container, Group, Paper, Text, Title} from "@mantine/core";
import Link from "next/link";
import {useRouter} from "next/navigation";
import {useEffect, useState} from "react";
import {SiteDTO, WardDTO} from "@/app/DrsMessTypes";
import {fetchWithAuth} from "@/utils/fetchWithAuth";
import sortBy from 'lodash/sortBy';
import dayjs from 'dayjs';
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);
import '@mantine/core/styles.layer.css';
import 'mantine-datatable/styles.layer.css';
import '@/app/layout-data-table.css';
import {DataTable, DataTableSortStatus} from "mantine-datatable";
import {useAppSelector} from "@/lib/hooks";
import {RootState} from "@/lib/store";

export default function SitePage() {

    const router = useRouter();
    const params = useParams();
    const token = useAppSelector((state: RootState) => state.auth.accessToken);


    const [site, setSite] = useState<SiteDTO>({});

    useEffect(() => {
        if (params && params.healthBoard) {
            fetchWithAuth<SiteDTO>(`/api/v1/health-boards/${params.healthBoard}/sites/${params.siteId}`, token).then((hospitalResponse) => {
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

    const handleRowClick = (wardCode: string) => {
        console.debug(`Navigating to ward: ${params?.healthBoard}/${params?.siteId}/${wardCode}`);
        router.push(`/boards/${params?.healthBoard}/sites/${params?.siteId}/${wardCode}`);
    };

    return (
        <>
            <Container size={"md"} py={"xl"}>

                {/*<Text>Welcome, {nickname ? nickname : "Guest"}</Text>*/}

                <Paper shadow={"xs"} p={"xl"} mb={"xl"}>
                    <Title order={2} mb="xs">Ward Walks: {site.name}</Title>
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
                            accessor: 'name',
                            title: 'name',
                            textAlign: 'left',
                            sortable: true,
                        },
                        {
                            accessor: 'lastWalked',
                            title: 'Last Walked',
                            sortable: true,
                            render: ({lastWalked, code}) => {
                                return (<Text key={code || ''}>{(lastWalked) ? dayjs(lastWalked).fromNow() : 'never'}</Text>)
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
