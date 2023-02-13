import { ReactElement, useMemo } from 'react'
import Head from 'next/head'


import type { NextPageWithLayout } from '@/src/pages/_app'
import Layout from '@/src/partials/Layout'
import SidebarContainer from '@/src/partials/ims/SidebarContainer'
import FilterSidebar from "@/src/partials/ims/FilterSidebar";
import UnitViewEdit from '@/src/partials/unit/UnitViewEdit'
import { useRouter } from 'next/router'
import { useQuery } from '@tanstack/react-query'
import { DEFAULT_UNIT_FOREIGNS, fetchUnitForeigns, fetchUnitPageData } from '@/scripts/helpers/fetchHelper'
import { DEFAULT_UNIT_OPTS } from '@/scripts/constants/unit'

const Page: NextPageWithLayout = () => {
    
    const router = useRouter()
    const { id } = router.query

    const q_foreigns = useQuery({queryKey: ['foreignsData'], queryFn: async () => await fetchUnitPageData(),})
    const q__foreigns = useMemo(()=>
        (q_foreigns.error || !q_foreigns.data || q_foreigns.isLoading) ? null : q_foreigns.data
    ,[q_foreigns])

    if (!id) {return <div></div>}
    if (!q__foreigns) {return <div></div>}
    return (
        <div className='flex-center w-100 h-min-100vh'><UnitViewEdit id={id} optMapObj={q__foreigns} /></div>
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

// /****** SERVER ******/
// async function fetchUnitPageData() {
//     try {
//         let model_styles = await fetchJsonArray(API_UNIT_OPTS_BASE+"model_styles", "Model Styles")
//         let {inventory_statuses, sales_statuses, title_statuses, conditions} = await fetchUnitStatuses()
//         let orgsList = await fetchJsonArray(API_ORGS,"Orgs")
//         let {manufacturers, distributors, dealers, owners } = await fetchAndParseOrgTypes(orgsList)
            
//         return {
//             model_styles, inventory_statuses, sales_statuses, title_statuses, conditions,
//             orgsList, distributors, manufacturers, dealers, owners,
//         }
//     } catch (err) {
//         return DEFAULT_UNIT_OPTS
//     }
// }
// export async function getServerSideProps({ params, query }) {
//     let uid = query.id
//     let online = query.offline == undefined && !!uid && uid != "0000-0000"
//     let optMapObj = online ? await fetchUnitPageData() : DEFAULT_UNIT_OPTS
//     return {props: { online, optMapObj, id: uid} }
// }
