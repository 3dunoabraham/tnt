import { useState } from "react";
import { BsChevronDown, BsChevronUp } from "react-icons/bs";
import { SidebarFilterButton } from "@/src/items/organisms/SidebarFilterButton";


export const SidebarFilterSection = ({
    filterSection, theIcon, handleClick, 
})=>{
    const [isOpen, s__isOpen] = useState(false);
    const handleTheClick = (id, label, optName, display)=>{
        handleClick({id, label, optName, display})
    }

    return (<>
    <div className="flex-center py-4 clickble  px-4  " onClick={()=>{s__isOpen(!isOpen)}}>
        <div className=" pr-3  Q_lg_x"></div>
        <div className="px-1 tx-center tx-lg opaci-hov--50">{theIcon}</div>
        <div className="flex-1 pl-3 Q_lg_x w-min-200px">{filterSection.filter.title}</div>
        {isOpen && <div className="flex-1 pl-3 Q_xs_lg w-min-100px">{filterSection.filter.title}</div>}
        <div className=" tx-center   tx-mdl Q_lg_x" >{!isOpen ? BsChevronDown({}) : BsChevronUp({})}</div>
    </div>
    <div className="bord-r-8 ">
        {isOpen && filterSection.optsArray.map((theOption,index)=>(
            <div key={index} className="flex-center bg-w-hov-33 clickble   bord-r-8">
                <SidebarFilterButton filter={filterSection.filter}
                    theOption={theOption} handleClick={handleTheClick}                    
                />
            </div>
        ))}
    </div>
    </> )
}