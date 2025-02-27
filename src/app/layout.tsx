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

export const metadata = {
    title: 'Ward Walker',
    description: 'Co-ordinate Ward Walking',
};

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" {...mantineHtmlProps}>
        <head>
            <ColorSchemeScript/>
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