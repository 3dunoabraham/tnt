import type { ReactElement } from 'react'
import Layout from '@/src/items/layout'
import NestedLayout from '@/src/items/nestedLayout'
import type { NextPageWithLayout } from './_app'
import LoginBtn from "@/src/items/login-btn";
import AppClientDesc from "@/src/items/appClientDesc";
import Link from 'next/link';

const Page: NextPageWithLayout = () => {
    return (
    <div className='flex '>
        <Link href="/"><h2 className="">Home</h2></Link>
        <LoginBtn><AppClientDesc /></LoginBtn>
    </div>
    )
}

Page.getLayout = function getLayout(page: ReactElement) {
    return (
    <Layout>
        <NestedLayout>{page}</NestedLayout>
    </Layout>
    )
}

export default Page
