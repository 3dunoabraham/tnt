import { useMemo } from "react";
import { CSVLink } from "react-csv";


// ReactFunctionComponent
export const InventoryExportCSV =({ unitsArray }) =>{
    const csvData = useMemo(()=>{
        let theCSV = [["ID","VIN","Status","Location","Dealer"]]
        theCSV = [
            ...theCSV,
            ...unitsArray.map((aUnit,index)=>{
                return [aUnit.id,aUnit.vin,aUnit.inventory_statuses,aUnit.location,aUnit.dealer,]
            })
        ]
        return theCSV
    },[unitsArray])

    return (
    <div className="ims-tx-link flex-center pr-3 opaci-hov-50 mr-100">
        <CSVLink data={csvData} filename={"units.csv"} > Export CSV </CSVLink>
    </div>
    )
}