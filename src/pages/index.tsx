import type { ReactElement } from 'react'
import Layout from '@/src/partials/Layout'
import NestedLayout from '@/src/items/NestedLayout'
import type { NextPageWithLayout } from './_app'
import LoginBtn from "@/src/items/LoginBtn";
import AppClientDesc from "@/src/items/AppClientDesc";
import Head from 'next/head'
import Link from 'next/link';
import Landing from '@/src/partials/index/Landing';
import LandingSidebar from '@/src/partials/index/LandingSidebar';

const Page: NextPageWithLayout = () => {
  return (
        <div className='flex h-100vh'>
            <div className='flex-col ims-bg-primary tx-white'><LandingSidebar /></div>
            <div className='flex-center w-100'><Landing /></div>
        </div>
    )
}

Page.getLayout = function getLayout(page: ReactElement) {
    return (
    <Layout>
        <Head><title>A Title</title></Head>
        {page}
        {/* <NestedLayout>{page}</NestedLayout> */}
    </Layout>
  )
}

export default Page
