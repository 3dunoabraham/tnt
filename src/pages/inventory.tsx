import type { ReactElement } from 'react'
import Head from 'next/head'


import type { NextPageWithLayout } from '@/src/pages/_app'
import Layout from '@/src/partials/Layout'
import SidebarContainer from '@/src/partials/ims/SidebarContainer'
import Inventory from '@/src/partials/inventory/Inventory';
import FilterSidebar from "@/src/partials/ims/FilterSidebar";

const Page: NextPageWithLayout = () => {
  return (
        <div className='flex-center w-100 h-100vh'><Inventory /></div>
    )
}

Page.getLayout = function getLayout(page: ReactElement) {
    return (
    <Layout>
        <Head><title>Inventory</title></Head>
        <SidebarContainer sidebar={<FilterSidebar/>}>{page}</SidebarContainer>
    </Layout>
    )
}

export default Page