import type { ReactElement } from 'react'
import Head from 'next/head'


import type { NextPageWithLayout } from '@/src/pages/_app'
import Layout from '@/src/partials/Layout'
import SidebarContainer from '@/src/partials/ims/SidebarContainer'
import Landing from '@/src/partials/index/Landing';
import SessionSidebar from "@/src/partials/ims/SessionSidebar";

const Page: NextPageWithLayout = () => {
  return (
        <div className='flex-center w-100 h-100vh'><Landing /></div>
    )
}

Page.getLayout = function getLayout(page: ReactElement) {
    return (
    <Layout>
        <Head><title>A Title</title></Head>
        <SidebarContainer sidebar={<SessionSidebar/>}>{page}</SidebarContainer>
    </Layout>
  )
}

export default Page