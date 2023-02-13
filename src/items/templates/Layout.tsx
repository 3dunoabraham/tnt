import { createContext, ReactNode, useState, useMemo } from 'react'
import { useMap } from 'usehooks-ts'
import Head from 'next/head'


import { isDevEnvironment } from '@/scripts/helpers/devHelper'
import { AppContext } from '@/scripts/contexts/AppContext'
import { DEFAULT_ALERT_MAPARRAY } from '@/scripts/constants'
import { AlertComponent } from '@/components/molecules/AlertComponent'
export interface ComponentProps {
  children: ReactNode
  title?: string
}
// const ThemeContext = createContext(null);
// ReactFunctionComponent
export const Layout = ({
  children,
  title = 'Home',
}: ComponentProps)=>{
    return (<>
	<Head>
		<title>{title ? `${title} | IMS` : 'IMS'}</title>
		<meta name="description" content="ServicePad Inventory Management System" />
		{/* <link rel="icon" href={"/icons/favicon.ico"} /> */}
		<link rel="icon" href={isDevEnvironment ? "/icons/dev.ico" : "/icons/favicon.ico"} />
	</Head>

		<div className="flex-1 w-100">
			{children}    
		</div>
    </>)
}