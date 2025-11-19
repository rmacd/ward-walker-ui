"use client";

import {Button, Container, Group, Paper, Title, Text, Card, Stack} from "@mantine/core";
import Link from "next/link";
import {IconFileSpreadsheet, IconMail} from "@tabler/icons-react";

export default function AddPage() {

    return (
        <Container size={"md"} py={"xl"}>

            <Paper shadow={"xs"} p={"xl"} mb={"xl"}>
                <Title order={2} mb={"md"}>Add data</Title>
                <Text mb={"md"}>
                    Not all sites are available on here: there is no central repository for all wards across all hospitals.
                </Text>
                <Text>You can add hospitals and wards via the buttons below (these will be loaded onto the system within a few hours).</Text>
            </Paper>

            <Stack gap="md" mt="lg">
                <Button
                    component="a"
                    href={"https://docs.google.com/spreadsheets/d/1bdKH8wBUO5JkoYPIWrROoBx4FIWRfXlg_zzLGpcRHxE/edit?usp=sharing"}
                    target="_blank"
                    rel="noopener noreferrer"
                    size="lg"
                    radius="xl"
                    fullWidth
                    leftSection={<IconFileSpreadsheet size={20} />}
                >
                    Add data via Google Sheets
                </Button>

                <Button
                    component="a"
                    href={"mailto:ron%40docs.scot?subject=Data%20update&body=(describe%20any%20data%20updates%20here,%20eg%20%22please%20add%20hospital%20X%22%20or%20%22please%20add%20ward%20Y%22)"}
                    size="lg"
                    radius="xl"
                    variant="outline"
                    fullWidth
                    leftSection={<IconMail size={20} />}
                >
                    Add via email
                </Button>
            </Stack>

            <Group mt="lg">
                <Button component={Link} href={"/"} variant="outline">Back</Button>
            </Group>
        </Container>
    )
}