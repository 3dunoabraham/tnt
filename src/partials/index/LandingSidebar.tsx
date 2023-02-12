import Link from "next/link";


import AppClientDesc from "@/src/items/AppClientDesc";
import LoginBtn from "@/src/items/LoginBtn";

export default function Component({}) {
    return (<>
    <div className='flex px-4'>
        <Link className='tx-white tx-lgx nodeco py-4' href="/">
            <div className='Q_xs_md'>INV</div>
            <div className='Q_md_x'>Inventory</div>
        </Link>
    </div>
    <div className='flex-1'></div>
    <div className='pa-2 w-100'><LoginBtn><AppClientDesc /></LoginBtn></div>
    </>)
}