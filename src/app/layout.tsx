// Import styles of packages that you've installed.
// All packages except `@mantine/hooks` require styles imports
import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';

import {ColorSchemeScript, MantineProvider, mantineHtmlProps} from '@mantine/core';
import {MainLayout} from "@/app/MainLayout";
import {Notifications} from '@mantine/notifications';
import React from "react";
import {Viewport} from "next";
import {getServerSession} from "next-auth";
import SessionProviderWrapper from "@/components/SessionProviderWrapper";

export const metadata = {
    title: 'Ward Walker',
    description: 'Co-ordinate Ward Walking',
};

export const viewport: Viewport = {
    themeColor: "#d06e10",
    initialScale: 1,
    width: "device-width",
    maximumScale: 1,
};

export default async function RootLayout({children,}: {
    children: React.ReactNode;
}) {
    const session = await getServerSession();

    return (
        <html lang="en" {...mantineHtmlProps}>
        <head>
            <ColorSchemeScript/>
            <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no"/>
        </head>
        <body>

        <SessionProviderWrapper session={session}>
            <MantineProvider>
                <Notifications position={"top-center"}/>
                <MainLayout>
                    {children}
                </MainLayout>
            </MantineProvider>
        </SessionProviderWrapper>

        </body>
        </html>
    );
}