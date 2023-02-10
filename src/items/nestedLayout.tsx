// import Navbar from './navbar'
// import Footer from './footer'

export default function NestedLayout({ children }) {
    return (
    <>
        {/* <Navbar /> */}
        <div>Nested</div>
        <main>{children}</main>
        {/* <Footer /> */}
        <div>layout</div>
    </>
    )
}
