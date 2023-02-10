import type { ReactElement } from 'react'
import Layout from '@/src/items/layout'
import NestedLayout from '@/src/items/nestedLayout'
import type { NextPageWithLayout } from './_app'
import LoginBtn from "@/src/items/login-btn";
import AppClientDesc from "@/src/items/appClientDesc";
import Head from 'next/head'
import Link from 'next/link';

const Page: NextPageWithLayout = () => {
  return (
        <div>
            <h1>Serverless Login (github)</h1>
            
            <Link href="/inventory"><h2 className="">Inventory</h2></Link>
            
            <div>
                <LoginBtn>
                    <AppClientDesc />
                </LoginBtn>
            </div>
        </div>
    )
}

Page.getLayout = function getLayout(page: ReactElement) {
    return (
    <Layout>
        <Head><title>A Title</title></Head>
        <NestedLayout>{page}</NestedLayout>
    </Layout>
  )
}

export default Page
