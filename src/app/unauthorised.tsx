import {Button, Container, Group, Paper, Text, Title} from "@mantine/core";
import Link from "next/link";

export default function Unauthorised() {

    return (
        <Container size={"md"} py={"xl"}>
            <Paper shadow={"xs"} p={"xl"} mb={"xl"}>
                <Title order={2}>Welcome to Ward Walker</Title>
                <Text size="lg" mt="md">
                    Coordinate your ward walking efforts with ease.
                </Text>
            </Paper>

            <Paper shadow={"xs"} p={"xl"} mb={"xl"}>
                <Text mb="xs">Why use Ward Walker?</Text>
                <ul>
                    <li>See which wards have been covered.</li>
                    <li>Plan visits by reserving a ward.</li>
                    <li>Get a clear overview across the health board / trust.</li>
                </ul>
                <Text>Note that only authorised and approved users are able to access the Ward Walker.</Text>
            </Paper>

            <Group mt="lg">
                {/*<Button onClick={logout} variant="filled">Log In</Button>*/}
                <Button component={Link} href={"/about"} variant="outline">Learn More</Button>
            </Group>
        </Container>
    )
}