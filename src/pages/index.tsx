import type { ReactElement } from 'react'
import Layout from '@/src/items/layout'
import NestedLayout from '@/src/items/nestedLayout'
import type { NextPageWithLayout } from './_app'
import LoginBtn from "@/src/items/login-btn";
import AppClientDesc from "@/src/items/appClientDesc";

const Page: NextPageWithLayout = () => {
  return (
        <div>
            <h1>Serverless Login (github)</h1>
            
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
      <NestedLayout>{page}</NestedLayout>
    </Layout>
  )
}

export default Page
