"use client";

import '@mantine/core/styles.css';
import classes from './MainLayout.module.css';
import {AppShell, Burger, Group, Title, UnstyledButton} from "@mantine/core";
import {useDisclosure} from "@mantine/hooks";
import Link from "next/link";
import {signIn, useSession} from "next-auth/react";
import LoginUnstyled from "@/components/login-unstyled";

const links = [
    {link: '/', label: 'Home'},
    {link: '/about', label: 'About'},
];

export function MainLayout({children}: { children: React.ReactNode }) {

    const [opened, {toggle}] = useDisclosure();
    const {data: session} = useSession({
        required: true,
        onUnauthenticated() {
            signIn("cognito")
        }
    });

    return (
        <AppShell
            header={{ height: 60 }}
            navbar={{ width: 300, breakpoint: 'sm', collapsed: { desktop: true, mobile: !opened } }}
            padding="md"
        >
            <AppShell.Header>
                <Group h="100%" px="md">
                    <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
                    <Group justify="space-between" style={{ flex: 1 }}>
                        {/*<MantineLogo size={30} />*/}
                        <Title order={3} style={{cursor: "pointer"}}>Ward Walker</Title>
                        <Group ml="xl" gap={0} visibleFrom="sm">
                            {links.map((link) => (
                                <UnstyledButton component={Link} href={link.link} key={link.label} className={classes.control}>{link.label}</UnstyledButton>
                            ))}

                            {(session) && (
                                <UnstyledButton component={Link} href={'/profile'} className={classes.control}>Profile</UnstyledButton>
                            )}

                            {(!session) && (
                                // <UnstyledButton component={Link} href={'/login'} className={classes.control}>Login</UnstyledButton>
                                <UnstyledButton onClick={() => signIn("cognito")}>Login</UnstyledButton>
                            )}

                        </Group>
                    </Group>
                </Group>
            </AppShell.Header>

            <AppShell.Navbar py="md" px={4}>
                {links.map((link) => (
                    <UnstyledButton component={Link} href={link.link} key={link.label} className={classes.control} onClick={toggle}>{link.label}</UnstyledButton>
                ))}

                <LoginUnstyled/>

            </AppShell.Navbar>

            <AppShell.Main>
                {children}
            </AppShell.Main>
        </AppShell>
    );
}