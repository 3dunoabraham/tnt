import { BsArrowDown, BsSearch } from 'react-icons/bs'


import { StandardTableRest } from '@/components/molecules/StandardTableRest';
import { AiOutlineEllipsis } from 'react-icons/ai';
import { useContext, useRef, useState } from 'react';
import { AppContext } from '@/scripts/contexts/AppContext';
// ReactFunctionComponent
export const StandardTable = ({
    theArray, s__selectedId, selectedId, displayConfigObj,
    deleteUnit,
})=>{
    
    const app = useContext(AppContext)
    const $divObj =          useRef<HTMLDivElement>()
    const [isOpen, s__isOpen] =                     useState(false);
    const [isRedirecting, s__isRedirecting] =                     useState(false);
    const [isMenu, s__isMenu] =                     useState<number>(-1);

    return(<>
    <div className={"ims-bg-lightest flex bord-r-t-8 ims-border-faded"}>
        <div className={`w-20 flex  py-3 px-4 tx-sm`}>
            <div className="opaci-50 "> ID </div>
            <div className=" opaci-50 px-1"> <BsArrowDown /> </div>
        </div>
        <div className="flex-1 flex-center flex-justify-start tx-sm Q_md_x">
            {Object.keys(displayConfigObj.rest).map((aKey, index)=>{
                return (
                <div className="opaci-50   flex-1" key={aKey}>
                    {displayConfigObj.rest[aKey].title}
                </div>
                )
            })}
        </div>
    </div>
    <div className="ims-border-faded ">
        {theArray.map((item,index)=>{
            return (
            <div key={index} className="">
                <div
                    className={
                        `bloc pos-rel flex  flex-justify-start flex-align-center  `+
                        `${index == 0 || "ims-border-t-faded"}`
                    }
                >
                    <div  className="w-100 pos-rel " key={item.uid}>
                        <div 
                            className={`  opaci-cahov--50  Q_xs_sm_flex-col flex    pos-rel `}
                        >
                            <a href={`/unit/${item.uid}`} className="flex-justify-start w-20 py-3 opaci-cbhov--50 " >
                                <div className=" " onClick={() => {s__selectedId(index)}}>
                                    <div className="px-3 flex">
                                        {selectedId == index && 
                                            <div className='opaci-75 pos-abs hover-1 mr-2'>
                                                <div style={{transform:"translateX(-250%)"}}>
                                                    <BsSearch/>
                                                </div>
                                            </div>
                                        }
                                        {item.uid == "5916-9759" ? "*" : ""}
                                        #{item.uid}
                                    </div>
                                    <div className="Q_xs_md px-2 opaci-75 flex-1 py-2">
                                        
                                    </div>
                                </div>
                            </a>

                            <a href={`/unit/${item.uid}`} className="flex-1 flex-center " >
                                <div className="flex-1 flex-center" onClick={() => {;s__selectedId(index)}}>
                                    <StandardTableRest {...{displayConfigObj, item}}  />
                                </div>
                            </a>

                            {app.user.grants.unit.delete && 
                                <div className="bg-b-hov-10 bord-r-8  flex-center px-3 pt-1 pb-3 ma-1 pos-rel "
                                    onClick={()=>{s__isMenu(isMenu == index ? -1 : index );}}
                                >
                                    <button className="tx-gray scale-200">
                                        ... 
                                    </button>
                                
                                    { isMenu == index &&
                                        <div className="z-100 pos-abs cursor  left-0 translate-x--100 translate-x--100 nowrap mt-2 px-2" 
                                            ref={$divObj}
                                        >                                    
                                            <div className='tx-mdl z-100 bg-white box-shadow-3 bord-r-8  w-100 autoverflow-y' >
                                                <div className="flex-col h-min-100px pa-2 ">
                                                    <div className="flex-1">
                                                        
                                                    </div>
                                                    <button className={`ims-button-faded  tx-red-50  `}
                                                        onClick={async ()=>{deleteUnit(item.uid)}}
                                                    >
                                                        <span className="">Delete Unit</span>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    }
                                </div>
                            }

                        </div>
                    </div>
                </div>
            </div>)})}
        </div>
    </>)
}