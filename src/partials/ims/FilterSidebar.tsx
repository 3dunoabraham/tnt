import SidebarHeader from "@/src/partials/ims/SidebarHeader";

export default function Component({}) {
    return (<>
    <SidebarHeader />
    <div className='flex-1 w-100'>
        <div className='pa-2'>
            Filter
        </div>
    </div>
    <div className='flex-1'></div>
    </>)
}