"use client";

import {useParams} from 'next/navigation';
import {Accordion, Button, Container, Group, Modal, Paper, Text, Textarea, Title} from "@mantine/core";
import Link from "next/link";
import {useRouter} from "next/navigation";
import {useEffect, useState} from "react";
import {WalkDTO, WardDTO} from "@/app/DrsMessTypes";

import '@mantine/dates/styles.css'
import '@mantine/core/styles.layer.css';
import '@/app/layout-data-table.css';
import {DatePickerInput} from "@mantine/dates";
import {useForm} from "@mantine/form";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import {fetchWithAuth} from "@/utils/fetchWithAuth";
import {signIn, useSession} from "next-auth/react";
import {UnauthorizedError} from "@/app/utils/errors";

dayjs.extend(relativeTime);

export default function WardPage() {

    const router = useRouter();
    const params = useParams();
    const [modalOpened, setModalOpened] = useState(false);
    const [ward, setWard] = useState<WardDTO>({});
    const {data: session} = useSession({required: true});


    useEffect(() => {
        if (params && params.healthBoard) {
            fetchWithAuth<WardDTO>(`/api/v1/health-boards/${params.healthBoard}/sites/${params.siteId}/${params.wardId}`, session?.accessToken).then((resp) => {
                if (resp) {
                    setWard(resp);
                }
            })
                .catch((err) => {
                    if (err instanceof UnauthorizedError) {
                        signIn("cognito");
                    }
                })
        }
    }, [params]);

    const form = useForm({
        initialValues: {
            date: new Date(),
            comments: ''
        }
    })

    const handleSubmit = async (values: WalkDTO) => {
        try {
            const payload = {
                ...values,
                date: dayjs(values.date).format("YYYY-MM-DD") // Format just before submission
            };
            const response = await fetch(`/api/v1/health-boards/${params?.healthBoard}/sites/${params?.siteId}/${params?.wardId}/walks`, {
                method: 'POST',
                body: JSON.stringify(payload),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${session?.accessToken ?? ''}`
                }
            });
            if (!response.ok) {
                throw new Error('Unable to add ward walk');
            }
            setModalOpened(false);
            router.push(`/boards/${params?.healthBoard}/sites/${params?.siteId}/${params?.wardId}`);
        } catch (error) {
            console.error(error);
        }

    }

    return (
        <>
            <Modal opened={modalOpened} onClose={() => setModalOpened(false)} title="Add Details">
                <form onSubmit={form.onSubmit(handleSubmit)}>
                    <DatePickerInput
                        label="Date of ward walk"
                        placeholder="Pick date"
                        required
                        defaultValue={new Date()}
                        highlightToday
                        {...form.getInputProps('date')}
                        valueFormat={'YYYY-MM-DD'}
                        minDate={new Date(new Date().setMonth(new Date().getMonth() - 3))} // 3 months ago
                        maxDate={new Date(new Date().setDate(new Date().getDate() + 1))} // tomorrow
                        mb={"md"}
                    />
                    <Textarea
                        label="Additional Comments"
                        rows={4}
                        {...form.getInputProps('comments')}
                        description="eg the nature of any questions asked, who was on the ward"
                        placeholder="(optional)"
                        mb={"md"}
                    />
                    <Button type="submit">Save</Button>
                </form>
            </Modal>

            <Container size={"md"} py={"xl"}>
                <Paper shadow={"xs"} p={"xl"} mb={"xl"}>
                    <Title order={2} mb="xs">Details: {ward.name}</Title>
                    {(!ward.lastWalked) && (
                        <>No walks recorded (yet!)</>
                    )}
                    {(ward.lastWalked) && (
                        <Accordion variant={"separated"}>
                            {ward.walks?.map((walk) => {
                                return (
                                    <Accordion.Item key={walk.id} value={walk.id || ''}>
                                        <Accordion.Control>
                                            {dayjs(walk.date).isSame(dayjs(), "day")
                                                ? "today"
                                                : dayjs(walk.date).fromNow()
                                            }
                                            {" - "}{walk.name}
                                            {/*{dayjs(walk.date).fromNow()} - {walk.name}*/}
                                        </Accordion.Control>
                                        <Accordion.Panel>
                                            {(walk.comments) && (
                                                <Text>
                                                    {walk.comments}
                                                </Text>
                                            )}
                                            {(!walk.comments) && (
                                                <Text>
                                                    No comments
                                                </Text>
                                            )}
                                        </Accordion.Panel>
                                    </Accordion.Item>
                                )
                            })}
                        </Accordion>
                    )}
                    <Group mt={"xl"}>
                        <Button color={"blue"} onClick={() => setModalOpened(true)}>Add Walk</Button>
                    </Group>
                </Paper>

                <Group mt="lg">
                    {/*<Button onClick={logout} variant="filled">Log Out</Button>*/}
                    <Button component={Link} href={`/boards/${params?.healthBoard}/sites/${params?.siteId}`}
                            variant="outline">&lt; Back to {params?.siteId}</Button>
                </Group>
            </Container>


        </>
    )

}
