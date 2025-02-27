"use client";

import { SessionProvider, useSession } from "next-auth/react";
import { useEffect } from "react";
import {Session} from "next-auth";

export default function SessionProviderWrapper({ children, session }: { children: React.ReactNode, session: Session | null }) {
    return (
        <SessionProvider session={session}>
            <SessionRefresher />
            {children}
        </SessionProvider>
    );
}

// Automatically refresh session when the app loads
function SessionRefresher() {
    const { status, update } = useSession();

    useEffect(() => {
        if (status === "authenticated") {
            update(); // Ensures session refreshes when the client loads
        }
    }, [status]);

    return null; // No UI needed, just ensures session updates
}
