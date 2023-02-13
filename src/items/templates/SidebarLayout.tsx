import { AppContext } from '@/scripts/contexts/AppContext'
import { useContext, useState } from 'react'
import { BsBoxSeam, BsStack, BsBox, BsCircle, BsChevronDown, BsChevronUp } from 'react-icons/bs'
import { FiLogOut } from 'react-icons/fi'
import { UserModule } from '@/components/molecules/UserModule'


// ReactFunctionComponent
export const SidebarLayout = ({
    linksObj,isVisible,
})=>{
    const ICONS = {manufacturers: <BsStack />,hubs: <BsBox />,status: <BsCircle />}
    const app = useContext(AppContext)
    // const [amIDev,s__amIDev] = useState()
    if (!isVisible) return <UserModule /* amIDev={amIDev} s__amIDev={s__amIDev} */ isVisible={isVisible}/>
    return (
    <div  className="ims-bg-primary tx-white pos-rel ">

        <div className=" flex-col h-100">
            {/* <Link  href="/"> */}
                <a href="/" className=" tx-lgx tx-center tx-bold-6 Q_lg_x">
                    <div className="pa-4">INVENTORY</div>
                </a>
            {/* </Link> */}
            {/*<div className="py-4 tx-lgx tx-center tx-bold-6 Q_lg_x">
                INVENTORY
            </div>*/}
            <div className="pa-1 tx-xxl opaci-10 tx-center tx-bold-6 Q_xs_lg ">
                {<BsBoxSeam />}
            </div>
            {/*<div>
                <Image
                    className="bright-1000"
                    width="24"
                    height="24"
                    priority={true}
                    draggable={false}
                    src={downloadIcon.src}
                />
            </div>*/}
            {linksObj && Object.keys(linksObj).map((k,index)=>(
                <div className="" key={index}>
                    <SidebarExpandableItem itemGroupObj={linksObj[k]} theIcon={ICONS[k]} />
                </div>
            ))}
            <div className=' flex-1 flex-col w-100 '>
                <div className=' flex-1' >
                    
                </div>
                <div className='w-100 flex-row Q_xs_md_flex-col bg-b-20 w-100 pa-2'>
                    
                    { 
                        <UserModule isVisible={isVisible} /* amIDev={amIDev} s__amIDev={s__amIDev} *//>
                    }
                </div>
            </div>
        </div>
        {false &&
            <div className="h-100   pos-abs right-0 top-0  px-2  opaci-ahov-50 opaci-50 translate-x-50 grabble">
                <div className="h-100 bg-white   pl-1 box-shadow-5 opaci-bhov-50 ">
                </div>
            </div>
        }
    </div>
    )
}



export const SidebarExpandableItem = ({
    itemGroupObj, theIcon
})=>{
    const [isOpen, s__isOpen] = useState(false);

    return (
    <>
        <div className="flex-center py-4 clickble opaci-ahov--50 px-4" onClick={()=>{s__isOpen(!isOpen)}}>
            <div className=" pr-3  Q_lg_x">
            </div>
            <div className="px-1 tx-center tx-lg opaci-hov--50">
                {theIcon}
            </div>
            <div className="flex-1 pl-3 Q_lg_x w-min-200px">
                {itemGroupObj.title}
            </div>
            {isOpen && <div className="flex-1 pl-3 Q_xs_lg w-min-100px">
                {itemGroupObj.title}
            </div>}
            <div className=" tx-center opaci-bhov--50  tx-mdl Q_lg_x" >
                {!isOpen ? BsChevronDown({}) : BsChevronUp({})}
            </div>
        </div>
        <div className="bord-r-8 ">
            {isOpen && itemGroupObj.linkList.map((x,index)=>(
                <div key={index} className="flex-center bg-w-hov-33 clickble   bord-r-8">
                    <SidebarLinkItem x={x} index={index} length={itemGroupObj.linkList.length} />
                </div>
            ))}
        </div>
    </>
    )
}



export const SidebarLinkItem = ({
    x, index, length,
})=>{
    const isLastItem = index == 0
    const isFirstItem = index == length - 1
    return (
    <div className="flex w-100">
        <div className="flex w-100 Q_xs_lg  pos-rel ">
            <div className="tx-mdl nowrap   ims-bg-primary w-min-200px   "
                style={isLastItem ? {borderRadius:"0 8px 0 0"} : isFirstItem ? {borderRadius:"0 0 8px 0"} : {}}
            >
                <div className="flex-1  pl-4 py-2 opaci-hov--50">
                    {x}
                </div>
            </div>
        </div>
        <div className="flex w-100 Q_lg_x py-3 " >
            <div className="w-min-50px tx-lgx">
            </div>
            <div className="flex-1 ">
                {x}
            </div>
            <div className=" px-2 py-1 bg-w-33 mr-3 bord-r-25 tx-sm ">
                19
            </div>
        </div>
    </div>
    )
}