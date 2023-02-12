import { AppContext } from "@/scripts/contexts/AppContext";
import { BreadCrumbs } from "@/src/items/atoms/BreadCrumbs";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useContext, useState } from "react";


export default function Component({}) {
    const app = useContext(AppContext)
    const { data: session } = useSession();
    const [zzz, s__zzz] = useState<boolean>(true);
    const [q__unitsArray, sq__unitsArray] = useState([]);

    return (
    <div className="h-100 w-100 px-8 Q_xs_sm_px-2">
        <BreadCrumbs pages={[["/inventory","Inventory"]]} />
        
        <div className="flex-center">
            <h1 className="pt-6 tx-bold-5 flex-1 "> Inventory </h1>
            <Link  href="/unit/add" className="ims-button-primary clickble">+ New Unit</Link>
        </div>
        <hr className="my-2"/>
        {/* <SidebarFilterToolbar {...{filtersMap, filtersMap_do, configObj:{},}}/> */}
        <div className="mt-4 mb-150 h-100 " >
            {/* {zzz && <LoadingInventory /> } */}
            {(!q__unitsArray || !q__unitsArray.length) && !zzz && <>
                <div className='tx-xl opaci-10 tx-ls-5 pt-100 pb-8 tx-center '>No Units Found</div>
            </>}
            {/* {!!q__unitsArray && !!q__unitsArray.length && !zzz &&<>
                <InventoryPageComponent filteredUnits={filteredUnits} />
            </>} */}
        </div>
        
    </div>
    )
}