// import Navbar from './navbar'
// import Footer from './footer'

export default function Layout({ children }) {
  return (
    <>
      {/* <Navbar /> */}
      <div>navbar</div>
      <main>{children}</main>
      {/* <Footer /> */}
      <div>footer</div>
    </>
  )
}
