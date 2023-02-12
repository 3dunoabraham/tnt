import Link from "next/link";


export default function Component({}) {
    return (<>
    <div className='flex px-4'>
        <Link className='tx-white tx-lgx nodeco py-4' href="/">
            <div className='Q_xs_md'>IMS</div>
            <div className='Q_md_x'>Inventory</div>
        </Link>
    </div>
    </>)
}