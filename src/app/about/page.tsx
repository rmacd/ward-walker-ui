"use client";

import {useAuth} from "@espresso-lab/mantine-cognito";
import {Button, Container, Group, Paper, Title, Text} from "@mantine/core";
import Link from "next/link";

export default function About() {

    return (
        <Container size={"md"} py={"xl"}>

            <Paper shadow={"xs"} p={"xl"} mb={"xl"}>
                <Title order={2} mb="xs">About</Title>
                <Text mb={"md"}>
                    This is very much an alpha version. Don&#39;t store anything on here you wouldn&#39;t want your granny to read.
                </Text>
                <Text mb={"md"}>
                    Please submit complaints or suggestions to <a href={"mailto:ron@docs.scot"}>ron@docs.scot</a>.
                </Text>
            </Paper>

            <Group mt="lg">
                <Button component={Link} href={"/"} variant="outline">Back</Button>
            </Group>
        </Container>
    )
}