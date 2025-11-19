"use client";

import { UnauthorizedError } from "@/app/utils/errors";

export async function fetchWithAuth<T>(
    url: string,
    token: string | undefined | null,
    method: "GET" | "POST" | "PUT" = "GET"
): Promise<T> {
    if (!token) {
        throw new UnauthorizedError("Token is missing");
    }

    const response = await fetch(url, {
        method,
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
        },
    });

    if (response.status === 401) {
        throw new UnauthorizedError(`401 from ${url}`);
    }

    if (!response.ok) {
        throw new Error(`Failed to fetch from ${url}`);
    }

    return response.json();
}
