// Import styles of packages that you've installed.
// All packages except `@mantine/hooks` require styles imports
import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';

import {ColorSchemeScript, MantineProvider, mantineHtmlProps} from '@mantine/core';
import {MainLayout} from "@/app/MainLayout";
import {AuthProviderWrapper} from "@/app/AuthProviderWrapper";
import {Notifications} from '@mantine/notifications';
import StoreProvider from "@/components/StoreProvider";
import React from "react";
import {Viewport} from "next";

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

export default function RootLayout({children,}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" {...mantineHtmlProps}>
        <head>
            <ColorSchemeScript/>
            <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no"/>
        </head>
        <body>

        <MantineProvider>
            <Notifications position={"top-center"}/>
            <StoreProvider>
                <AuthProviderWrapper>
                    <MainLayout>
                        {children}
                    </MainLayout>
                </AuthProviderWrapper>
            </StoreProvider>
        </MantineProvider>

        </body>
        </html>
    );
}