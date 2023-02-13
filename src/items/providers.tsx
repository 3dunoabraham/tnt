"use client";

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { SessionProvider } from "next-auth/react";

export default function Providers({ children }) {

    return (
        <SessionProvider>{children}</SessionProvider>
    )
}
