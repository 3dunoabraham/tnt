"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import UserInformation from "./user-information";

export default function Component({ children }) {
    const { data: session } = useSession();
    if (session) {
        return (<>
        {children}
        <button className="mt-1 w-100 bg-w-10 pa-1 tx-white bord-r-8 opaci-chov--50" onClick={() => signOut()}>
            Sign out
        </button>
        </>);
    }
    return (
    <button className="w-100 tx-mdl nowrap  bg-w-10 pa-2 tx-white bord-r-8 opaci-chov--50"
        onClick={() => signIn()}
    >
        Sign in
    </button>
    );
}
