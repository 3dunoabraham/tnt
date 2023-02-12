import type { ReactElement } from 'react'
import Layout from '@/src/partials/Layout'
import type { NextPageWithLayout } from './_app'
import AppClientDesc from "@/src/items/AppClientDesc";

const Page: NextPageWithLayout = () => {
    return (
        <div>
            <h1>Session (github)</h1>
            
            <div>
                <AppClientDesc />
            </div>
        </div>
    )
}

Page.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>
        {page}
    </Layout>
  )
}

export default Page
