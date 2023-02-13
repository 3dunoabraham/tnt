import { AppContext } from "@/scripts/contexts/AppContext";
import { BreadCrumbs } from "@/src/items/atoms/BreadCrumbs";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useContext, useMemo, useState } from "react";
import InventoryPageComponent from '@/src/partials/inventory'
import { useQuery } from "@tanstack/react-query";
import { fetchJsonArray } from "@/scripts/helpers/fetchHelper";
import { API_UNITS } from "@/scripts/constants/api";
import { LoadingInventory } from "@/src/partials/inventory/LoadingInventory";

export default function Component({}) {
    const app = useContext(AppContext)
    const { data: session } = useSession();
    
    const q_units = useQuery({queryKey: ['unitData'], queryFn: async () => await fetchJsonArray(API_UNITS, "Units"),})

    const q__units = useMemo(()=>{
        if (q_units.error || !q_units.data || q_units.isLoading) return []
        // s__zzz(false)
        return q_units.data
    },[q_units])

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
                <InventoryPageComponent filteredUnits={q__units} />
            </>}
        </div>
        
    </div>
    )
}