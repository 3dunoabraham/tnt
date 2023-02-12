import React, { useState, useEffect, useMemo } from 'react';
import { useMap, MapOrEntries, useMediaQuery } from 'usehooks-ts';

export const useDeviceXS_SM = () => useMediaQuery('(max-width: 600px)')
export const useDeviceXS_MD = () => useMediaQuery('(max-width: 900px)')
export const useDeviceXS_LG = () => useMediaQuery('(max-width: 1200px)')
export const useDeviceXS_XL = () => useMediaQuery('(max-width: 1436px)')

export const useObjMap = (theObj) =>{
    const mapArray:MapOrEntries<string, any> = useMemo(()=>(
        Object.keys(theObj).map((item) => [item, theObj[item]])
    ), [theObj]);
    const theMap = useMap(mapArray);

    return theMap;
}
export const useArrayMap = (objArray,propKey) =>{
    const mapArray = useMemo(()=>(
        !objArray ? [] : objArray.map(theObj => ([`${theObj[propKey]}`, theObj])) 
    ), [objArray]);

    return useMap<string, any>(mapArray)
}
export const useArrayMapPlus = (objArray,propKey,theValue,valueKey) =>{
    const mapArray = useMemo(()=>(
        !objArray ? [] : objArray.map(theObj => {return [`${theObj[propKey]}`, theObj]; })
    ), [objArray]);
    const useHooksMap = useMap<string, any>(mapArray)
    const theObj = useMemo(()=>{ 
        if ((!objArray && !objArray.length) || !theValue) return null
        return objArray.filter(object => (object[valueKey] == theValue))[0]
    } , [objArray,theValue]);

    return [...useHooksMap,theObj];
}
export const useElementOnScreen = (options) =>{
    const containerRef = React.createRef<HTMLInputElement>()
    const [ isVisible, setIsVisible ] = useState(false)
    const callbackFunction = (entries)=>{
        const [ entry ] = entries
        setIsVisible(entry.isIntersecting)
    }
    useEffect(()=>{
        const observer = new IntersectionObserver(callbackFunction, options)
        if (containerRef.current) observer.observe(containerRef.current)

        return ()=>{
            if (containerRef.current) observer.unobserve(containerRef.current)
        }
    }, [containerRef, options])

    return [containerRef, isVisible]
}
export function useUnloadHandler(router, notSaved) {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    // useEffect(effect, [])
    useEffect(()=>{
        const confirmationMessage = 'You have unsaved changes! \n Are you sure you want to leav this page?';
        const beforeUnloadHandler = (e: BeforeUnloadEvent)=>{
            (e || window.event).returnValue = confirmationMessage;
            return confirmationMessage; // Gecko + Webkit, Safari, Chrome etc.
            };
            const beforeRouteHandler = (url: string)=>{
            if (router.pathname !== url && !confirm(confirmationMessage)) {
                // to inform NProgress or something ...
                router.events.emit('routeChangeError');
                // tslint:disable-next-line: no-string-throw
                throw `
                    Route change to "${url}"
                    was aborted (this error can be safely ignored).
                    See https://github.com/zeit/next.js/issues/2476.
                `;
            }
        };
        if (notSaved) {
            window.addEventListener('beforeunload', beforeUnloadHandler);
            router.events.on('routeChangeStart', beforeRouteHandler);
        } else {
            window.removeEventListener('beforeunload', beforeUnloadHandler);
            router.events.off('routeChangeStart', beforeRouteHandler);
        }
        return ()=>{
            window.removeEventListener('beforeunload', beforeUnloadHandler);
            router.events.off('routeChangeStart', beforeRouteHandler);
        };
    }, [notSaved, router.events, router.pathname]);
}