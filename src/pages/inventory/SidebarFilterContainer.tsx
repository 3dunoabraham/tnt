import { useMemo, useState } from 'react'
import Link from 'next/link'
import { BsBoxSeam, BsStack, BsBox, BsCircle, BsChevronDown } from 'react-icons/bs'
import { FaHandshake } from 'react-icons/fa'


import { useDeviceXS_LG } from '@/scripts/helpers/useHooksHelper';
import { SidebarFilterSection } from '@/components/organisms/SidebarFilterSection';
// ReactFunctionComponent
export const SidebarFilterContainer = ({
    filtersRefObj, 
    onFiltersUpdate,

})=>{
    /****** DATA ******/
    const _useDeviceXS_LG = useDeviceXS_LG()
    const pre_containerWidth = "400px"
    const containerWidth = useMemo(()=>{
        return pre_containerWidth
    },[pre_containerWidth]);

    const ICONS = {
        manufacturers: <BsStack />,
        hubs: <BsBox />,
        sales_status: <BsCircle />,
        dealer: <FaHandshake />,
    }


    /****** UPDATE ******/
    const handleClick = (data) => 
    {
        // console.log("handleClick")
        // console.log(data)

        onFiltersUpdate(data)
    }



    /****** HTML ******/
    return (
    <div className="ims-bg-primary tx-white box-shadow-4 pos-rel ">

        <div className="">
            <Link  href="/">
                <a className=" tx-lgx tx-center tx-bold-6 Q_lg_x"><div className="pa-4">INVENTORY</div></a>
            </Link>
            <div className="py-1 tx-xxl opaci-10 tx-center tx-bold-6 Q_xs_lg ">{<BsBoxSeam />}</div>
            {filtersRefObj && Object.keys(filtersRefObj).map((k,index)=>(
                <div className="" key={index}>
                    <SidebarFilterSection handleClick={handleClick} 
                        filterSection={filtersRefObj[k]} theIcon={ICONS[k]}
                    />
                </div>
            ))}
        </div>
        {false &&
            <div className="h-100 pos-abs right-0 top-0 px-2 opaci-ahov-50 opaci-50 grabble translate-x-50">
                <div className="h-100 bg-white   pl-1 box-shadow-5 opaci-bhov-50 "> </div>
            </div>
        }
    </div>
    )
}

