"use client";
import '@mantine/core/styles.css';
import classes from './MainLayout.module.css';
import {AppShell, Burger, Group, Title, UnstyledButton} from "@mantine/core";
import {useDisclosure} from "@mantine/hooks";
import Link from "next/link";

const links = [
    {link: '/', label: 'Home'},
    {link: '/about', label: 'About'},
    {link: '/profile', label: 'Profile'}
];

export function MainLayout({children}: { children: React.ReactNode }) {

    const [opened, {toggle}] = useDisclosure();



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
                        <Title order={3}>Ward Walker</Title>
                        <Group ml="xl" gap={0} visibleFrom="sm">
                            {links.map((link) => (
                                <UnstyledButton component={Link} href={link.link} key={link.label} className={classes.control}>{link.label}</UnstyledButton>
                            ))}
                        </Group>
                    </Group>
                </Group>
            </AppShell.Header>

            <AppShell.Navbar py="md" px={4}>
                {links.map((link) => (
                    <UnstyledButton key={link.label} className={classes.control}>{link.label}</UnstyledButton>
                ))}
            </AppShell.Navbar>

            <AppShell.Main>
                {children}
            </AppShell.Main>
        </AppShell>
    );
}