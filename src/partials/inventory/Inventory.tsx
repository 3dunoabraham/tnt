import { AppContext } from "@/scripts/contexts/AppContext";
import { BreadCrumbs } from "@/src/items/atoms/BreadCrumbs";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useContext, useMemo, useState } from "react";
import InventoryTable from '@/src/partials/inventory/InventoryTable'
import { useQuery } from "@tanstack/react-query";
import { DEFAULT_UNIT_FOREIGNS, fetchJsonArray, fetchUnitForeigns, parsedFetchedUnit } from "@/scripts/helpers/fetchHelper";
import { API_UNITS } from "@/scripts/constants/api";
import { LoadingInventory } from "@/src/partials/inventory/LoadingInventory";
import { sortIDDesc } from "@/scripts/helpers/type/arrayHelper";

export default function Component({}) {
    const app = useContext(AppContext)
    const { data: session } = useSession();
    
    const q_units = useQuery({queryKey: ['unitData'], queryFn: async () => await fetchJsonArray(API_UNITS, "Units"),})
    const q__units = useMemo(()=> (q_units.error || !q_units.data || q_units.isLoading) ? [] : q_units.data
    ,[q_units])
    const q_foreigns = useQuery({queryKey: ['foreignsData'], queryFn: async () => await fetchUnitForeigns(),})
    const q__foreigns = useMemo(()=>
        (q_foreigns.error || !q_foreigns.data || q_foreigns.isLoading) ? DEFAULT_UNIT_FOREIGNS : q_foreigns.data
    ,[q_foreigns])
    const q__customers = useMemo(()=>
        q__foreigns.customersArray.map((x)=>({...x,_name:`${x.full_name.first_name} ${x.full_name.last_name}`}))
    ,[q__foreigns])

    const pq__units = useMemo(()=>{
        if (!q__units || !q__units.length) return []
        let newUnitsArray= q__units.map((aUnit, index)=> {
            let theNewUnit = parsedFetchedUnit(aUnit, q__foreigns.orgsArray, q__customers) 
            return theNewUnit
        })
        return newUnitsArray.sort(sortIDDesc)
    },[q__units, q__foreigns, q__customers])

    return (
    <div className="h-min-100vh w-100 px-8 Q_xs_sm_px-2">
        <BreadCrumbs pages={[["/inventory","Inventory"]]} />
        
        <div className="flex-center">
            <h1 className="pt-6 tx-bold-5 flex-1 "> Inventory </h1>
            <Link  href="/unit/add" className="ims-button-primary clickble">+ New Unit</Link>
        </div>
        <hr className="my-2"/>
        {/* <SidebarFilterToolbar {...{filtersMap, filtersMap_do, configObj:{},}}/> */}
        <div className="mt-4 mb-150 h-100 flex-col flex-justify-start " >
            {q_units.isLoading && <LoadingInventory /> }
            {(!q_units.isLoading && !q__units.length) && <> 
                <div className='tx-xl opaci-10 tx-ls-5 pt-100 pb-8 tx-center w-100 tx-center'>No Units Found</div>
            </>}
            {!!q__units && !!q__units.length &&<>
                <InventoryTable filteredUnits={pq__units} />
            </>}
        </div>
        
    </div>
    )
}