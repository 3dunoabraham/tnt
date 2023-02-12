import { AppContext } from "@/scripts/contexts/AppContext";
import { BreadCrumbs } from "@/src/items/atoms/BreadCrumbs";
import { useSession } from "next-auth/react";
import { useContext } from "react";


export default function Component({}) {
    const app = useContext(AppContext)
    const { data: session } = useSession();

    return (
    <div className="h-100 w-100 px-8 Q_xs_sm_px-2">
        <BreadCrumbs pages={[["/inventory","Inventory"]]} />
        <div onClick={()=>{app.alert("neutral", "hello")}} className='tx-xxxl tx-bold-2 opaci-25 tx-ls-8 pa-8'>
            TABLE
        </div>
        
    </div>
    )
}