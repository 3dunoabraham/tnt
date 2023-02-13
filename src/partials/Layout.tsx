import { useMemo } from "react";
import { useMap } from "usehooks-ts";
import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query'


import { DEFAULT_ALERT_MAPARRAY } from "@/scripts/constants";
import { AppContext } from "@/scripts/contexts/AppContext";
import Providers from "@/src/items/Providers";
import AlertContainer from "../items/molecules/AlertContainer";
import { OFFLINE_UNITS_ARRAY } from "@/scripts/constants/inventory";
import { fetchJsonArray } from "@/scripts/helpers/fetchHelper";
import { API_UNITS } from "@/scripts/constants/api";

export default function Layout({ children }) {
    const queryClient = new QueryClient()
    const [alertMap,alertMap__do] = useMap<string,any>(DEFAULT_ALERT_MAPARRAY)
    const alertNotification = (category="neutral", msg="")=>{
		alertMap__do.setAll(DEFAULT_ALERT_MAPARRAY)
		{
			setTimeout(()=>{alertMap__do.set(category, msg)},100)
		}
    }
	let appValue = useMemo(()=>{
		return {
            alertMap,alertMap__do,alertReset:()=>{alertMap__do.setAll(DEFAULT_ALERT_MAPARRAY)},
			alert:(category, msg)=>{alertNotification(category, msg)}
		}
	},[alertMap])


    

    return (
    <>
        {/* <AlertNotification /> */}
        <Providers>
            <QueryClientProvider client={queryClient}>
                <AppContext.Provider value={appValue}>
                    <div className="z-999">
                        <AlertContainer {...{
                            s__msg: (val)=>(alertMap__do.set("neutral", val)), msg:alertMap.get("neutral")}} 
                        />
                        <AlertContainer {...{
                            s__msg: (val)=>(alertMap__do.set("success", val)), msg:alertMap.get("success")}}
                            badgeClass="ims-badge-success"
                        />
                        <AlertContainer {...{
                            s__msg: (val)=>(alertMap__do.set("warn", val)), msg:alertMap.get("warn")}}
                            badgeClass="ims-badge-secondary" 
                        />
                        <AlertContainer {...{
                            s__msg: (val)=>(alertMap__do.set("error", val)), msg:alertMap.get("error")}}
                            badgeClass="ims-badge-error" 
                        />
                    </div>
                    {children}
                </AppContext.Provider>
            </QueryClientProvider>
        </Providers>
    </>
    )
}
