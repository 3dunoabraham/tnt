import { useMemo } from 'react'
import { BsX, BsFilter } from 'react-icons/bs'


// ReactFunctionComponent
export const SidebarFilterToolbar = ({
	configObj,
	filtersMap,
	filtersMap_do,
})=>{
    /****** DATA ******/
	const filteredConfigObj = useMemo(()=>{
		let theResult = {}
		Array.from(filtersMap.keys()).map((configKey:string,index)=>{
			if (!filtersMap.get(configKey).isOn) return

			theResult[configKey] = filtersMap.get(configKey)
		})
		return theResult
	},[filtersMap])
	const toggleAFilter = (configKey)=>{
		let theConfig = filtersMap.get(configKey)
		filtersMap_do.set(configKey, {...theConfig, ...{isOn: !theConfig.isOn}})
	}



    /****** HTML ******/
    return(
    <div className="flex-wrap flex-justify-start">
    	{Object.keys(filteredConfigObj).map((configKey,index)=>{
    		if (!filtersMap || !filtersMap.has(configKey)) return <div key={index}></div>
    		return (
		        <div className="flex flex-align-center   pa-1 ims-tx-primary  pos-rel" key={index}>
		        	<span className={`pa-2 flex ims-bg-faded  bord-r-l-8`}>
						<div className='tx-bold-3 pr-1'>
	        				{configObj[configKey].title}:
						</div>
						<div className='tx-bold-5'>
							{filtersMap.get(configKey).value}
						</div>
        			</span>	
	        		<div className="ims-bg-faded opaci-chov--50 bord-r-r-8 flex-center px-1 tx-lgx "
	        			onClick={()=>{toggleAFilter(configKey)}}
        			>
        				<BsX />
    				</div>
	        	</div>
    		)
    	})}
    	{false &&
    		<div className={"flex-center ims-border-faded  bord-r-8 pa-2   opaci-chov--50"}>
				<div className="  flex-center px-1 tx-lgx bord-r-l-8 ">
					<BsFilter />
				</div>
				<span className='bord-r-r-8'> More Filters </span>	
			</div>
		}
    </div>
    )
}
