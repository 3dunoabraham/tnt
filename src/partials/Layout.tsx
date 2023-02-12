// import Navbar from './navbar'
// import Footer from './footer'

import AppClientDesc from "@/src/items/AppClientDesc";
import Providers from "@/src/items/Providers";

export default function Layout({ children }) {
    return (
    <>
        {/* <AlertNotification /> */}
        <Providers>{children}</Providers>
    </>
    )
}
