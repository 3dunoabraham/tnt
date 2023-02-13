import { ReactElement, useMemo } from 'react'
import Head from 'next/head'


import type { NextPageWithLayout } from '@/src/pages/_app'
import Layout from '@/src/partials/Layout'
import SidebarContainer from '@/src/partials/ims/SidebarContainer'
import FilterSidebar from "@/src/partials/ims/FilterSidebar";
import UnitAddComponent from '@/src/partials/unit/UnitAddComponent'
import { useRouter } from 'next/router'
import { useQuery } from '@tanstack/react-query'
import { DEFAULT_UNIT_FOREIGNS, fetchUnitForeigns, fetchUnitPageData } from '@/scripts/helpers/fetchHelper'
import { DEFAULT_UNIT, DEFAULT_UNIT_OPTS } from '@/scripts/constants/unit'

const Page: NextPageWithLayout = () => {
    
    const q_foreigns = useQuery({queryKey: ['foreignsData'], queryFn: async () => await fetchUnitPageData(),})
    const q__foreigns = useMemo(()=>
        (q_foreigns.error || !q_foreigns.data || q_foreigns.isLoading) ? null : q_foreigns.data
    ,[q_foreigns])

    return (
        <div className='flex-col w-100 h-min-100vh'><UnitAddComponent unit={DEFAULT_UNIT} optMapObj={q__foreigns} /></div>
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