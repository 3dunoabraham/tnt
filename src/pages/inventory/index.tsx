import { InputSelect } from "@/components/molecules/InputSelect"
import { StandardTable } from "@/components/molecules/StandardTable"
import { StandardTablePagination } from "@/components/molecules/StandardTablePagination"
import { InventoryExportCSV } from "@/components/pages/inventory/ExportCsv"
import { API_UNITS } from "@/scripts/constants/api"
import { AppContext } from "@/scripts/contexts/AppContext"
import { fetchDelete } from "@/scripts/helpers/fetchHelper"
import { useContext, useMemo, useState } from "react"
import { MapOrEntries, useIsClient, useLocalStorage, useMap } from "usehooks-ts"

export const InventoryPageComponent = ({filteredUnits}) => {
    const app = useContext(AppContext)
    const tableConfigObj = {
        key:{title:"UID",name:"uid"},
        rest:{
            vin:{title:"VIN",fieldName:"vin"},
            status:{title:"Status",fieldName:"sales_status",widget:"badge"},
            location:{title:"Location",fieldName:"location"},
            dealer:{title:"Dealer",fieldName:"dealer"},
        },
    }
    const isClient = useIsClient()
    const ITEMSPERPAGE_MAPARRAY:MapOrEntries<string, any> = (
        ["25", "50", "100", ].map(i => ([`${i}`,{label:`${i}`,id:`${i}`},]))
    )
    const [LS_itemsPerPage, s__LS_itemsPerPage] = useLocalStorage('itemsPerPage', 25)
    const [itemsPerPage,s__itemsPerPage] = useState<number>(LS_itemsPerPage)
    const [currentPage,s__currentPage] = useState(0)
    const itemsOffsetStart = useMemo(()=>(currentPage * itemsPerPage),[currentPage, itemsPerPage])
    const [itemsPerPageMap, itemsPerPageMap_do] = useMap<string, any>(ITEMSPERPAGE_MAPARRAY)
    const [selectedId,s__selectedId] = useState(-1)
    const lastPage = useMemo(()=>{
        if (filteredUnits.length < itemsPerPage) return 0
        return parseInt(`${Math.ceil((filteredUnits.length / itemsPerPage) - 1)}`) 
    } ,[filteredUnits, itemsPerPage])

    const paginatedUnits = useMemo(()=>{
        let thePaginatedUnits = filteredUnits.slice(itemsOffsetStart,itemsOffsetStart+itemsPerPage)
        return thePaginatedUnits // .sort(sortIDDesc)
    },[filteredUnits,itemsOffsetStart,itemsPerPage])
    


    const updateItemsPerPage = (newChangeObj)=> {
        if (!newChangeObj.value) return
        s__itemsPerPage(parseInt(`${newChangeObj.value}`))
        s__LS_itemsPerPage((prevValue: number) => parseInt(`${newChangeObj.value}`))
        s__currentPage(0)
    }
    const deleteUnit = async (uid)=>{
        let fetchDeleteRes:any = await fetchDelete(API_UNITS, {uids:[uid]})
        if (fetchDeleteRes && fetchDeleteRes.status >= 200 && fetchDeleteRes.status < 300)
        {
            app.alert("success","Deleted")
            window.location.reload()
        }
    }



    return (<>
    <div className="" >
        <StandardTable
            displayConfigObj={tableConfigObj}
            {...{s__selectedId,selectedId}}
            theArray={paginatedUnits} deleteUnit={deleteUnit}
        />
    </div>
    <StandardTablePagination {...{currentPage,s__currentPage, lastPage}} />
    {isClient && <>
        <div className="flex flex-justify-end mt-2">
            <div className="tx-sm flex-center pr-2 opaci-50">
                Items Per Page
            </div>
            <div className="tx-sm w-100px scale-90 ">
                <InputSelect
                    refId={`${itemsPerPage}`} display={`${itemsPerPage}`}
                    optName="label" optMap={itemsPerPageMap} 
                    boolConfig={["isReadOnly"]}
                    updateNewData={updateItemsPerPage}
                />
            </div>
        </div>
        <div className="flex flex-justify-end mt-2">
            <InventoryExportCSV unitsArray={filteredUnits} />
        </div>
    </>}
    </>)
}