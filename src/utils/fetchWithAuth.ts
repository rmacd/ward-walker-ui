"use client";

export async function fetchWithAuth<T>(url: string, token: string | undefined | null, method: "GET" | "POST" | "PUT" = "GET"): Promise<T | null> {
    if (null == token || token.length == 0) {
        console.error("Token is missing");
        return null;
    }
    try {
        const response = await fetch(url, {
            method,
            headers: {
                "Authorization": `Bearer ${token ?? ""}`,
                "Content-Type": "application/json",
            },
        });
        if (!response.ok) {
            throw new Error(`Failed to fetch from ${url}`);
        }
        return await response.json();
    } catch (error) {
        console.error(`Error fetching from ${url}:`, error);
        return null;
    }
}
