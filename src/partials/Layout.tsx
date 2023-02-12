// import Navbar from './navbar'
// import Footer from './footer'

import { DEFAULT_ALERT_MAPARRAY } from "@/scripts/constants";
import { AppContext } from "@/scripts/contexts/AppContext";
import AppClientDesc from "@/src/items/AppClientDesc";
import Providers from "@/src/items/Providers";
import { useMemo } from "react";
import { useMap } from "usehooks-ts";
import AlertContainer from "../items/molecules/AlertContainer";

export default function Layout({ children }) {
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
        </Providers>
    </>
    )
}
